exports.command = function(template, callback) {
    var self = this;
    var start = new Date().getTime();

    // Checks the jQuery.active property to see if an ajax request is
    // completed.
    return this.execute_async(
        function() {
            return $.active
        },
        [],
        function(result) {
            var evaluatedData = result.value;
            var now = new Date().getTime();
            var msg = 'AJAX call completed after ' +
                (now - self.startTimer) + ' milliseconds.';

            // Assert that the evaluatedData object is present
            self.assert.notEqual(result.value, 0, msg);

            if (typeof callback === 'function') {
                callback.call(self, result);
            }
        }
    );

};
