// var util = require('util'),
//     async = require('async'),
//     events = require('events');
//
// function Assertion() {
//     events.EventEmitter.call(this);
//     this.startTimer = null;
//     this.cb = null;
//     this.ms = null;
//     this.abortOnFailure = true;
//     this.selector = null;
// }
//
// util.inherits(Assertion, events.EventEmitter);
//
// Assertion.prototype.command = function(selectors, callback) {
//     var args = Array.prototype.slice.call(arguments, 0);
//     var lastArgument = args[args.length - 1];
//
//     if (typeof (lastArgument) === 'function') {
//         callback = args.pop();
//     } else {
//         callback = function() {};
//     }
//
//     this.startTimer = new Date().getTime();
//     this.cb = callback;
//     this.selectors = args.slice(0);
//     this.checkElements();
//     return this;
// };
//
// Assertion.prototype.checkElements = function() {
//     var self = this;
//     var missing = [];
//     var found = [];
//     var selectors = this.selectors;
//
//     function checkElement(selector, cb) {
//         self.client.element.call(self, 'css selector', selector, function(result) {
//             var value;
//
//             if (result.status == 0) {
//                 value = result.value.ELEMENT;
//             }
//
//             if (value) {
//                 found.push(selector);
//             } else {
//                 missing.push(selector);
//             }
//
//             cb();
//         });
//     }
//
//     function returnResults(err) {
//         var result = missing.length;
//
//         if (result === 0) {
//             var foundMsg = found.map(function(el){
//                 return '<' + el + '>';
//             });
//             var msg = foundMsg.join(', ') + ' located on page.';
//             var passed = true;
//         } else {
//             var missingMsg = missing.map(function(el){
//                 return '<' + el + '>';
//             });
//             var msg = missingMsg.join(', ') + ' missing from page.';
//             var passed = false;
//         }
//
//         self.client.assertion(passed, result, 0, msg, false);
//         self.cb(result);
//         self.emit('complete');
//     }
//
//     async.each(selectors, checkElement, returnResults);
//
// };

// module.exports = Assertion;

/**
 * Checks if the given selectors are present and returns a list of missing selectors.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.elementsCount('#x-root', 1);
 *    };
 * ```
 *
 * @method attributeEquals
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} attribute The attribute name
 * @param {string} expected The expected value of the attribute to check.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var util = require('util');
exports.assertion = function(selectors, msg) {

    var MSG_ELEMENT_NOT_FOUND = 'Testing if the page template equals <%s>. ' +
        'Template was not found.';

    this.message = msg || util.format('Testing if the page template equals <%s> is %s.', expected);

    this.expected = function() {
        return expected;
    };

    this.pass = function(value) {
        return 'foo' === 'foo';
    };

    this.failure = function(result) {
        var failed = result === false || result && result.status === -1;
        if (failed) {
            this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, expected);
        }
        return failed;
    };

    this.value = function(result) {
        return result;
    };

    this.command = function(callback) {
        return this;
    };

};
