import { expect } from 'chai';
import RobotTypeName from '../../../../src/domain/robotType/robotTypeName';

describe('RobotTypeName', () => {
  it('should create a valid RobotTypeName instance with alphanumeric name', () => {
    const name = 'Droid123';

    const result = RobotTypeName.create(name);

    expect(result.isSuccess).to.be.true;
    const robotTypeName = result.getValue();
    expect(robotTypeName).to.be.an.instanceOf(RobotTypeName);
    expect(robotTypeName.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotTypeName.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot type name should not be null or undefined.');
  });

  it('should fail with invalid name (special characters)', () => {
    const name = 'Invalid@Name';

    const result = RobotTypeName.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal(
      'Invalid name for the robot type. It should be alphanumeric and have between 1 and 25 characters.',
    );
  });

  it('should fail with name exceeding 25 characters', () => {
    const name = 'A'.repeat(26); // Create a string longer than 25 characters

    const result = RobotTypeName.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal(
      'Invalid name for the robot type. It should be alphanumeric and have between 1 and 25 characters.',
    );
  });
});
