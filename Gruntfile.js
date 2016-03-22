/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // minifying the .js code and save it with a .min extension
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.min.js'
        }]
      }
    },

    // minify all contents of css styles and add a .min.css extension
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    // minifying HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: "src",
          src: '**/*.html',
          dest: 'dist/',
          ext: ".html"
        }]
      }
    },

  jshint: {
      options: {
      // curly: true,
      // eqeqeq: true,
      // eqnull: true,
      // browser: true,
      globals: {
        jQuery: true
      },
    },

    all: ['Gruntfile.js', '**/*.js']
  },

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('jshint', ['jshint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['uglify', 'cssmin', "htmlmin"]);

};