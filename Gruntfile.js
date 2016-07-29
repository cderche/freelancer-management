module.exports = function(grunt) {
  console.log("Running Gruntfile");

  // Project configuration.

  var path  = require('path')
  var dest  = path.join(__dirname, '.tmp/public/stylesheets/style.css').toString();
  var src   = path.join(__dirname, 'public/stylesheets/style.scss').toString();

  console.log(`dest: ${dest}, src: ${src}`);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd:    'public/stylesheets',
          src:    ['*.scss'],
          dest:   '.tmp/public/stylesheets',
          ext:    '.min.css'
        }]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd:    'node_modules/gentelella/build',
            src:    ['**/*'],
            dest:   '.tmp/public/gentelella/build',
            // ext:    '.min.js'
          },
          {
            expand: true,
            cwd:    'node_modules/gentelella/vendors',
            src:    ['**/*'],
            dest:   '.tmp/public/',
            // ext:    '.min.js'
          },
          {
            expand: true,
            cwd: 'node_modules/gentelella/vendors/font-awesome/fonts/',
            src: ['*'],
            dest: '.tmp/public/fonts/', filter: 'isFile'
          },
          {
            expand: true,
            cwd:    'public/javascripts',
            src:    ['*.js'],
            dest:   '.tmp/public/js',
          },
          {
            expand: true,
            cwd:    'public',
            src:    ['*.pdf'],
            dest:   '.tmp/public'
          },
          {
            expand: true,
            cwd:    'public/images',
            src:    ['**/*'],
            dest:   '.tmp/public/images'
          },
        ]
      }
    }
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'public/javascripts/bootstrap.js',
    //     dest: '.tmp/public/js/factorial.min.js'
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', [
    'sass',
    'copy'
  ]);
  // grunt.registerTask('default')
};
