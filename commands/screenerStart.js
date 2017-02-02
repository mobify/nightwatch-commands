exports.command = function(screenerTestName, callback) {
    var browser = this;
    var args = [screenerTestName];

    browser.execute('/*@screener.init*/', args, function(result) {
        if (typeof callback === 'function') {
            callback.call(browser, result);
        }
    });

    return this;
};
