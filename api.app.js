'use strict'

process.title = 'crud.api';
module.exports = init;

var glob = require('glob');
var async = require('async');
var _ = require('underscore');
var express = require('express');
var app = express();
var validateAccount = require('./auth/validateAccount.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';

MongoClient.connect(mongoUrl,
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo server");

    var db = client.db(dbName);
    global.db = db;
  }
);

if (require.main === module) {
  init();
}

function init() {
  app.use(require('body-parser').json({limit: '10mb'}));
  app.use(require('body-parser').urlencoded({limit: '10mb', extended: true}));
  app.listen(50000,
    function (err) {
      if (err)
        console.log('API booting failed with error: ', err);
      else {
        console.log('API successfully booted');
      }
    }
  );
  // app.get('/', require('./index.js'));
  app.get('/products', require('./products/get.js'));
  app.post('/products', require('./products/post.js'));
}
