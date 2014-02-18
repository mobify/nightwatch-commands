var async = require('async');

exports.command = function(selectors) {
    var client = this,
        missing = [];

    selectors = Array.prototype.slice.call(arguments, 0);

    async.each(selectors,
        function(selector, cb) {
            client.element.call(client.client, 'css selector', selector, function(result) {
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
                client.assertion(!missing.length, missing.join(', ') + ' missing from page.', 'all selectors found', 'Locating required selectors on page.', false);
            }
        });

    return this;
};
