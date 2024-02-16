import { expect } from 'chai';
import RobotSerialNumber from '../../../../src/domain/robot/robotSerialNumber';

describe('RobotSerialNumber', () => {
  it('should create a valid RobotSerialNumber instance', () => {
    const name = 'SN001';

    const result = RobotSerialNumber.create(name);

    expect(result.isSuccess).to.be.true;
    const robotSerialNumber = result.getValue();
    expect(robotSerialNumber).to.be.an.instanceOf(RobotSerialNumber);
    expect(robotSerialNumber.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotSerialNumber.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot SerialNumber name should not be null or undefined.');
  });

  it('should fail with name exceeding 100 characters', () => {
    const name = 'A'.repeat(101); // Create a string longer than 100 characters

    const result = RobotSerialNumber.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot SerialNumber name should not exceed 100 characters.');
  });
});
