var express = require('express')
var path = require('path');

module.exports = function(app) {
  console.log('Configuring public.');
  app.use(express.static(path.join(__dirname, '../public')));
  // app.use(express.static('../public'));
}
