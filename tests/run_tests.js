try {
    var args = process.argv, reporterType = 'default';
    var reporters = require('nodeunit').reporters;

    if (args.length === 3) {
        reporterType = args[2];

        if (!(reporterType in reporters)) {
            console.error('Invalid reporterType specified', reporterType);
            process.exit();
        }
    }

    var reporter = reporters[reporterType];
    var options  = require('./nodeunit.json');
} catch (e) {
    console.log(e);
    console.log('Cannot find nodeunit module.');
    process.exit();
}

process.chdir(__dirname);

try {
    var server = require('mockserver').init();
    server.on('listening', function() {
        reporter.run(['src'], options, function(err) {
            setTimeout(function() {
                server.close();
            }, 100);

            if (err) {
                process.exit(1);
            }
        });
    });
    //reporter.run(['src/commands'], options);
} catch (err) {
    console.log(err);
    process.exit();
}
