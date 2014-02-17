var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testSuccess : function(test) {
    this.client.assertMobifyTemplate('home', function callback(result) {
      test.equal(result.value, 'home');
      test.done();
    });
  },

  testFailure : function(test) {
    this.client.assertMobifyTemplate('pdp', function callback(result) {
      test.notEqual(result.value, 'pdp');
      test.done();
    });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
