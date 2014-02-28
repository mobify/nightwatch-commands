var util = require('util'),
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
  this.missing = [];
  this.checkElements();
  return this;
};

Assertion.prototype.checkElements = function() {
    var self = this;
    var selector = this.selectors.shift();

    this.client.element.call(self, 'css selector', selector, function(result) {
        var value;

        if (result.status == 0) {
            value = result.value.ELEMENT;
        }

        if (!value) {
            self.missing.push(selector);
        }

        if (self.selectors.length){
            self.checkElements();
        } else {
            var errorMsg = self.missing.join(', ') + ' missing from page.';
            if (self.missing.length === 0) {
              var msg = 'Located all required elements on page.';
              var result = true;
            } else {
              var missing = self.missing.map(function(el){
                return '<' + el + '>';
              })
              var msg = missing.join(', ') + ' missing from page.';
              var result = false;
            }

            self.client.assertion(true, result, false, msg, false);
            self.cb(result);
            self.emit('complete');
        }
    });

};

module.exports = Assertion;
