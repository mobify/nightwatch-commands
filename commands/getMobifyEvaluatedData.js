exports.command = function(callback) {
    var client = this;

    // Uses waitForCondition to retrieve the Mobify.evaluatedData
    // from the client browser
    //
    return client.waitForCondition(function() {
        var framework = Mobify || Adaptive;
        return framework ? framework.evaluatedData : null;
    }, 8000, function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });
};
