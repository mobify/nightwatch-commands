// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(template, callback) {
    var self = this;
    var start = new Date().getTime();

    this.waitForCondition('return $.active', 1000, 2000, function callback(result) {
        var now = new Date().getTime();
        var msg = "AJAX call completed after " + (now - self.startTimer) + " milliseconds.";
        self.assertion(true, result.value, 0, msg, true);
    });

    return this; // allows the command to be chained.
};
