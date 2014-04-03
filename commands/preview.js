var path = require('path');
var site = require(path.join(path.resolve('./'), '/tests/integration/site.json'));
var qs = require('querystring');

exports.command = function(url, callback) {
    var browser = this;

    var lastArgument = Array.prototype.slice.call(arguments, 0).pop();
    if (typeof (lastArgument) === 'function') {
        callback = lastArgument;
    }

    if (typeof url !== 'string'){
        url = site.siteUrl;
    }

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
