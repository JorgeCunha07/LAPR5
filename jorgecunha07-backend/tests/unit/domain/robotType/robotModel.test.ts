import { expect } from 'chai';
import RobotModel from '../../../../src/domain/robotType/robotModel';

describe('RobotModel', () => {
  it('should create a valid RobotModel instance', () => {
    const model = 'X1';

    const result = RobotModel.create(model);

    expect(result.isSuccess).to.be.true;
    const robotModel = result.getValue();
    expect(robotModel).to.be.an.instanceOf(RobotModel);
    expect(robotModel.value).to.equal(model);
  });

  it('should fail with null or undefined model', () => {
    const model = null;

    const result = RobotModel.create(model);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot model name should not be null or undefined.');
  });

  it('should fail with model name exceeding 100 characters', () => {
    const model = 'A'.repeat(101); // Create a string longer than 100 characters

    const result = RobotModel.create(model);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot model name should not exceed 100 characters.');
  });
});
