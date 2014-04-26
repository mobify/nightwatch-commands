module.exports = function(grunt) {
    var targets = [
        'Gruntfile.js',
        'assertions/**/*.js',
        'commands/**/*.js',
        'tests/**/*.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: targets
        },
        jscs: {
            options: {
                config: '.jscsrc',
                excludeFiles: [
                    'tests/nightwatch.js',
                    'tests/run_tests.js',
                    'tests/node_modules/**'
                ]
            },
            src: targets
        }
    });

    grunt.registerTask('test', function () {
        var callback = this.async();

        grunt.util.spawn({
                cmd: 'node',
                args: ['./tests/run_tests.js'],
                opts: {stdio: 'inherit'}
            },
            function() {
                callback();
            });
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');

    grunt.registerTask('default', ['jshint:files', 'jscs:src']);

};
