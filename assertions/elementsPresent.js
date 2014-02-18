var async = require('async');

function Assertion() {}
Assertion.prototype.command = function command() {
    var self = this,
        missing = [];

    var selectors = Array.prototype.slice.call(arguments, 0);

    async.each(selectors,
        function(selector, cb) {
            self.client.element.call(self, 'css selector', selector, function(result) {
                var value;

                if (result.status == 0) {
                    value = result.value.ELEMENT;
                }

                if (!value) {
                    missing.push(selector);
                }

                cb();
            });
        },
        function(err) {
            if (!err) {
                self.client.assertion(!missing.length, missing.join(', ') + ' missing from page.', 'all elements found', 'Locating required elements on page.', false);
            }
        });

    return this;
};

module.exports = Assertion;
