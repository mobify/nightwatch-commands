var Api = require('../../node_modules/nightwatch/lib/core/api.js');

module.exports = {
    setUp: function(callback) {
        callback();
    },

    'Elements Count items found message is correct': function(test) {
        var assertionFn = require('../../assertions/elementsCount.js');

        var client = {
            options: {},
            api: {
                elements: function(selectorStrategy, selector, callback) {
                    test.equals(selectorStrategy, 'css selector');
                    test.equals(selector, '.some-parent .with-children');
                    callback({
                        status: 0,
                        value: [
                            { ELEMENT: '6' },
                            { ELEMENT: '7' },
                            { ELEMENT: '8' },
                            { ELEMENT: '9' },
                            { ELEMENT: '10' },
                            { ELEMENT: '11' }
                        ]
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, true);
                test.equals(result, 6);
                test.equals(expected, 6);
                test.equals(msg, 'Testing if the count for the element <.some-parent .with-children> is 6.');
                test.equals(abortOnFailure, true);
                test.done();
            }
        };

        Api.init(client);
        var m = Api.createAssertion('elementsCount', assertionFn, true, client);
        m._commandFn('.some-parent .with-children', 6);
    },

    'Elements Count no items found messaging is correct': function(test) {
        var assertionFn = require('../../assertions/elementsCount.js');
        var client = {
            options: {},
            api: {
                elements: function(selectorStrategy, selector, callback) {
                    test.equals(selectorStrategy, 'css selector');
                    test.equals(selector, '.notfound');
                    callback({
                        status: -1,
                        value: []
                    });
                }
            },
            assertion: function(passed, result, expected, msg, abortOnFailure) {
                test.equals(passed, false);
                test.equals(result, null);
                test.equals(expected(), 0);
                test.equals(msg, 'Testing if the count for the element <.notfound> is 0. ');
                test.equals(abortOnFailure, true);
                test.done();
            }
        };

        Api.init(client);
        var m = Api.createAssertion('elementsCount', assertionFn, true, client);
        m._commandFn('.notfound', 0);
    },

    tearDown: function(callback) {
        callback();
    }
};
