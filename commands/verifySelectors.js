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
            if (err) {
                client.info('An error occurred while verifying selectors');
            } else {
                client.assert(!missing.length, 'The following selectors are missing: ' + missing.join(', '));
            }

        });

    return this;
};
