import { expect } from 'chai';
import RobotDescription from '../../../../src/domain/robot/robotDescription';

describe('RobotDescription', () => {
  it('should create a valid RobotDescription instance', () => {
    const name = 'A short description';

    const result = RobotDescription.create(name);

    expect(result.isSuccess).to.be.true;
    const robotDescription = result.getValue();
    expect(robotDescription).to.be.an.instanceOf(RobotDescription);
    expect(robotDescription.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotDescription.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Description name should not be null or undefined.');
  });

  it('should fail with name exceeding 50 characters', () => {
    const name = 'A'.repeat(51); // Create a string longer than 50 characters

    const result = RobotDescription.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Description name should not exceed 50 characters.');
  });
});
