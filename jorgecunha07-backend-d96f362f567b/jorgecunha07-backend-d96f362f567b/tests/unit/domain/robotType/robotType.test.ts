import { expect } from 'chai';
import RobotType from '../../../../src/domain/robotType/robotType';

describe('RobotType', () => {
  describe('create', () => {
    it('should create a valid RobotType instance', () => {
      const dto = {
        robotTypeName: 'Droid',
        robotBrand: 'ACME',
        robotModel: 'X1',
        description: 'A robotic assistant',
      };

      const result = RobotType.create(dto);

      expect(result.isSuccess).to.be.true;
      const robotType = result.getValue();
      expect(robotType).to.be.an.instanceOf(RobotType);
      expect(robotType.robotTypeName.value).to.equal(dto.robotTypeName);
      expect(robotType.robotBrand.value).to.equal(dto.robotBrand);
      expect(robotType.robotModel.value).to.equal(dto.robotModel);
      expect(robotType.description).to.equal(dto.description);
    });

    it('should fail with missing robotTypeName', () => {
      const dto = {
        robotTypeName: null,
        robotBrand: 'ACME',
        robotModel: 'X1',
        description: 'A robotic assistant',
      };

      const result = RobotType.create(dto);

      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal('RobotType name is required.');
    });

    it('should fail with missing robotModel', () => {
      const dto = {
        robotTypeName: 'Droid',
        robotBrand: 'ACME',
        robotModel: null,
        description: 'A robotic assistant',
      };

      const result = RobotType.create(dto);

      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal('RobotType model is required.');
    });

    it('should fail with missing robotBrand', () => {
      const dto = {
        robotTypeName: 'Droid',
        robotBrand: null,
        robotModel: 'X1',
        description: 'A robotic assistant',
      };

      const result = RobotType.create(dto);

      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal('RobotType brand is required.');
    });

    it('should fail with invalid or unsupported TaskType', () => {
      const dto = {
        robotTypeName: 'Droid',
        robotBrand: 'ACME',
        robotModel: 'X1',
        description: 'A robotic assistant',
        supportedTaskTypes: ['InvalidTaskType'],
      };

      const result = RobotType.create(dto);

      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal('Invalid or unsupported TaskType: InvalidTaskType');
    });
  });

  it('should get robotTypeName', () => {
    const dto = {
      robotTypeName: 'Droid',
      robotBrand: 'ACME',
      robotModel: 'X1',
      description: 'A robotic assistant',
      supportedTaskTypes: ['TransportTask', 'SurveillanceTask'],
    };

    const robotType = RobotType.create(dto).getValue();

    expect(robotType.robotTypeName.value).to.equal(dto.robotTypeName);
  });

  it('should get robotBrand', () => {
    const dto = {
      robotTypeName: 'Droid',
      robotBrand: 'ACME',
      robotModel: 'X1',
      description: 'A robotic assistant',
      supportedTaskTypes: ['TransportTask', 'SurveillanceTask'],
    };

    const robotType = RobotType.create(dto).getValue();

    expect(robotType.robotBrand.value).to.equal(dto.robotBrand);
  });

  it('should get robotModel', () => {
    const dto = {
      robotTypeName: 'Droid',
      robotBrand: 'ACME',
      robotModel: 'X1',
      description: 'A robotic assistant',
      supportedTaskTypes: ['TransportTask', 'SurveillanceTask'],
    };

    const robotType = RobotType.create(dto).getValue();

    expect(robotType.robotModel.value).to.equal(dto.robotModel);
  });

  it('should get description', () => {
    const dto = {
      robotTypeName: 'Droid',
      robotBrand: 'ACME',
      robotModel: 'X1',
      description: 'A robotic assistant',
      supportedTaskTypes: ['TransportTask', 'SurveillanceTask'],
    };

    const robotType = RobotType.create(dto).getValue();

    expect(robotType.description).to.equal(dto.description);
  });
});
