/**
 * Preview will use preview.mobify.com to open a website and allow you to preview
 * a given bundle. The bundle and base URL will need to be set in the the
 * `tests/integration/site.json` file. Additionally, you can pass a URL as an
 * argument when you call preview(). Upon completion, waitForPageToBeMobified
 * is called, to be sure that the adaptation is complete.
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
var site = require(path.join(path.resolve('./'), '/tests/integration/site.json'));
var qs = require('querystring');

site = site.profiles[site.activeProfile];

exports.command = function(url, callback) {
    var browser = this;

    if (typeof url === 'function'){
        callback = url;
        url = site.siteUrl;
    }

    url = url || site.siteUrl;

    var bundleUrl = site.bundleUrl || 'http://localhost:8080';

    var params = qs.stringify({ url: url, site_folder: bundleUrl });

    return browser.url('http://preview.mobify.com?' + params)
        .waitForElementPresent('#authorize', 10000, function() {
            this.click('#authorize', function() {
                browser.waitForPageToBeMobified(10000, function(result) {
                    if (typeof callback === 'function') {
                        callback.call(browser, result);
                    }
                });
            });
        });
};
