module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd:    'public/stylesheets',
          src:    ['**/*.scss', '**/*.sass'],
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
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'sass',
    'copy'
  ]);
};
