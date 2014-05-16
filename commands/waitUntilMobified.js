exports.command = function(milliseconds, callback) {
    if (milliseconds && typeof milliseconds !== 'number') {
        throw new Error('waitUntilMobified expects first parameter to be number; ' + typeof (milliseconds) + ' given');
    }

    var client = this;
    var messages = {
        success: 'Page was Mobified after ',
        failure: 'Timed out after '
    };

    /** Uses waitForCondition to check for either the Mobify or
     *  Adaptive object in the client browser
     */
    client.waitForCondition(function() {
        var framework = Mobify || Adaptive;
        return !!framework;
    }, milliseconds, 2000, messages, function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;

};
