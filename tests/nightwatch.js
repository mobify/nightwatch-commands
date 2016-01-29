var nightwatch = require('../node_modules/nightwatch');

module.exports = {
    init : function(callback) {
        return nightwatch.client({
            // desiredCapabilities: {
            //   browserName: 'chrome'
            // },
            /* eslint-disable camelcase */
            custom_commands_path: '../commands',
            custom_assertions_path: '../assertions',
            selenium_port : 10195,
            /* eslint-enable camelcase */
            silent : true,
            output : false
        }).start().once('error', function() {
            if (callback) {
                callback();
            }
            process.exit();
        });
    }
};
