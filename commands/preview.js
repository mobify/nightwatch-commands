/**
 * Preview will use preview.mobify.com to open a website and allow you to preview
 * a given bundle. The site URL and bundle URL should be passed in. Upon completion, waitUntilMobified is called, to be sure that the
 * adaptation is complete.
*
 * Usage:
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview('https://www.merlinspotions.com', 'https://localhost:8443/loader.js');
 *    };
 * ```
 *
 * @method preview
 * @param {string} [url] Corresponds to the Site URL field on https://preview.mobify.com
 * @param {string} [bundle] Corresponds to the Bundle Location field on https://preview.mobify.com
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

var qs = require('querystring');

exports.command = function(url, bundle, callback) {
    var browser = this;

    if (arguments.length < 2) {
        throw new Error('Usage: browser.preview(url, bundle, callback)');
    }

    if (typeof bundle === 'function') {
        callback = bundle;
        bundle = null;
    }

    var bundleUrl = bundle || 'https://localhost:8443/loader.js';

    var params = qs.stringify({'url': url, 'site_folder': bundleUrl});

    return browser.url('https://preview.mobify.com?' + params)
        .waitForElementPresent('#authorize', 10000, function() {
            this.click('#authorize', function() {
                browser.waitUntilMobified(10000, function(result) {
                    if (typeof callback === 'function') {
                        callback.call(browser, result);
                    }
                });
            });
        });
};
