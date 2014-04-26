var MockServer = require('mockserver');

module.exports = {
    setUp: function(callback) {
        this.client = require('../nightwatch.js').init();
        MockServer.addMock({
            url: '/wd/hub/session/1352110219202/execute',
            method: 'POST',
            postdata: '{"script":"var passedArgs = Array.prototype.slice.call(arguments,0); return function (){        var framework = Mobify || Adaptive;        return framework ? framework.evaluatedData : null;    }.apply(window, passedArgs);","args":[]}',
            response: JSON.stringify({
                sessionId: '1352110219202',
                status: 0,
                value: true
            })
        });

        callback();
    },

    testSuccess: function(test) {
        var client = this.client.api;
        client.getMobifyEvaluatedData(function callback(result) {
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
