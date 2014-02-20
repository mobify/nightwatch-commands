var Protocol = require('nightwatch/lib/selenium/protocol.js'),
    util = require('util'),
    events = require('events');

function CommandAction() {
  events.EventEmitter.call(this);
  this.startTimer = null;
  this.cb = null;
  this.ms = null;
  this.selector = null;
};

util.inherits(CommandAction, events.EventEmitter);
CommandAction.prototype.command = function(milliseconds, callback) {
  if (milliseconds && typeof milliseconds != 'number') {
    throw new Error('waitForPageToBeMobified expects first parameter to be number; ' +
      typeof (milliseconds) + ' given')
  }
  this.startTimer = new Date().getTime();
  this.cb = callback || function() {};
  this.ms = milliseconds || 1000;
  this.check();
  return this;
}

CommandAction.prototype.check = function() {
  var self = this;
  var msg = 'Timed out while waiting for page to be Mobified after ' + self.ms + ' milliseconds.';

  Protocol.actions.execute.call(this.client, 'return Mobify.evaluatedData', function(result) {
    var now = new Date().getTime();
    var timeout = 1000;

    if (result.status === 0 && !!result.value) {
      setTimeout(function() {
        self.cb(result.value);
        var msg = 'Page was Mobified after ' + (now - self.startTimer) + ' milliseconds.';
        self.client.assertion(true, !!result.value, false, msg, true);
        return self.emit('complete');
      }, timeout);
    } else if (now - self.startTimer < self.ms) {
      setTimeout(function() {
        self.check();
      }, 500);
    } else {
      self.cb(false);
      self.client.assertion(false, false, false, msg, true);
      return self.emit('complete');
    }
  });
};

module.exports = CommandAction;
