exports.command = function(selector, callback) {
    var client = this;

    // Selenium's click doesn't always register
    // We should expand this to bind and trigger more events
    //
    client.execute(function(selector) {
        (function simulateClick() {
            var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            var el = document.querySelector(selector); 
            el.dispatchEvent(event);
        })();
        return true;
    }, [selector], function(result){
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;
};

