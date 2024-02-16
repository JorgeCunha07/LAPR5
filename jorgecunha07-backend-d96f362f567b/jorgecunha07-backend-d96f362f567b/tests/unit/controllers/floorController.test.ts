import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IFloorService from '../../../src/services/IServices/IFloorService';
import IFloorDTO from '../../../src/dto/IFloorDTO';
import FloorController from '../../../src/controllers/floorController';

describe('FloorController', function() {
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
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('floorController unit test using floorService stub', async function() {
    const body = {
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
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis().status,
    };
    const next: Partial<NextFunction> = () => {};

    const floorServiceInstance = Container.get('FloorService');
    sinon.stub(floorServiceInstance, 'createFloor').returns(Result.ok<IFloorDTO>(body));

    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    // Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(body));
  });

  it('should fetch all floors', async function() {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      json: sinon.spy(),
    };
    const next: Partial<NextFunction> = () => {};
    const ctrl = new FloorController(this.floorServiceInstance as IFloorService);
    // Act

    const valor = await ctrl.getAllFloor(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.match(valor, undefined);
  });

  it('floorController unit test using floorService mock', async function() {
    const body = {
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
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy(),
    };
    const next: Partial<NextFunction> = () => {};
    const floorServiceInstance = Container.get('FloorService');
    const floorServiceMock = sinon.mock(floorServiceInstance, 'createFloor');
    floorServiceMock
      .expects('createFloor')
      .once()
      .withArgs(sinon.match({ floorDescription: req.body.floorDescription }))
      .returns({
        buildingFinderId: req.body.buildingFinderId,
        floorNumber: req.body.floorNumber,
        floorDescription: req.body.floorDescription,
        floorMap: req.body.floorMap,
        floorMaxDimensions: req.body.floorMaxDimensions,
      });
  });*/
});
