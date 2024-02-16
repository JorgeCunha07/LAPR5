import { expect } from 'chai';
import Robot from '../../../../src/domain/robot/robot';

describe('Robot', () => {
  describe('create', () => {
    it('should create a valid Robot instance', () => {
      const dto = {
        robotCode: 'RC123',
        robotDescription: 'Robot description',
        robotNickname: 'R2-D2',
        robotSerialNumber: 'SN001',
        robotTypeName: 'Droid',
        enabled: true,
      };

      const result = Robot.create(dto);

      expect(result.isSuccess).to.be.true;
      const robot = result.getValue();
      expect(robot).to.be.an.instanceOf(Robot);
      expect(robot.robotCode.value).to.equal(dto.robotCode);
      expect(robot.robotDescription?.value).to.equal(dto.robotDescription);
      expect(robot.robotNickname.value).to.equal(dto.robotNickname);
      expect(robot.robotSerialNumber.value).to.equal(dto.robotSerialNumber);
      expect(robot.robotTypeName).to.equal(dto.robotTypeName);
      expect(robot.isEnabled).to.equal(dto.enabled);
    });

    it('should fail with missing robotCode', () => {
      const dto = {
        robotCode: null,
        robotDescription: 'Robot description',
        robotNickname: 'R2-D2',
        robotSerialNumber: 'SN001',
        robotTypeName: 'Droid',
        enabled: true,
      };

      const result = Robot.create(dto);

      expect(result.isFailure).to.be.true;
      expect(result.errorValue()).to.equal('Robot code is required.');
    });
  });

  describe('changeState', () => {
    it('should toggle the enabled state', () => {
      const dto = {
        robotCode: 'RC123',
        robotDescription: 'Robot description',
        robotNickname: 'R2-D2',
        robotSerialNumber: 'SN001',
        robotTypeName: 'Droid',
        enabled: true,
      };

      const robot = Robot.create(dto).getValue();

      robot.changeState();
      expect(robot.isEnabled).to.be.false;

      robot.changeState();
      expect(robot.isEnabled).to.be.true;
    });
  });
});
