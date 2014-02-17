var MockServer  = require('../../node_modules/nightwatch/tests/node_modules/mockserver.js');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  // testWaitForPageToBeMobified : function(test) {
  //   this.client.waitForPageToBeMobified('return Mobify.evaluatedData', function callback(result) {
  //     console.log(result)
  //     test.ok(result !== false);
  //     test.done();
  //   });
  // },

  testSuccess : function(test) {
    this.client.waitForElementPresent('#weblogin', 100, function callback(result) {
      test.ok(result !== false);
      test.done();
    });
  },

  testFailure : function(test) {
    this.client.waitForElementPresent('.weblogin', 600, function callback(result) {
      test.equal(result, false);
      test.done();
    });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
