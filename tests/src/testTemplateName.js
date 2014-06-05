module.exports = {
    setUp: function(callback) {
        callback();
    },

    'Mobify template name is correct': function(test) {
        var Assertion = require('../../assertions/templateName.js');
        var client = {
            api: {
                getMobifyEvaluatedData: function(callback) {
                    callback({
                        content: {
                            templateName: 'home'
                        }
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result.content.templateName, 'home');
                test.equals(expected, 'home');
                test.equals(msg, 'Testing if the actual page template <home> equals the expected <home>.');
                test.equals(abortOnFailure, true);
                Assertion = null;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;

        m.command('home');
    },

    'Mobify template name is incorrect': function(test) {
        var Assertion = require('../../assertions/templateName.js');
        var client = {
            api: {
                getMobifyEvaluatedData: function(callback) {
                    callback({
                        content: {
                            templateName: 'main'
                        }
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result.content.templateName, 'main');
                test.equals(expected, 'home');
                test.equals(msg, 'Testing if the actual page template <main> equals the expected <home>.');
                test.equals(abortOnFailure, true);
                Assertion = null;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;
        m.api = client.api;

        m.command('home');
    },

    tearDown: function(callback) {
        callback();
    }
};
