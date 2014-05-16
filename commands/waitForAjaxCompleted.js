exports.command = function(callback) {
    var client = this;

    // Uses waitForCondition to run code within the client browser
    //
    return client.waitForCondition('return $.active;', 8000, function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

};
