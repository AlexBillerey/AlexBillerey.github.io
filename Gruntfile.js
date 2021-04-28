module.exports = function (grunt) {

    // 1. All configuration goes here
    //noinspection JSDuplicatedDeclaration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            //files: ['development/css/main.css', 'development/**/*.html', 'development/js/**/*.js', 'development/img/**/*.*'],
            //tasks: ['concat', 'purifycss', 'postcss', 'processhtml', 'imagemin']
            css: {
                files: ['development/**/*.html', 'development/css/*.css'],
                tasks: ['concat', 'purifycss', 'postcss'],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['development/**/*.html', 'development/css/*.css'],
                tasks: ['processhtml'],
                options: {
                    spawn: false,
                },
            },
            images: {
                files: ['development/img/*.gif', "development/img/*.png", "development/img/*.jpg"],
                tasks: ['newer:imagemin'],
                options: {
                    spawn: false,
                },
            }
        },
        /*copy: {
         main: {
         expand: true,
         cwd: 'prod',
         prod: ["development/img/!*.*"],
         dest: 'production/'
         }
         },*/
        concat: {
            css: {
                src: ['development/css/normalize.css', 'development/css/main.css'],
                dest: 'development/css/production.css'
            }
        },
        purifycss: {
            options: {},
            target: {
                src: ['development/**/*.html', 'development/js/*.js'/*, '!development/js/vendor/!*.js'*/],
                //css: ['development/css/normalize.css','development/css/main.css'],
                css: ['development/css/production.css'],
                dest: 'development/css/production_pure.css'
            }
        },

        /*

                postcss: {
                    options: {
                        map: {
                            inline: false // save all sourcemaps as separate files...
                            //annotation: 'dist/css/maps/' // ...to the specified directory
                        }
                    },


                    options: {
                        processors: [

                            require('autoprefixer')({
                                browsers: ['>0.1%', 'ie 8-11']
                            }),
                            require('postcss-merge-rules')(),
                        ]
                    },
                    dist: {
                        src: 'development/css/production_pure.css',
                        dest: 'development/css/production_pure_pf.css'
                    }

                },

        */

        postcss: {
            options: {
                map: false, // inline sourcemaps

                // or
                /*map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'development/css/maps/' // ...to the specified directory
                },*/
                processors: [
                    //require('postcss-import')(),
                    require('pixrem')(), // add fallbacks for rem units
                    require('postcss-merge-rules')(),
                    require('autoprefixer')({
                        grid: true
                    }), // add vendor prefixes
                    require('cssnano')({
                        "preset": [
                            "default",
                            {"discardComments": {
                                "removeAll": true
                            }
                            }
                        ]
                    }) // minify the result
                ]
            },
            dist: {
                src: 'development/css/production_pure.css',
                dest: 'production/css/styles22.css'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'production/css/styles.min.css': ['development/css/production_pure_pf.css']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'production/index.html': ['development/index.html']
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'development/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'production/img/'
                }]
            }
        },

        browserSync: {
            bsFiles: {
                src: ['development/**/*.css', 'development/**/*.html', 'development/**/*.js']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: ["production"]
                },
                //browser: ["chrome", "firefox", "iexplore", "microsoft-edge" /*"ms edge"*/]
                browser: ["chrome", "firefox"/*, "opera","microsoft-edge:http://localhost:3000"*/]
            }
        },


        unused: {
            options: {
                reference: 'img/',
                directory: ['css/**/*.css', 'js/**/*.js', '**/*.html'],
                days: false, //30,
                remove: false, // set to true to delete unused files from project
                reportOutput:['/development/unused_images_report.txt'], // set to false to disable file output
                fail: false // set to true to make the task fail when unused files are found
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('@lodder/grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-purifycss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-unused');
    /* See http://blog.ponyfoo.com/2013/11/13/grunt-tips-and-tricks */

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['concat','purifycss', 'postcss']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};

