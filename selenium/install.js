var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var selenium = require('selenium-download');

// Download Selenium server and Chromedriver
selenium.ensure(__dirname, function(error) {
    if (error) {
        console.error(error.stack);
    } else {
        // Rename so that we don't need to update paths in project configs
        var oldSeleniumPath = path.join(__dirname, 'selenium.jar');
        var newSeleniumPath = path.join(__dirname, 'selenium-server.jar');
        
        fs.rename(oldSeleniumPath, newSeleniumPath, function(error) {
            if (error) console.log(error);
            return;
        });

        mkdirp(path.join(__dirname, 'drivers'));
        var oldChromedriverPath = path.join(__dirname, 'chromedriver');
        var newChromedriverPath = path.join(__dirname, 'drivers', 'chromedriver');

        fs.rename(oldChromedriverPath, newChromedriverPath, function(error) {
            if (error) console.log(error);
            return;
        });
    }
});
