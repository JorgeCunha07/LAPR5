import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import { NextFunction, Request, Response } from 'express';
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import { expect } from 'chai';
import IBuildingRepo from '../../../src/repos/IRepos/IBuildingRepo';
import { Building } from '../../../src/domain/building/Building';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import BuildingController from '../../../src/controllers/buildingController';

describe('BuildingService', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    const buildingSchemaInstance = require('../../../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchemaInstance);

    const buildingRepoClass = require('../../../src/repos/buildingRepo').default;
    const buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set('BuildingRepo', buildingRepoInstance);

    const buildingServiceClass = require('../../../src/services/buildingService').default;
    const buildingServiceInstance = Container.get(buildingServiceClass);
    Container.set('BuildingService', buildingServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('buildingService unit Test', async function() {
    const buildingDTO: IBuildingDTO = {
      buildingCode: 'B',
      buildingName: 'ISEPB',
      buildingDescription: 'Building A Engenharia Informatica',
      buildingSize: {
        width: 150,
        length: 200,
      },
    };
    const buildingRepoInstance: IBuildingRepo = Container.get('BuildingRepo');
    const id = new UniqueEntityID(2);
    const building = Building.create(buildingDTO, id);
    sinon.stub(buildingRepoInstance, 'save').returns(building);

    const buildingServiceInstance: IBuildingService = Container.get('BuildingService');
    const value = await buildingServiceInstance.createBuilding(buildingDTO);
    expect(value.getValue().buildingCode).to.equal(buildingDTO.buildingCode);
    expect(value.getValue().buildingName).to.equal(buildingDTO.buildingName);
    expect(value.getValue().buildingDescription).to.equal(buildingDTO.buildingDescription);
    expect(value.getValue().buildingSize.length).to.equal(buildingDTO.buildingSize.length);
    expect(value.getValue().buildingSize.width).to.equal(buildingDTO.buildingSize.width);
  });

  it('buildingController,buildingService , buildingRepo integration', async function() {
    const body = {
      buildingCode: 'B',
      buildingName: 'ISEPB',
      buildingDescription: 'Building A Engenharia Informatica',
      buildingSize: {
        width: 150,
        length: 200,
      },
    };

    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    const next: Partial<NextFunction> = () => {};

    const buildingRepoInstance = Container.get('BuildingRepo');
    sinon.stub(buildingRepoInstance, 'save').returns(
      new Promise<Building>((resolve, reject) => {
        resolve(
          Building.create(
            {
              buildingCode: 'B',
              buildingName: 'ISEPB',
              buildingDescription: 'Building A Engenharia Informatica',
              buildingSize: {
                width: 150,
                length: 200,
              },
            },
            new UniqueEntityID('eed'),
          ).getValue(),
        );
      }),
    );

    const buildingServiceInstance = Container.get('BuildingService');

    const controller = new BuildingController(buildingServiceInstance as IBuildingService);
    // Act
    await controller.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(req.body));
  });
});
