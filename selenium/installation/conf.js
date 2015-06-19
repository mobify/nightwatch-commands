var path = require('path');

// see http://selenium-release.storage.googleapis.com/index.html for latest
var seleniumVersion = '2.45.0';

// see http://chromedriver.storage.googleapis.com/index.html
var chromeDriverVersion = '2.12';

module.exports = {
  selenium: {
    path: path.join(__dirname, '..', 'selenium-server.jar'),
    version: seleniumVersion
  },
  chromeDriver: {
    path: path.join(__dirname, '..', 'drivers', 'chromedriver'),
    version: chromeDriverVersion
  }
};
