// These are command style tests, as this assertion is somewhere between an
// assertion and a command.

var MockServer = require('mockserver');

module.exports = {
  setUp: function (callback) {
    this.client = require('../nightwatch.js').init();

    callback();
  },

  testFindOneElement : function(test) {
    this.client.verify.elementsPresent('#weblogin', function callback(result) {
      test.equal(true, result);
      test.done();
    });
  },

  testFindTwoElements : function(test) {
    this.client.verify.elementsPresent('#weblogin', 'body', function callback(result) {
      test.equal(true, result);
      test.done();
    });
  },

  // Should return false if the element is not founf
  testMissingElement : function(test) {
    this.client.verify.elementsPresent('#notFound', function callback(result) {
      test.equal(false, result);
      test.done();
    });
  },

  // Should return false if the element is not founf
  testOneMissingElement : function(test) {
    this.client.verify.elementsPresent('#notFound', 'body', function callback(result) {
      test.equal(false, result);
      test.done();
    });
  },

  // Should return false if the element is not founf
  testTwoMissingElements : function(test) {
    this.client.verify.elementsPresent('#notFound', 'body', '.notFound', function callback(result) {
      test.equal(false, result);
      test.done();
    });
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
}
