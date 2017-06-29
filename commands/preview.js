/**
 * Preview will use preview.mobify.com to open a website and allow you to preview
 * a given bundle. The site URL and bundle URL should be passed in along with a 
 * production flag. Legacy projects use a `tests/system/site.js` file to set the site URL * and bundle URL. Upon completion, waitUntilMobified is called, to be sure that the 
 * adaptation is complete.
*
 * Usage:
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview('https://www.merlinspotions.com', 'https://localhost:8443/loader.js', false);
 *    };
 * ```
 * 
 * With a site.js file (deprecated):
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview();
 *    };
 * ```
 * Or with a site.js file and a URL (deprecated): 
 * ```
 *    this.demoTest = function (client) {
 *      browser.preview('http://my-awesome-project.com');
 *    };
 * ```
 *
 * @method preview
 * @param {string} [url] Corresponds to the Site URL field on https://preview.mobify.com
 * @param {string} [bundle] Corresponds to the Bundle Location field on https://preview.mobify.com
 * @param {boolean} [isProduction] true if the test should bypass Preview step and test with the published bundle, false if the test should use the specified bundle
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

var path = require('path');
var qs = require('querystring');
var siteConfig, site;

var readSiteConfig = function() {
    try {
        siteConfig = require(path.join(path.resolve('./'), '/tests/system/site.json'));
    } catch (e) {
        if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
            console.log('Not using optional site.json. Looking for site.js...');
        }
    }

    try {
        siteConfig = require(path.join(path.resolve('./'), '/tests/system/site.js'));
    } catch (e) {
        if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
            console.log('Not using optional /tests/system/site.js.');
        }
    }

    try {
        siteConfig = require(path.join(path.resolve('./'), '/system/site.js'));
    } catch (e) {
        if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
            console.log('Not using optional /system/site.js.');
        }
    }

    if (siteConfig) {
        site = siteConfig.profiles[siteConfig.activeProfile];
    } else {
        throw new Error('Usage: browser.preview(url, bundle, isProduction, callback), or create a tests/system/site.js file')
    }

};

exports.command = function(url, bundle, isProduction, callback) {
    var browser = this;
    if (arguments.length <= 2) { // Legacy command, uses site.js
        if (typeof url === 'function') {
            callback = url;
            url = '';
        } else if (typeof bundle === 'function') {
            callback = bundle;
            bundle = '';
        }
        readSiteConfig();
    } else {
        site = new Object();
        site.siteUrl = url;
        site.bundleUrl = bundle;
        if (typeof isProduction === 'function') {
            callback = isProduction;
            isProduction = '';
        }
    }
    // First checks for the URL, otherwise uses the site.siteURL, then makes sure
    // that there is an http prefix. The preview function doesn't need this, but
    // the browser.get() method does.
    url = url || site.siteUrl;

    if (!url.match(/^http/)) {
        throw new Error('Site URL must begin with HTTP(S)');
    }

    // If the production flag is set, just runs a `get()` on the URL.
    if (site.production || isProduction) {
        return browser.get(url, function(result) {
            if (typeof callback === 'function') {
                callback.call(browser, result);
            }
        });
    }

    var bundleUrl = site.bundleUrl || 'https://localhost:8443/loader.js';

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
