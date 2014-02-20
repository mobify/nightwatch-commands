exports.command = function(milliseconds, callback) {
    if (milliseconds && typeof milliseconds != 'number') {
      throw new Error('waitForPageToBeMobified expects first parameter to be number; ' +
        typeof (milliseconds) + ' given')
    }

    var client = this;
    var messages = {
      success: 'Page was Mobified after milliseconds.',
      failure: 'Timed out'
    }

    // Uses waitForCondition to run code within the client browser
    //
    return client.waitForCondition('return Mobify.evaluatedData;', milliseconds, 2000, function(result){
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    // var msg = 'Page was Mobified after ' + (now - self.startTimer) + ' milliseconds.';
    // var msg = 'Timed out while waiting for page to be Mobified after ' + self.ms + ' milliseconds.';
};
