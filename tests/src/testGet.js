var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  // testSuccess: function(test) {
  //   this.client.waitForPageToBeMobified(function callback(result) {
  //     test.ok(result.value !== false);
  //     test.done();
  //   });
  // },

  // testFailure : function(test) {
  //   this.client.waitForPageToBeMobified(function callback(result) {
  //     test.notEqual(result.value, false);
  //     test.done();
  //   });
  // },

  tearDown: function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
