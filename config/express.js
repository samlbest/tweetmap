module.exports.express = {

  customMiddleware: function (app) {
    console.log(__dirname);
    var express = require('../node_modules/sails/node_modules/express');
    app.use('/angular',express.static(__dirname+"/../angular"));
  }
}
