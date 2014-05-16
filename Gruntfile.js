module.exports = function(grunt) {
    var targets = [
        'Gruntfile.js',
        'assertions/**/*.js',
        'commands/**/*.js',
        'tests/src/*.js',
        '!tests/nightwatch.js',
        '!tests/run_tests.js',
        '!tests/node_modules/**'
    ];

    var excludes = [

    ];

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: grunt.option('file') || targets,
                options: {
                    force: true,
                    ignores: excludes,
                    jshintrc: 'node_modules/mobify-code-style/javascript/.jshintrc'
                }
            }
        },
        jscs: {
            options: {
                config: 'node_modules/mobify-code-style/javascript/.jscsrc',
                excludeFiles: excludes
            },
            src: targets
        }
    });

    grunt.registerTask('test', function() {
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

    grunt.registerTask('lint', ['jshint:all', 'jscs:src']);
};
