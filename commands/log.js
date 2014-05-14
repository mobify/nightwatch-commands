var util = require('util');
var events = require('events');

/**
 * Logs a message to the console, allowing for adding messages to test output
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser
 *      .log('Testing submitting form')
 *      .click('#weirdSelectorThatMakesItNotClearWeAreSubmitting');
 * };
 * ```
 *
 * @method log
 * @param {string} message The message to log to the console.
 * @param {string} logLevel The type of log message to output.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

function Log() {
    events.EventEmitter.call(this);
}

util.inherits(Log, events.EventEmitter);

Log.prototype.command = function(message, logLevel, callback) {
    message && console.log(message);

    if (typeof callback === 'function') {
        callback.call(this.client);
    }

    this.emit('complete');

    return this;
};

module.exports = Log;
