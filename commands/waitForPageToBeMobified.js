exports.command = function(timeout, callback) {
    var client = this;
    var start = new Date().getTime();
    var timeout = timeout || 10000;

    if (arguments.length === 1 && arguments[0] === 'function') {
        callback = arguments[0];
    }

    // Attempts to get Mobify.evaluatedData. If null, it attempts again
    // until the timeout is reached.
    function returnEvaluatedData(result) {
        var now = new Date().getTime();

        if (result.status === 0 && result.value){
            var msg = 'Page was Mobified after ' +
                (now - start) + ' milliseconds.';

            // Returns the timing message
            client.assertion(true, !!result.value, false, msg, true);

            // Let the DOM settle down after Mobify has done its stuff.
            client.pause(2000, function(){
                if (typeof callback === 'function') {
                    callback.call(client, result.value);
                }
            });
        } else if (now - start < timeout) {
            setTimeout(function(){
                console.log('Waiting for client Mobify object.')
                getEvaluatedData();
            }, 500)
        } else {
            var msg = "Timed out while waiting for page to be Mobified after "
                + timeout + " milliseconds.";
        }
    }

    function getEvaluatedData(){
        return client.execute(
            // gets the Mobify evaluatedData object
            function() { return Mobify.evaluatedData; },
            [],
            returnEvaluatedData
        );
    }

    return getEvaluatedData();
};
