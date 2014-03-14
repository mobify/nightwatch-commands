function Assertion() {}
Assertion.prototype.command = function command(cssSelector, expectedCount, message) {
    var self = this;
    var msg = (message && message !== '') ? message : 'Testing if elements count <' + cssSelector + '> is ' + expectedCount + '.';

    return this.client.elements("css selector", cssSelector, function(result) {
        var value = 0;
        if (result.status == 0) {
            value = result.value.length;
        }
        self.client.assertion(value === expectedCount, value, expectedCount, msg, self.abortOnFailure);
    });
};
module.exports = Assertion;
