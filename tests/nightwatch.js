var nightwatch = require('../node_modules/nightwatch');

module.exports = {
    init: function(options, callback) {
        var opts = {
            seleniumPort: 10195,
            silent: true,
            output: false,
            globals: {
                myGlobal: 'test'
            },
            desiredCapabilities: {
                browserName: 'chrome'
            },
            /* eslint-disable camelcase */
            custom_commands_path: '../commands',
            custom_assertions_path: '../assertions'
            /* eslint-enable camelcase */
        };

        if (options) {
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) {
                    opts[prop] = options[prop];
                }
            }
        }

        return nightwatch.client(opts).on('selenium:session_create', function() {
            if (callback) {
                callback();
            }
        }).once('error', function() {
            if (callback) {
                callback();
            }
            process.exit();
        }).start();
    }
};
