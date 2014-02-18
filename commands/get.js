// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(url, callback) {
    this
        .url(url)
        .waitForPageToBeMobified();

    return this; // allows the command to be chained.
};
