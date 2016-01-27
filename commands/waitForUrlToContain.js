var util = require('util'),
    events = require('events');

var WaitForUrlToContain = function() {
    events.EventEmitter.call(this);
    this.startTimer = null;
    this.cb = null;
    this.ms = null;
    this.selector = null;
    this.protocol = require('nightwatch/lib/api/protocol.js')(this.client);
};

util.inherits(WaitForUrlToContain, events.EventEmitter);

/**
 * Waiting for url expected
 * @param  {string} url [url expected to contain]
 * @param  {number} milliseconds [total time until command times out]
 * @param  {number} timeout [time to wait before command starts polling the URL]
 * @param  {Object} messages [message output]
 * @param  {Function} callback [callback]
 * @return {[type]} [client]
 */
WaitForUrlToContain.prototype.command = function(url, milliseconds, timeout, messages, callback) {

    if (milliseconds && typeof milliseconds !== 'number') {
        throw new Error('waitForCondition expects second parameter to be number; ' + typeof (milliseconds) + ' given');
    }

    var lastArgument = Array.prototype.slice.call(arguments, 0).pop();
    if (typeof (lastArgument) === 'function') {
        callback = lastArgument;
    }

    if (!messages || typeof messages !== 'object') {
        messages = {
            success: 'Url expected after ',
            timeout: 'Timed out while waiting for url after '
        };
    }

    timeout = timeout && typeof (timeout) !== 'function' && typeof (timeout) !== 'object' ? timeout : 0;

    this.startTimer = new Date().getTime();
    this.cb = callback || function() {
    };
    this.ms = milliseconds || 10000;
    this.timeout = timeout;
    this.url = url;
    this.messages = messages;
    this.check();
    return this;
};

WaitForUrlToContain.prototype.check = function() {
    var self = this;

    this.protocol.url(function(result) {
        var now = new Date().getTime();

        if (result.status === 0 && (result.value.indexOf(self.url) > -1)) {
            setTimeout(function() {
                var msg = self.messages.success + (now - self.startTimer) + ' milliseconds.';
                self.cb.call(self.client.api, result.value);
                self.client.assertion(true, !!result.value, false, msg, true);
                return self.emit('complete');
            }, self.timeout);
        } else if (now - self.startTimer < self.ms) {
            setTimeout(function() {
                self.check();
            }, 500);
        } else {
            var msg = self.messages.timeout + self.ms + ' milliseconds.';
            self.cb.call(self.client.api, false);
            self.client.assertion(false, false, false, msg, true);
            return self.emit('complete');
        }
    });
};

module.exports = WaitForUrlToContain;
