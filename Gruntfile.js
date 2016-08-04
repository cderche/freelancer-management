cssFiles = [
  'bootstrap/dist/css/bootstrap.min.css',
  'font-awesome/css/font-awesome.min.css',
  'animate.css/animate.min.css',
  'iCheck/skins/**/*.css',
  'select2/dist/css/select2.min.css',
]

jsFiles = [
  'jquery/dist/jquery.min.js',
  'bootstrap/dist/js/bootstrap.min.js',
  'fastclick/lib/fastclick.js',
  'nprogress/nprogress.js',
  'validator/validator.min.js',
  'jQuery-Smart-Wizard/js/jquery.smartWizard.js',
  'iCheck/icheck.min.js',
  'jquery.inputmask/dist/jquery.inputmask.bundle.js'
]

otherFiles = [
  'iCheck/skins/**/*.png',
  'font-awesome/fonts/*',
  'bootstrap/dist/fonts/*'
]

publicFiles = [
  '**/*.js',
  '**/*.css',
  '**/*.pdf',
  '**/*.ico',
  '**/*.png',
  '**/*.jpg',
  // 'fonts/*'
]

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
            src:    ['js/custom.js', 'css/custom.min.css'],
            dest:   '.tmp/public/gentelella/build'
          },
          {
            expand: true,
            cwd:    'node_modules/gentelella/vendors',
            src:    [cssFiles, jsFiles, otherFiles],
            dest:   '.tmp/public'
          },
          {
            expand: true,
            cwd:    'public',
            src:    publicFiles,
            dest:   '.tmp/public'
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
