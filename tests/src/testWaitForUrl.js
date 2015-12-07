var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();

        callback();
    },

    testSuccess: function(test) {
        var client = this.client.api;
        client.waitForUrl('http://localhost/', 100, 0, function callback(result) {
            test.equal(result, 'http://localhost/');
            test.done();
        });
    },

    testFailure: function(test) {
        var client = this.client.api;
        client.waitForUrl('http://localhost2/', 600, 0, function callback(result) {
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
