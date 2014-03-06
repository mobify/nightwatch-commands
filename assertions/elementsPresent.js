var util = require('util'),
    async = require('async'),
    events = require('events');

function Assertion() {
    events.EventEmitter.call(this);
    this.startTimer = null;
    this.cb = null;
    this.ms = null;
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

    this.startTimer = new Date().getTime();
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
        self.client.element.call(self, 'css selector', selector, function(result) {
            var value;

            if (result.status == 0) {
                value = result.value.ELEMENT;
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

        if (result === 0) {
            var foundMsg = found.map(function(el){
                return '<' + el + '>';
            });
            var msg = foundMsg.join(', ') + ' located on page.';
            var passed = true;
        } else {
            var missingMsg = missing.map(function(el){
                return '<' + el + '>';
            });
            var msg = missingMsg.join(', ') + ' missing from page.';
            var passed = false;
        }

        self.client.assertion(passed, result, 0, msg, false);
        self.cb(result);
        self.emit('complete');
    }

    async.each(selectors, checkElement, returnResults);

};

module.exports = Assertion;
