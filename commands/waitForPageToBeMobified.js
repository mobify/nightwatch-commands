exports.command = function(milliseconds, callback) {
    if (milliseconds && typeof milliseconds != 'number') {
      throw new Error('waitForPageToBeMobified expects first parameter to be number; ' +
        typeof (milliseconds) + ' given')
    }

    var client = this;
    var messages = {
      success: 'Page was Mobified after ',
      failure: 'Timed out after '
    }

    // Uses waitForCondition to run code within the client browser
    //
    client.waitForCondition('return Mobify.evaluatedData;', milliseconds, 2000, messages, function(result){
        if (typeof callback === 'function') {
                callback.call(client, result);
        }
    });

    return this;

};
