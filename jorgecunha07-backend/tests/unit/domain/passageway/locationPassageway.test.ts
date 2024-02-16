import { expect } from 'chai';
import { Location } from '../../../../src/domain/passageway/location';

describe('Location', () => {
  describe('create', () => {

    it('should return a Result with a Location object when given valid x and y values', () => {
      const locationResult = Location.create(10, 20);
      expect(locationResult.isSuccess).to.be.true;
      const location = locationResult.getValue();
      expect(location).to.be.instanceOf(Location);
      expect(location.x).to.equal(10);
      expect(location.y).to.equal(20);
    });
  });
});
