module.exports = {
    setUp: function (callback) {
        callback();
    },

    'Elements Present found messaging is correct' : function(test) {
        var Assertion = require('../../assertions/elementsPresent.js');
        var client = {
            element : function(using, selector, callback) {
                callback({
                    status: 0,
                    value : {
                        ELEMENT: 'body'
                    }
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, true);
                test.equals(msg, '<body> located on page.');
                test.equals(abortOnFailure, false);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('body');
    },

    'Elements Present not found messaging is correct' : function(test) {
        var Assertion = require('../../assertions/elementsPresent.js');
        var client = {
            element : function(using, selector, callback) {
                callback({
                    status: -1,
                    value : {
                        ELEMENT: ''
                    }
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, false);
                test.equals(msg, '<.notfound> missing from page.');
                test.equals(abortOnFailure, false);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('.notfound');
    },

    tearDown : function(callback) {
        callback();
    }
}
