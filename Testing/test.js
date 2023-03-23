const expect = require('chai').expect;

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function (done) {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
      done();
    });

    it('should return value when the value is present', function (done) {
      expect([1, 2, 3].indexOf(2)).to.equal([1, 2, 3].indexOf(2));
      done();
    });
  });
});