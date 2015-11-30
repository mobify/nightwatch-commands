/**
 * Preview will use preview.mobify.com to open a website and allow you to preview
 * a given bundle. The bundle and base URL will need to be set in the the
 * `tests/system/site.json` file. Additionally, you can pass a URL as an
 * argument when you call preview(). Upon completion, waitUntilMobified
 * is called, to be sure that the adaptation is complete.
*
 * If `site.json` does not exist, this command will just go to the specified URL. 
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview();
 *    };
 * ```
 * or with a URL
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview('http://my-awesome-project.com');
 *    };
 * ```
 *
 * @method attributeEquals
 * @param {string} [URL] (optional) The URL to be previewed.
 * @param {function} callback The function to be called on completion.
 * @api assertions
 */

var path = require('path');

try {
    var site = require(path.join(path.resolve('./'), '/tests/system/site.json'));
} catch (e) {
    if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
        console.log('Not using optional site.json...');
    }
}
var qs = require('querystring');

exports.command = function(url, callback) {
    var browser = this;

    if (site) { 
        site = site.profiles[site.activeProfile];

        if (typeof url === 'function') {
            callback = url;
            url = site.siteUrl;
        }

        // First checks for the URL, otherwise uses the site.siteURL, then makes sure
        // that there is an http prefix. The preview function doesn't need this, but
        // the browser.get() method does.
        url = url || site.siteUrl;

        if (!url.match(/^http/)) {
            throw new Error('Site URL must be correctly formatted');
        }

        // If the production flag is set, just runs a `get()` on the URL.
        if (site.production) {
            return browser.get(url, function(result) {
                if (typeof callback === 'function') {
                    callback.call(browser, result);
                }
            });
        }

        var bundleUrl = site.bundleUrl || 'https://localhost:8443/adaptive.js';

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
    } else {
        return browser.url(url, function(result) {
            if (typeof callback === 'function') {
                callback.call(browser, result);
            }
        });
    }
};