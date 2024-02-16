import { expect } from 'chai';
import RobotCode from '../../../../src/domain/robot/robotCode';

describe('RobotCode', () => {
  it('should create a valid RobotCode instance', () => {
    const name = 'RC123';

    const result = RobotCode.create(name);

    expect(result.isSuccess).to.be.true;
    const robotCode = result.getValue();
    expect(robotCode).to.be.an.instanceOf(RobotCode);
    expect(robotCode.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotCode.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Code name should not be null or undefined.');
  });

  it('should fail with name exceeding 100 characters', () => {
    const name = 'A'.repeat(101); // Create a string longer than 100 characters

    const result = RobotCode.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Code name should not exceed 100 characters.');
  });
});
