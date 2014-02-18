var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testSuccess : function(test) {
    this.client.getMobifyTemplate('home', function callback(result) {
      test.equal(result, 'home');
      test.done();
    });
  },

  testFailure : function(test) {
    this.client.getMobifyTemplate('pdp', function callback(result) {
      test.notEqual(result, 'pdp');
      test.done();
    });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
