exports.command = function(callback) {
    var client = this;

    // Uses the browser.execute to run code within the client browser,
    // access the Mobify object and test the template.
    return client.execute(
        // gets the mobify evaluatedDate object
        function() { return Mobify.evaluatedData; },
        [],
        function(result) {
            if (typeof callback === 'function') {
                callback.call(client, result.value);
            }
        }
    );

};
