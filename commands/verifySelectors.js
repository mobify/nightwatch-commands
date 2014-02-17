var async = require('async');

exports.command = function(selectors) {
    var self = this,
        url = '';

    if (!Array.isArray(selectors)) {
        selectors = Array.prototype.slice.call(arguments, 0);
    }

    async.series([
        function(callback) {
            self.url(function(result) {
                url = result.value;
                callback(null, result);
            });
        },
        function(callback) {
            selectors.forEach(function(selector) {
                self.element.call(self.client, 'css selector', selector, function(result) {
                    var value;

                    if (result.status == 0) {
                        value = result.value.ELEMENT;
                    }

                    if (value) {
                        self.assertion(value !== null, value, true, 'Found the ' + selector + ' selector', false);
                    } else {
                        self.log('Missing the ' + selector + ' selector');
                    }

                    callback(null, 'done');
                });
            });
        }
    ]);

    return this;
};
