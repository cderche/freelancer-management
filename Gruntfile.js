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
            src:    ['**/*.js', '**/*.css'],
            dest:   '.tmp/public/gentelella/build'
          },
          {
            expand: true,
            cwd:    'node_modules/gentelella/vendors',
            src:    ['**/*.js', '**/*.css', '**/*.png'],
            dest:   '.tmp/public/'
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
            dest:   '.tmp/public/js'
          },
          {
            expand: true,
            cwd:    'public',
            src:    ['*.pdf', '*.ico'],
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
