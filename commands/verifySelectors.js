var async = require('async');

exports.command = function(selectors) {
    var client = this,
        missing = [];

    // selectors = Array.prototype.slice.call(arguments, 0);

    async.forEach(selectors, function(s){
        client.verify.elementPresent(s, s + ' is present');
    })

    return this;
};
