var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testSuccess: function(test) {
    this.client.waitForAjaxCompleted(function callback(result) {
      test.strictEqual(0, result);
      test.done();
    });
  },

  tearDown: function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
