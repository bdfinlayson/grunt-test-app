'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['public'],
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
    },
    dist: {
      files: {
        'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade', '!**/*.{sass,scss}'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    connect: {
      options: {
        port: 8888,
        open: true,
        useAvailablePort: true,
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function (connect) {
          return [
            connect.static('public'),
            connect().use('/scripts', connect.static('./app/scripts')),
            connect().use('/bower_components', connect.static('./bower_components'))
            ];
          }
        }
      },
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      other: {
        files: ['app/**', '!app/**/*.jade', '!app/**/*.{sass,scss}'],
        tasks: ['copy']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['app/**/*.{sass,scss}'],
        tasks: ['sass', 'autoprefixer']
      }
    },
    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    }
  });
  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean','copy', 'jade', 'sass', 'wiredep']);
  grunt.registerTask('filter', ['autoprefixer']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
};
