var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();

        callback();
    },

    testSuccessClick: function(test) {
        var client = this.client.api;
        client.trigger('.clickMe', 'click', function callback(result) {
            test.equal(true, result);
            test.done();
        });
    },

    testSuccessDefaultEvent: function(test) {
        var client = this.client.api;
        client.trigger('.clickMe', function callback(result) {
            test.equal(true, result);
            test.done();
        });
    },

    tearDown: function(callback) {
        this.client = null;
        // clean up
        callback();
    }
};
