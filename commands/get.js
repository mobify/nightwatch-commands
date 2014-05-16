// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(url, callback) {
    var client = this;

    return client.url(url)
        .waitUntilMobified(10000, function(result) {
            if (typeof callback === 'function') {
                callback.call(client, result);
            }
        });

};
