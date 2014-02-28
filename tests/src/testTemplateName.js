module.exports = {
    setUp: function (callback) {
        callback();
    },

    'Mobify template name is correct' : function(test) {
        var Assertion = require('../../assertions/templateName.js');
        var client = {
            getEvaluatedData : function(callback) {
                callback({
                    value : {
                        content: {
                            templateName: 'home'
                        }
                    }
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result.content.templateName, 'home');
                test.equals(expected, 'home');
                test.equals(msg, 'Testing if the page template equals <home>.');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('home');
    },

    'Mobify template name is incorrect' : function(test) {
        var Assertion = require('../../assertions/templateName.js');
        var client = {
            getEvaluatedData : function(callback) {
                callback({
                    value : {
                        content: {
                            templateName: 'main'
                        }
                    }
                });
            },
            assertion : function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result.content.templateName, 'main');
                test.equals(expected, 'home');
                test.equals(msg, 'Testing if the page template equals <home>.');
                test.equals(abortOnFailure, true);
                delete Assertion;
                test.done();
            }
        };

        var m = new Assertion();
        m.abortOnFailure = true;
        m.client = client;

        m.command('home');
    },

    tearDown : function(callback) {
        callback();
    }
}
