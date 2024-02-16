import { expect } from 'chai';
import RobotBrand from '../../../../src/domain/robotType/robotBrand';

describe('RobotBrand', () => {
  it('should create a valid RobotBrand instance', () => {
    const name = 'ACME';

    const result = RobotBrand.create(name);

    expect(result.isSuccess).to.be.true;
    const robotBrand = result.getValue();
    expect(robotBrand).to.be.an.instanceOf(RobotBrand);
    expect(robotBrand.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotBrand.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot brand name should not be null or undefined.');
  });

  it('should fail with name exceeding 50 characters', () => {
    const name = 'A'.repeat(51); // Create a string longer than 50 characters

    const result = RobotBrand.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot brand name should not exceed 50 characters.');
  });
});
