var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testSuccess : function(test) {
    this.client.getMobifyEvaluatedData('home', function callback(result) {
      test.equal(result.bodyType, 'home');
      test.done();
    });
  },

  testFailure : function(test) {
    this.client.getMobifyEvaluatedData('pdp', function callback(result) {
      test.notEqual(result.bodyType, 'pdp');
      test.done();
    });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
