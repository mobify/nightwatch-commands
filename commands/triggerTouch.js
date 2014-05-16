exports.command = function(selector, type, callback) {
    var client = this;

    // Selenium's click doesn't always register
    // We should expand this to bind and trigger more events
    //
    client.execute(function(sel, t) {
        var event = new MouseEvent(t || 'click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var el = document.querySelector(sel);
        el.dispatchEvent(event);
        return true;
    }, [selector, type], function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;
};
