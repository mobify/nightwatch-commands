exports.command = function(expectedTemplate, callback) {
    var self = this;

    // Uses the browser.execute to run code within the client browser,
    // access the Mobify object and test the template.
    this.execute(
        // gets the mobify evaluatedDate object
        function() {
            return Mobify.evaluatedData.evaluatedData.bodyType;
        },
        [],
        function(result) {
            var template = result.value;
            self
              .assert.equal(template, expectedTemplate,
                'template is ' + expectedTemplate);
        }
    );

    return this;
};
