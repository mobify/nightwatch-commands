var util = require('util'),
    events = require('events');

var CommandAction = function() {
    events.EventEmitter.call(this);
    this.startTimer = null;
    this.cb = null;
    this.ms = null;
    this.selector = null;
    this.protocol = require('nightwatch/lib/api/protocol.js')(this.client);
};

util.inherits(CommandAction, events.EventEmitter);

CommandAction.prototype.command = function(expectedContextsCount, milliseconds, timeout, messages, callback) {

    if (milliseconds && typeof milliseconds !== 'number') {
        throw new Error('waitForContextsReady expects second parameter to be number; ' + typeof (milliseconds) + ' given');
    }

    var lastArgument = Array.prototype.slice.call(arguments, 0).pop();
    if (typeof (lastArgument) === 'function') {
        callback = lastArgument;
    }

    if (!messages || typeof messages !== 'object') {
        messages = {
            success: 'All contexts found after ',
            timeout: 'Timed out while waiting for contexts after '
        };
    }

    timeout = timeout && typeof (timeout) !== 'function' && typeof (timeout) !== 'object' ? timeout : 0;

    this.startTimer = new Date().getTime();
    this.cb = callback || function() {};
    this.ms = milliseconds || 1000;
    this.timeout = timeout;
    this.messages = messages;
    this.check(expectedContextsCount);
    return this;
};

CommandAction.prototype.check = function(expectedContextsCount) {
    var self = this;

    this.protocol.contexts(function(result) {
        var now = new Date().getTime();
        var contextsCount = result.value ? result.value.length : -1;

        if (expectedContextsCount === contextsCount) {
            setTimeout(function() {
                var msg = self.messages.success + (now - self.startTimer) + ' milliseconds.';
                self.cb.call(self.client.api, result.value);
                self.client.assertion(true, !!result.value, false, msg, true);
                return self.emit('complete');
            }, self.timeout);
        } else if (now - self.startTimer < self.ms) {
            setTimeout(function() {
                self.check(expectedContextsCount);
            }, 500);
        } else {
            var msg = self.messages.timeout + self.ms + ' milliseconds.';
            self.cb.call(self.client.api, false);
            self.client.assertion(false, false, false, msg, true);
            return self.emit('complete');
        }
    });
};

module.exports = CommandAction;
