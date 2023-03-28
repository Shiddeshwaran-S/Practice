const expect = require('chai').expect;
const { suite, describe, it } = require('mocha');
//const time = require('time');
const sinon = require('sinon'); // import sinon package

const app = require('./app.js');

suite('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function (done) {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
      done();
    });

    it('should return value when the value is present', function (done) {
      expect([1, 2, 3].indexOf(2)).to.equal(1);
      // tick();
      //time.tick(1000);
      app();
      const clock = sinon.useFakeTimers(); // create a fake clock
      console.log('clock', clock.now);
      clock.tick(1000); // advance the clock by 1000ms
      console.log('clock', clock.now);
      done();
    });
  });
});