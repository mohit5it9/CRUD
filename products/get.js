'use strict';

var self = get;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
var productModel = require('./model.js');

function get(req, res) {
  var bag = {
    req: req,
    res: res
  };

  async.series([
    _getProducts.bind(null, bag)
  ],
    function (err) {
      if (err)
        return res.send(err);

      return res.send(bag.res);
    }
  );
}

function _getProducts(bag, next) {
  productModel.find({},
    function(err, results) {
    if (err)
      return next(err);
    bag.res = results;
    return next();
  });
}