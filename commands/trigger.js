exports.command = function(selector, type, callback) {
    var client = this;

    var lastArgument = Array.prototype.slice.call(arguments, 0).pop();
    if (typeof (lastArgument) === 'function') {
        callback = lastArgument;
    }

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
            callback.call(client, result.value);
        }
    });

    return this;
};
