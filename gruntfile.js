/*jslint node: true */
'use strict';

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clear out old dist folder
    clean: {
      dist : ['dist']
    },

    // Get SASSy
    sass: {
      dist: {
        options: {
          // style: 'compressed',
          loadPath: require('node-neat').includePaths
        },
        files: {
          'dist/css/steeze.css' : 'src/scss/steeze.scss'
        }
      }
    },

    // Autoprefixer
    autoprefixer: {
        dist: {
            files: {
                'dist/css/steeze.css': 'dist/css/steeze.css'
            }
        }
    },

    // Combine JS in head and libs
    concat: {
      options: {
        separator: ';\n'
      },
      head: {
        src: ['bower_components/modernizr/modernizr.js'],
        dest: 'dist/js/head.js'
      },
      libs: {
        src: ['bower_components/phaser/build/phaser.js', 'src/js/box2d-plugin-full.js'],
        dest: 'dist/js/libs.js'
      }
    },

    // Assemble main JS file
    browserify: {
      main: {
        files : {
          'dist/js/main.js': ['src/js/main.js']
        }
      }
    },

    // Minify JS
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/head-min.js': ['dist/js/head.js'],
          'dist/js/libs-min.js': ['dist/js/libs.js'],
          'dist/js/main-min.js': ['dist/js/main.js']
        }
      }
    },

    // Copy
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['fonts/*', '*.html', 'images/*'],
            dest: 'dist/'
          }
        ]
      }
    },

    // Watch
    watch: {
      js : {
        files: ['<%= jshint.files %>'],
        tasks: ['concat', 'browserify', 'uglify']
      },
      css: {
        files: ['src/scss/**/*.scss', 'src/scss/*.scss'],
        tasks: ['css']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy']
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  // Tasks
  grunt.registerTask('css', ['sass', 'autoprefixer']);
  grunt.registerTask('js', ['browserify', 'concat', 'uglify']);
  grunt.registerTask('default', ['clean:dist', 'css', 'js', 'copy']);

};
