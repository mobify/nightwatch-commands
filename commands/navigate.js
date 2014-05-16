exports.command = function(selector, callback) {
    var client = this;

    // Clicks a link, navigates to the URL and then waits for the page
    // to be mobified before continuing the chain.
    //
    client
        .click(selector)
        .waitUntilMobified(8000, function(result) {
            if (typeof callback === 'function') {
                callback.call(client, result);
            }
        });

    return this;
};
