'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          'static/**/**/*.js',
          '!static/app.cat.js',
          '!static/app.min.js'
        ],
        tasks: ['buildLocal'],
        options: {
          spawn: true
        }
      }
    },
    concat: {
      app: {
        src: [
          'static/app.js',
          'static/scripts/**/*.js',
          'static/scripts/**/**/*.js'
        ],
        dest: 'static/app.cat.js'
      },
      css: {
        src: [
          // bootstrap
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
        ],
        dest: 'static/app.cat.css'
      },
      lib: {
        src: [
          // jQuery
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/jquery.cookie/jquery.cookie.js',
          // Bootstrap and angular
          'node_modules/angular/angular.min.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
          'node_modules/angular-ui-router/release/angular-ui-router.min.js'
        ],
        dest: 'static/lib.cat.js'
      }
    },
    uglify: {
      app: {
        files: {
          'static/app.min.js': ['static/app.cat.js']
        }
      },
      lib: {
        files: {
          'static/lib.min.js': ['static/lib.cat.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('cats', ['concat:css']);
  grunt.registerTask('libcat', ['concat:lib']);
  grunt.registerTask('libbit', ['uglify:lib']);
  grunt.registerTask('build',
    ['cats', 'concat:app', 'concat:lib', 'uglify:app', 'uglify:lib']);
  grunt.registerTask('buildLocal', ['concat:app']);
};
