
var fs = require('fs');
var mkdirp = require('mkdirp');
// possibly require library to check for proper naming format ('.html', etc)

var mkdirpSync = function(path) {
    try {
        mkdirp.sync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

exports.command = function(filename, callback) {
	if (filename && typeof filename !== 'string') {
        throw new Error('htmlCapture expects first parameter to be string; ' + typeof (fileName) + ' given');
    }

	var client = this;
	var filePath = "tests/fixtures/";
	var messages = {
	        success: 'Wrote HTML fixture to ' + filePath + fileName + ' after ',
	        failure: 'Failed to write HTML fixture after '
	    };

	client.source(function (result){
        // Source will be stored in result.value. IE:
        // console.log(result.value);

        // If it doesn't exist, create a path to "tests/fixtures/".
        mkdirpSync(filePath);

        // Now save result.value to "../../fixtures/contact.html" in order to update the fixture.
        fs.writeFile(filePath + fileName, result.value, function(error) {
             if (error) {
               console.error("write error:  " + error.message);
             } else {
               console.log("Successful Write to " + filePath);
             }
        });
    })