// Uses the browser.execute to run code within the client browser,
// access the Mobify object and test the template.

exports.command = function(expectedTemplate, callback) {
    var self = this;

    this.execute(
        function() {
            // gets the mobifiy evaluatedDate object
            var evaluatedData = Mobify.evaluatedData;

            return evaluatedData.bodyType;
        },
        [],
        function(result) {
            var template = result.value;
            self
              .assert.equal(template, expectedTemplate, 'template is ' + expectedTemplate);
        }
    );

    return this; // allows the command to be chained.
};
