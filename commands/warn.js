/**
 * Logs a warning message to console - same as log command but more 'in your face' styling
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser
 *      .warn('Unclean data detected, tests may fail!')
 *      .click('#weirdSelectorThatMakesItNotClearWeAreSubmitting');
 * };
 * ```
 *
 * @method warn
 * @param {string} message The message to log to the console.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

var chalk = require('chalk');
var infoSymbol = String.fromCharCode('9432');

var warn = function (message, callback) {
    var browser = this;

    browser.perform(function () {
        console.log(" " + chalk.red.bold(infoSymbol) + "  " + chalk.bgRed.bold(message));
    });

    if (typeof callback === 'function') {
        callback.call(this);
    }
    return this;
};

exports.command = warn;
