import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import BuildingController from '../../../src/controllers/buildingController';
import IBuildingService from '../../../src/services/IServices/IBuildingService';

describe('BuildingController', function() {
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

  it('buildingController unit test using buildingService stub', async function() {
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

    const buildingServiceInstance = Container.get('BuildingService');
    sinon.stub(buildingServiceInstance, 'createBuilding').returns(Result.ok<IBuildingDTO>(body));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(body));
  });
  it('should fetch all buildings', async function() {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
    const next: Partial<NextFunction> = () => {};
    const ctrl = new BuildingController(this.buildingServiceInstance as IBuildingService);
    // Act

    const valor = await ctrl.getAllBuilding(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.match(valor, undefined);
  });

  it('buildingController unit test using buildingService mock', async function() {
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
    };
    const next: Partial<NextFunction> = () => {};
    const buildingServiceInstance = Container.get('BuildingService');
    const buildingServiceMock = sinon.mock(buildingServiceInstance, 'createBuilding');
    buildingServiceMock
      .expects('createBuilding')
      .once()
      .withArgs(sinon.match({ buildingName: req.body.buildingName }))
      .returns(
        Result.ok<IBuildingDTO>({
          buildingCode: req.body.buildingCode,
          buildingName: req.body.buildingName,
          buildingDescription: req.body.buildingDescription,
          buildingSize: {
            width: req.body.buildingSize.width,
            length: req.body.buildingSize.length,
          },
        }),
      );
  });
});
