exports.command = function(template, callback) {
    var self = this;
    var start = new Date().getTime();

    // Uses the browser.execute to run code within the client browser,
    // access the Mobify object and test the template.
    this.execute_async(
        // gets the Mobify evaluatedDate object
        function() {
            var evaluatedData = Mobify.evaluatedData;
            if (evaluatedData){
                return evaluatedData;
            }
        },
        [],
        function(result) {
            var evaluatedData = result.value;
            var now = new Date().getTime();
            var msg = 'Page was Mobified after ' +
                (now - start) + ' milliseconds.';

            // Let the DOM settle down after Mobify has done its stuff.
            self.pause(2000);

            // Assert that the evaluatedData object is present
            self.assert.notEqual(evaluatedData, undefined, msg)
        }
    );

    return this;
};
