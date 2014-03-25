var nightwatch = require('../node_modules/nightwatch');

module.exports = {
  init : function(callback) {
    return nightwatch.client({
      // desiredCapabilities: {
      //   browserName: 'chrome'
      // },
      custom_commands_path: '../commands',
      custom_assertions_path: '../assertions',
      selenium_port : 10195,
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
