module.exports = {
    setUp: function(callback) {
        callback();
    },

    'Elements Present found messaging is correct for one element' : function(test) {
        var Assertion = require('../../assertions/elementsPresent.js');

        var client = {
            options: {},
            api: {
                element: function(using, selector, callback) {
                    callback({
                        status: 0,
                        value: {
                            ELEMENT: 'body'
                        }
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 0);
                test.equals(expected, 0);
                test.equals(msg, 'Page contained 1 expected element.');
                test.equals(abortOnFailure, false);
                Assertion = null;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;
        m.command('body');
    },

    'Elements Present found messaging is correct for multiple elements' : function(test) {
        var Assertion = require('../../assertions/elementsPresent.js');

        var client = {
            options: {},
            api: {
                element: function(using, selector, callback) {
                    callback({
                        status: 0,
                        value : {
                            ELEMENT: 'body',
                            ELEMENT: '.element'
                        }
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 0);
                test.equals(expected, 0);
                test.equals(msg, 'Page contained 2 expected elements.');
                test.equals(abortOnFailure, false);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;
        m.command('body', '.element');
    },

    'Elements Present not found messaging is correct': function(test) {
        var Assertion = require('../../assertions/elementsPresent.js');
        var client = {
            options: {},
            api: {
                element: function(using, selector, callback) {
                    callback({
                        status: -1,
                        value: {
                            ELEMENT: ''
                        }
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result, 1);
                test.equals(expected, 0);
                test.equals(msg, 'Page missing the following elements: <.notfound>.');
                test.equals(abortOnFailure, false);
                Assertion = null;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;

        m.command('.notfound');
    },

    tearDown: function(callback) {
        callback();
    }
};
