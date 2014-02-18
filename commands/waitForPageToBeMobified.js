exports.command = function(callback) {
    var client = this;
    var start = new Date().getTime();

    // Uses the browser.execute to run code within the client browser,
    // access the Mobify object and test the template.
    return client.execute_async(
        // gets the Mobify evaluatedDate object
        function() { return Mobify.evaluatedData; },
        [],
        function(result) {
            var evaluatedData = result.value;
            var now = new Date().getTime();
            var msg = 'Page was Mobified after ' +
                (now - start) + ' milliseconds.';

            // Let the DOM settle down after Mobify has done its stuff.
            client.pause(2000);

            if (typeof callback === 'function') {
                callback.call(client, result);
            }
        }
    );

};
