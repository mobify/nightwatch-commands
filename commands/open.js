// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(url, callback) {
    var self = this;

    this.url(url)

    return this; // allows the command to be chained.
};
