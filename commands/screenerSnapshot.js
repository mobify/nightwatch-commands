exports.command = function(screenerTestName, screenerOptions, callback) {
    var browser = this;
    var args = [screenerTestName];

    if (typeof screenerOptions === 'object') {
    	args.push(screenerOptions);
    } else if (typeof screenerOptions === 'function') {
    	callback = screenerOptions;
    } else {
    	throw new Error('Screener options should be an object.');
    }

    browser.execute('/*@screener.snapshot*/', args, function(result) {
        if (typeof callback === 'function') {
            callback.call(browser, result);
        }
    });

    return this;
};
