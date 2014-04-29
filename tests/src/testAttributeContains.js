var BASE_PATH = process.env.NIGHTWATCH_COV
  ? 'lib-cov'
  : 'lib';
var Api = require('../../node_modules/nightwatch/lib/core/api.js');
module.exports = {
  setUp: function (callback) {
    callback();
  },

  'attributeContains assertion passed' : function(test) {
    var assertionFn = require('../../assertions/attributeContains.js');
    var client = {
      options : {},
      api : {
        getAttribute : function(cssSelector, attribute, callback) {
          test.equals(cssSelector, '.test_element');
          test.equals(attribute, 'href');
          callback({
            value : 'http://www.google.ca'
          });
        }
      },
      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, true);
        test.equals(result, 'http://www.google.ca');
        test.equals(expected, 'google');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };
    Api.init(client);
    var m = Api.createAssertion('attributeContains', assertionFn, true, client);
    m._commandFn('.test_element', 'href', 'google', 'Test message');
  },

  'attributeContains assertion failed' : function(test) {
    var assertionFn = require('../../assertions/attributeContains.js');
    var client = {
      options : {},
      api : {
        getAttribute : function(cssSelector, attribute, callback) {
          callback({
            value : 'not_expected'
          });
        }
      },

      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, false);
        test.equals(result, 'not_expected');
        test.equals(expected, 'somevalue');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };

    Api.init(client);
    var m = Api.createAssertion('attributeContains', assertionFn, true, client);
    m._commandFn('.test_element', 'role', 'somevalue', 'Test message');
  },

  'attributeContains assertion not found' : function(test) {
    var assertionFn = require('../../assertions/attributeContains.js');
    var client = {
      options : {},
      api : {
        getAttribute : function(cssSelector, attribute, callback) {
          callback({
            status : -1
          });
        }
      },
      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, false);
        test.equals(result, null);
        test.equals(expected, 'main');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };

    Api.init(client);
    var m = Api.createAssertion('attributeContains', assertionFn, true, client);
    m._commandFn('.test_element', 'role', 'main', 'Test message');
  },

  tearDown : function(callback) {
    callback();
  }
}

