import { expect } from 'chai';
import RobotNickname from '../../../../src/domain/robot/robotNickname';

describe('RobotNickname', () => {
  it('should create a valid RobotNickname instance', () => {
    const name = 'R2-D2';

    const result = RobotNickname.create(name);

    expect(result.isSuccess).to.be.true;
    const robotNickname = result.getValue();
    expect(robotNickname).to.be.an.instanceOf(RobotNickname);
    expect(robotNickname.value).to.equal(name);
  });

  it('should fail with null or undefined name', () => {
    const name = null;

    const result = RobotNickname.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Nickname name should not be null or undefined.');
  });

  it('should fail with name exceeding 100 characters', () => {
    const name = 'A'.repeat(101); // Create a string longer than 100 characters

    const result = RobotNickname.create(name);

    expect(result.isFailure).to.be.true;
    expect(result.errorValue()).to.equal('Robot Nickname name should not exceed 100 characters.');
  });
});
