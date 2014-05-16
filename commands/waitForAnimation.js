var util = require('util');
var events = require('events');

/**
 * Suspends the test for the given time in milliseconds while waiting for animation to complete.
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser.waitForAnimation();
 * };
 * ```
 *
 * @method waitForAnimation
 * @param {number} ms The number of milliseconds to wait.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

function WaitForAnimation() {
    events.EventEmitter.call(this);
}

util.inherits(WaitForAnimation, events.EventEmitter);

WaitForAnimation.prototype.command = function(ms, cb) {
    var self = this;

    ms = ms || 1000;

    setTimeout(function() {
        // if we have a callback, call it right before the complete event
        if (cb) {
            cb.call(self.client.api);
        }

        self.emit('complete');
    }, ms);

    return this;
};

module.exports = WaitForAnimation;
