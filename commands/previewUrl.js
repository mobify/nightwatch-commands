// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(url, bundleUrl, callback) {
    this
        .url('http://preview.mobify.com')
            .setValue('input[name="url"]', url)
            .setValue('input[type="site_folder"]', bundleUrl)
            .click()
        .url(url)
        .waitForPageToBeMobified();

    return this; // allows the command to be chained.
};
