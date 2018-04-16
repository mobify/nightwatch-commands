exports.command = function(selector, callback) {
    var client = this;
    /*
    / Use Javascript's click when Selenium's does not register.
    */
    client.execute('document.querySelector("' + selector + '").click();', function(result) {
        if (typeof callback === 'function') {
            callback.call(client, result);
        }
    });

    return this;
};
