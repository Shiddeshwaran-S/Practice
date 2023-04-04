const expect = require('chai').expect;
// const assert = require('assert');
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
      // expect([1, 2, 3].indexOf(2)).to.equal(1);
      // tick();
      //time.tick(1000);
      // assert.equal([1, 2, 3].indexOf(2), 1);
      
      setTimeout(() => {
        app(true);
        done();
      }, 10);
      
      const clock = sinon.useFakeTimers(); // create a fake clock
      console.log('clock', clock.now);  // 0
      
      clock.tick(10); // advance the clock by 1000ms
      console.log('clock', clock.now);  // 10
      
      clock.tick(1001); // advance the clock by 1000ms
      console.log('clock', clock.now);  // 1001
      
      clock.tick(2001); // advance the clock by 1000ms
      console.log('clock', clock.now);  // 2001
    });
  });
});