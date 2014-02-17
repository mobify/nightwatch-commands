var async = require('async');

exports.command = function(selectors) {
    var self = this,
        url = '', 
        missing = [];

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

                    if (!value) {
                        missing.push(selector);
                    }

                    callback(null, 'done');
                });
            });
        }
    ]);

    self.assertion(!missing.length, missing, true, 'All selectors found', false);

    return this;
};
