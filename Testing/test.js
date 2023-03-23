const expect = require('chai').expect;
const { suite, describe, it } = require('mocha');

suite('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 when the value is not present', function (done) {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
      done();
    });

    it.skip('should return value when the value is present', function (done) {
      expect([1, 2, 3].indexOf(2)).to.equal(1);
      done();
    });
  });
});