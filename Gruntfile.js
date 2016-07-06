module.exports = function(grunt) {
    var targets = [
        '*.js',
        '**/*.js',
        '!node_modules/**',
        '!tests/node_modules/**',
        '!selenium/**'
    ];

    grunt.loadNpmTasks('grunt-eslint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            dev: {
                src: targets,
                options: {
                    reset: true,
                    config: require.resolve('mobify-code-style/javascript/.eslintrc')
                }
            },
            prod: {
                src: targets,
                options: {
                    reset: true,
                    config: require.resolve('mobify-code-style/javascript/.eslintrc-prod')
                }
            }
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

    grunt.registerTask('lint', ['eslint:prod']);
};
