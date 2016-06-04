var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();

        callback();
    },

    testSuccess: function(test) {
        var client = this.client.api;
        var expectedContextsCount = 3;
        client.waitForContextsReady(expectedContextsCount, 1000, 0, function callback(result) {
            test.notEqual(result, undefined);
            test.equal(result.length, expectedContextsCount);
            test.done();
        });
    },

    testFailure: function(test) {
        var client = this.client.api;
        client.waitForContextsReady(5, 1000, 0, function callback(result) {
            test.equal(result, false);
            test.done();
        });
    },

    tearDown: function(callback) {
        this.client = null;
        // clean up
        callback();
    }
};
