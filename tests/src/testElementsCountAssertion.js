module.exports = {
    setUp: function (callback) {
        callback();
    },

    'Elements Count items found message is correct' : function(test) {
        var Assertion = require('../../assertions/elementsCount.js');
        var client = {
            elements : function(using, selector, callback) {
                callback({
                    status: 0,
                    value : [
                        {ELEMENT: "6"},
                        {ELEMENT: "7"},
                        {ELEMENT: "8"},
                        {ELEMENT: "9"},
                        {ELEMENT: "10"},
                        {ELEMENT: "11"}
                    ]
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 6);
                test.equals(expected, 6);
                test.equals(msg, 'Testing if elements count <.some-parent .with-children> is 6.');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('.some-parent .with-children', 6);
    },

    'Elements Count no items found messaging is correct' : function(test) {
        var Assertion = require('../../assertions/elementsCount.js');
        var client = {
            elements : function(using, selector, callback) {
                callback({
                    status: -1,
                    value : []
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 0);
                test.equals(expected, 0);
                test.equals(msg, 'Testing if elements count <.notfound> is 0.');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('.notfound', 0);
    },

    tearDown : function(callback) {
        callback();
    }
}
