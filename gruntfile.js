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
        src: ['bower_components/jquery/dist/jquery.js'],
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

    // JS Hint
    jshint: {
      files: ['gruntfile.js', 'src/js/*'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true
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
            src: ['fonts/*', '*.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    // Watch
    watch: {
      js : {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'browserify', 'uglify']
      },
      css: {
        files: ['src/scss/**/*.scss', 'src/scss/*.scss'],
        tasks: ['sass']
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
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  // Tasks
  grunt.registerTask('watch', 'watch');
  grunt.registerTask('css', ['sass', 'autoprefixer']);
  grunt.registerTask('js', ['jshint', 'browserify', 'concat', 'uglify']);
  grunt.registerTask('default', ['clean:dist', 'css', 'js', 'copy']);

};
