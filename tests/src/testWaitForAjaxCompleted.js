var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();

        callback();
    },

    testSuccess: function(test) {
        var client = this.client.api;
        client.waitForAjaxCompleted(function callback(result) {
            test.equal(0, result);
            test.done();
        });
    },

    tearDown: function(callback) {
        this.client = null;
        // clean up
        callback();
    }
};
