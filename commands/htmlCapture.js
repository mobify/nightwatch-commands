
var fs = require('fs');
var mkdirp = require('mkdirp');

var mkdirpSync = function(path) {
    try {
        mkdirp.sync(path);
    } catch (e) {
        if ( e.code !== 'EEXIST' ) throw e;
    }
};

exports.command = function(fileName, callback) {
    if (fileName && typeof fileName !== 'string') {
        throw new Error('htmlCapture expects first parameter to be string; ' + typeof (fileName) + ' given');
    }

    var htmlCheck = /^\w+\.html$/;

    if (!htmlCheck.test(fileName)) {
        throw new Error('htmlCapture expects first parameter to be camelCased alphanumeric string ending with ".html"');
    }

    var client = this;
    var filePath = 'tests/fixtures/';
    var fileLocation = filePath + fileName;
    var messages = {
        success: 'Wrote HTML fixture to ' + fileLocation + ' after ',
        failure: 'Failed to write HTML fixture after '
    };

    client.source(function(result) {
        // Source will be stored in result.value. IE:
        // console.log(result.value);

        // If it doesn't exist, create a path to "tests/fixtures/".
        mkdirpSync(filePath);

        // Now save result.value to "../../fixtures/contact.html" in order to update the fixture.
        fs.writeFile(fileLocation, result.value, function(error) {
            if (error) {
                console.error('Write error: ' + error.message);
            } else {
                console.log('Successful write to ' + fileLocation);
            }
        });
    });
};
