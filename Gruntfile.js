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
    jade: {
      compile: {
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
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },
    },
  });
  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean','copy', 'jade', 'sass']);
  grunt.registerTask('filter', ['autoprefixer']);
  grunt.registerTask('serve', ['build', 'watch']);
};
