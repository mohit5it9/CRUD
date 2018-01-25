'use strict'

process.title = 'crud.api';
module.exports = init;

var async = require('async');
var _ = require('underscore');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var validateAccount = require('./auth/validateAccount.js');


const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';

if (require.main === module) {
  init();
}

function init() {
  app.use(require('body-parser').json({limit: '10mb'}));
  app.use(require('body-parser').urlencoded({limit: '10mb', extended: true}));
  app.use(require('compression')());
  app.use(require('cookie-parser')());
  app.use(require('method-override')());

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(express.static(path.join(__dirname, './static')));
  async.parallel([
    _createExpressApp,
    _connectToDB
  ],
    function (err) {
      if (err) {
        console.log('could not initialize app');
      }
      else {
        global.mongoose = mongoose;
        app.get('/',
          function (req, res) {
            res.cookie('admiralUrl', req.protocol + '://' + req.get('host'));

            var opts = {};
            res.render(path.resolve('static/app.html'), opts,
              function (err, html) {
                if (err) {
                  res.status(500).send('Internal Error. See logs');
                }
                res.send(html);
              }
            );
          }
        );
        app.get('/products', require('./products/get.js'));
        app.get('/products/:id', require('./products/getById.js'));
        app.post('/products', require('./products/post.js'));
        app.put('/products/:id', require('./products/putById.js'));
        app.delete('/products/:id', require('./products/deleteById.js'));
      }
    }
  );
}

function _createExpressApp(next) {
  app.listen(5000,
    function (err) {
      if (err) {
        console.log('API booting failed with error: ', err);
        return next(err);
      }
      else {
        console.log('API successfully  booted');
        return next();
      }
    }
  );
}

function _connectToDB(next) {
  mongoose.connect(mongoUrl + '/' + 'myproject');
  var connection = mongoose.connection;
  connection.on('error',
    function (err) {
      console.log('Error in connecting the DB. Error is: ', err);
      return next(err);
    }
  );
  connection.once('open',
    function () {
      console.log('connected to mongo db');
      return next();
    }
  );
}

