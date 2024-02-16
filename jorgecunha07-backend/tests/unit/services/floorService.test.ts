import * as sinon from 'sinon';
import { Container } from 'typedi';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import { NextFunction, Request, Response } from 'express';
import IBuildingService from '../../../src/services/IServices/IBuildingService';
import { expect } from 'chai';
import { Building } from '../../../src/domain/building/Building';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import IFloorRepo from '../../../src/repos/IRepos/IFloorRepo';
import IFloorDTO from '../../../src/dto/IFloorDTO';
import { Floor } from '../../../src/domain/floor/Floor';
import IFloorService from '../../../src/services/IServices/IFloorService';
import FloorController from '../../../src/controllers/floorController';

describe('FloorService', function() {
  /*
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    const floorSchemaInstance = require('../../../src/persistence/schemas/floorSchema').default;
    Container.set('floorSchema', floorSchemaInstance);

    const floorRepoClass = require('../../../src/repos/floorRepo').default;
    const floorRepoInstance = Container.get(floorRepoClass);
    Container.set('FloorRepo', floorRepoInstance);

    const floorServiceClass = require('../../../src/services/floorService').default;
    const floorServiceInstance = Container.get(floorServiceClass);
    Container.set('FloorService', floorServiceInstance);

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

  it('FloorService unit Test', async function() {
    const buildingDto: IBuildingDTO = {
      buildingCode: 'B',
      buildingName: 'ISEPB',
      buildingDescription: 'Building A Engenharia Informatica',
      buildingSize: {
        width: 150,
        length: 200,
      },
    };
    const id2 = new UniqueEntityID(2);
    const building = Building.create(buildingDto, id2);
    const buildingServiceInstance: IBuildingService = Container.get('BuildingService');
    const floorServiceInstance: IFloorService = Container.get('FloorService');
    sinon.stub(buildingServiceInstance, 'findByCode').returns(building.getValue());
    sinon.stub(floorServiceInstance, 'findFloorByBuildingCodeFloorNumber').returns(null);

    const floorRepoInstance: IFloorRepo = Container.get('FloorRepo');

    const floorDTO: IFloorDTO = {
      buildingFinderId: 'B',
      floorNumber: 0,
      floorDescription: 'Description of the floor',
      floorMap: [
        ['R1C1', 'R1C2', 'R1C3'],
        ['R2C1', 'R2C2', 'R2C3'],
        ['R3C1', 'R3C2', 'R3C3'],
      ],
      floorMaxDimensions: {
        width: 3,
        length: 3,
      },
    };

    const id = new UniqueEntityID(2);
    const floor = Floor.create(floorDTO, id);
    sinon.stub(floorRepoInstance, 'save').returns(floor);

    const value = await floorServiceInstance.createFloor(floorDTO);
    expect(value.getValue().buildingFinderId).to.equal(floorDTO.buildingFinderId);
    expect(value.getValue().floorNumber).to.equal(floorDTO.floorNumber);
    expect(value.getValue().floorDescription).to.equal(floorDTO.floorDescription);
    expect(value.getValue().floorMap).to.equal(floorDTO.floorMap);
    expect(value.getValue().floorMaxDimensions.width).to.equal(floorDTO.floorMaxDimensions.width);
    expect(value.getValue().floorMaxDimensions.length).to.equal(floorDTO.floorMaxDimensions.length);
  });

  it('floorController,floorService , floorRepo integration', async function() {
    const buildingDto: IBuildingDTO = {
      buildingCode: 'B',
      buildingName: 'ISEPB',
      buildingDescription: 'Building A Engenharia Informatica',
      buildingSize: {
        width: 150,
        length: 200,
      },
    };
    const id2 = new UniqueEntityID(2);
    const building = Building.create(buildingDto, id2);
    const buildingServiceInstance: IBuildingService = Container.get('BuildingService');
    const floorServiceInstance: IFloorService = Container.get('FloorService');
    sinon.stub(buildingServiceInstance, 'findByCode').returns(building.getValue());
    sinon.stub(floorServiceInstance, 'findFloorByBuildingCodeFloorNumber').returns(null);

    const bodyFloor = {
      buildingFinderId: 'B',
      floorNumber: 0,
      floorDescription: 'Description of the floor',
      floorMap: [
        ['R1C1', 'R1C2', 'R1C3'],
        ['R2C1', 'R2C2', 'R2C3'],
        ['R3C1', 'R3C2', 'R3C3'],
      ],
      floorMaxDimensions: {
        width: 3,
        length: 3,
      },
    };

    const req: Partial<Request> = {};
    req.body = bodyFloor;

    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    const next: Partial<NextFunction> = () => {};

    const floorRepoInstance = Container.get('FloorRepo');
    sinon.stub(floorRepoInstance, 'save').returns(
      new Promise<Floor>((resolve, reject) => {
        resolve(
          Floor.create(
            {
              buildingFinderId: 'B',
              floorNumber: 0,
              floorDescription: 'Description of the floor',
              floorMap: [
                ['R1C1', 'R1C2', 'R1C3'],
                ['R2C1', 'R2C2', 'R2C3'],
                ['R3C1', 'R3C2', 'R3C3'],
              ],
              floorMaxDimensions: {
                width: 3,
                length: 3,
              },
            },
            new UniqueEntityID('eed'),
          ).getValue(),
        );
      }),
    );

    const controller = new FloorController(floorServiceInstance as IFloorService);


    await controller.createFloor(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(req.body));
  });*/
});
