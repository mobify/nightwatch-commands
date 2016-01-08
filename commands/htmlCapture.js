
var fs = require('fs');
var mkdirp = require('mkdirp');

var mkdirpSync = function(path) {
    try {
        mkdirp.sync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
};

// Decode any HTML entities in the source.
// http://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it?lq=1
var decodeHtml = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

exports.command = function(fileName, callback) {
    if (fileName && typeof fileName !== 'string') {
        throw new Error('htmlCapture expects first parameter to be string; ' + typeof (fileName) + ' given');
    }

    var htmlCheck = /^\w+\.html$/;

    if (!htmlCheck.test(fileName)){
        throw new Error('htmlCapture expects first parameter to be camelCased alphanumeric string ending with ".html"');
    }

    var client = this;
    var filePath = "tests/fixtures/";
    var fileLocation = filePath + fileName;
    var messages = {
            success: 'Wrote HTML fixture to ' + fileLocation + ' after ',
            failure: 'Failed to write HTML fixture after '
        };

    client.source(function (result){
        // Source will be stored in result.value. IE:
        // console.log(result.value);
        client.execute(decodeHtml, [result.value], function(decodedHtml) {
            // If it doesn't exist, create a path to "tests/fixtures/".
            mkdirpSync(filePath);

            // Now save decoded HTML to the specified path in order to update the fixture.
            fs.writeFile(fileLocation, decodedHtml.value, function(error) {
                 if (error) {
                   console.error("write error:  " + error.message);
                 } else {
                   console.log("Successful Write to " + fileLocation);
                 }
            });
        });
    });
};
