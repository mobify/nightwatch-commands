/**
 * Checks if the given template name is correct.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.templateName('home');
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

var util = require('util'),
    events = require('events');

function Assertion() {
    events.EventEmitter.call(this);
    this.cb = null;
    this.abortOnFailure = true;
    this.expected = null;
}

util.inherits(Assertion, events.EventEmitter);

Assertion.prototype.command = function(expected, msg) {
    this.expected = expected;
    this.checkTemplateName();
    this.msg = msg;

    return this;
};

Assertion.prototype.checkTemplateName = function() {
    var self = this;
    var expected = this.expected;
    var msg = this.msg;

    this.api.getMobifyEvaluatedData(function(result) {
        if (result) {
            var actual = result.templateName || result.content.templateName;
            var passed = actual === expected;
            msg = msg || ('Testing if the actual page template <' + actual + '> equals the expected <' + expected + '>.');
            self.client.assertion(passed, result, expected, msg, self.abortOnFailure);
            self.emit('complete');
        } else {
            self.checkTemplateName();
        }
    });
};

module.exports = Assertion;
