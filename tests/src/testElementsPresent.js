// These are command style tests, as this assertion is somewhere between an
// assertion and a command.

var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();

        callback();
    },

    testFindOneElement: function(test) {
        var client = this.client.api;
        client.verify.elementsPresent('#weblogin', function callback(result) {
            test.equal(0, result);
            test.done();
        });
    },

    testFindTwoElements: function(test) {
        var client = this.client.api;
        client.verify.elementsPresent('#weblogin', 'body', function callback(result) {
            test.equal(0, result);
            test.done();
        });
    },

    // Should return false if the element is not founf
    testMissingElement: function(test) {
        var client = this.client.api;
        client.verify.elementsPresent('#notFound', function callback(result) {
            test.notEqual(0, result);
            test.done();
        });
    },

    // Should return false if the element is not founf
    testOneMissingElement: function(test) {
        var client = this.client.api;
        client.verify.elementsPresent('#notFound', 'body', function callback(result) {
            test.notEqual(0, result);
            test.done();
        });
    },

    // Should return false if the element is not founf
    testTwoMissingElements: function(test) {
        var client = this.client.api;
        client.verify.elementsPresent('#notFound', 'body', '.notFound', function callback(result) {
            test.notEqual(0, result);
            test.done();
        });
    },

    tearDown: function(callback) {
        this.client = null;
        // clean up
        callback();
    }
};
