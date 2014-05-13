
module.exports = {
    setUp: function (callback) {
        callback();
    },

    'Elements Present found messaging is correct for one element' : function(test) {
        var Assertion = require('../../assertions/elementsVisible.js');

        var client = {
            options: {},
            api: {
                isVisible: function(selector, callback) {
                    callback({
                        status: 0,
                        value : true
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 0);
                test.equals(expected, 0);
                test.equals(msg, 'Page contained 1 visible element.');
                test.equals(abortOnFailure, false);
                delete Assertion;
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
        var Assertion = require('../../assertions/elementsVisible.js');

        var client = {
            options: {},
            api: {
                isVisible: function(selector, callback) {
                    callback({
                        status: 0,
                        value : true
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 0);
                test.equals(expected, 0);
                test.equals(msg, 'Page contained 2 visible elements.');
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

    'Elements Present not found messaging is correct' : function(test) {
        var Assertion = require('../../assertions/elementsVisible.js');
        var client = {
            options: {},
            api: {
                isVisible : function(selector, callback) {
                    callback({
                        status: -1,
                        value : false
                    });
                }
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result, 1);
                test.equals(expected, 0);
                test.equals(msg, 'The following elements were not visible on the page: <.notfound>');
                test.equals(abortOnFailure, false);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;

        m.command('.notfound');
    },

    tearDown : function(callback) {
        callback();
    }
};
