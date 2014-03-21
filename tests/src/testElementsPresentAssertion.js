// var Api = require('../../node_modules/nightwatch/lib/api.js');
//
// module.exports = {
//     setUp: function (callback) {
//         callback();
//     },
//
//     'Elements Present found messaging is correct' : function(test) {
//         var assertionFn = require('../../assertions/elementsPresent.js');
//
//         var client = {
//             options: {},
//             api: {
//                 element: function(using, selector, callback) {
//                     callback({
//                         status: 0,
//                         value : {
//                             ELEMENT: 'body'
//                         }
//                     });
//                 }
//             },
//             assertion : function(passed, result, expected, msg, abortOnFailure) {
//                 test.equals(passed, true);
//                 // test.equals(result, 0);
//                 // test.equals(expected, 0);
//                 test.equals(msg, 'Testing if the elements are present <body>');
//                 // test.equals(abortOnFailure, false);
//                 delete Assertion;
//                 test.done();
//             }
//         };
//
//         Api.init(client);
//         var m = Api.createAssertion('elementsPresent', assertionFn, true, client);
//         console.log(assertionFn)
//         // m._commandFn('body');
//     },
//
//     'Elements Present not found messaging is correct' : function(test) {
//         var Assertion = require('../../assertions/elementsPresent.js');
//         var client = {
//             element : function(using, selector, callback) {
//                 callback({
//                     status: -1,
//                     value : {
//                         ELEMENT: ''
//                     }
//                 });
//             },
//             assertion : function(passed, result, expected, msg, abortOnFailure) {
//                 test.equals(passed, false);
//                 test.equals(result, 1);
//                 test.equals(expected, 0);
//                 test.equals(msg, '<.notfound> missing from page.');
//                 test.equals(abortOnFailure, false);
//                 delete Assertion;
//                 test.done();
//             }
//         };
//
//         var m = new Assertion();
//         m.abortOnFailure = true;
//         m.client = client;
//
//         m.command('.notfound');
//     },
//
//     tearDown : function(callback) {
//         callback();
//     }
// };
