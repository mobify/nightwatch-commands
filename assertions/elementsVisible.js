/**
 * Checks if the given selectors are visible and returns a list of selectors that are not visible on the page.
 *
 * ```
 *    this.demoTest = function (client) {
 *        browser.assert.elementsVisible('#x-root', '#x-head');
 *    };
 * ```
 *
 * @method attributeEquals
 * @param {string} selectors The selectors (CSS / Xpath) used to locate the elements, separated by commas.
 * @param {string} expected The expected value of the attribute to check.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var async = require('async'),
    util = require('util'),
    events = require('events');

function Assertion() {
    events.EventEmitter.call(this);
    this.cb = null;
    this.abortOnFailure = true;
    this.selector = null;
}

util.inherits(Assertion, events.EventEmitter);

Assertion.prototype.command = function(selectors, callback) {
    var args = Array.prototype.slice.call(arguments, 0);
    var lastArgument = args[args.length - 1];

    if (typeof (lastArgument) === 'function') {
        callback = args.pop();
    } else {
        callback = function() {};
    }

    this.cb = callback;
    this.selectors = args.slice(0);
    this.checkElements();

    return this;
};

Assertion.prototype.checkElements = function() {
    var self = this;
    var missing = [];
    var found = [];
    var selectors = this.selectors;

    function checkElement(selector, cb) {
        self.api.isVisible.call(self, selector, function(result) {
            var value;

            if (result.status === 0) {
                value = result.value;
            }

            if (value) {
                found.push(selector);
            } else {
                missing.push(selector);
            }

            cb();
        });
    }

    function returnResults(err) {
        var result = missing.length;
        var msg, passed;

        if (result === 0) {
            msg = util.format('Page contained %s visible element%s.', found.length, found.length > 1 ? 's' : '');
            passed = true;
        } else {
            var missingMsg = missing.map(function(el) {
                return '<' + el + '>';
            });
            msg = util.format('The following elements were not visible on the page: %s', missingMsg.join(', '));
            passed = false;
        }

        self.client.assertion(passed, result, 0, msg, false);
        self.cb(result);
        self.emit('complete');
    }

    async.each(selectors, checkElement, returnResults);
};

module.exports = Assertion;
