'use strict';

var self = getById;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var productModel = require('./model.js');
var ObjectId = require('mongoose').Types.ObjectId;

function getById(req, res) {
  var bag = {
    req: req,
    res: res
  };
  async.series([
    _getProductById.bind(null, bag)
  ],
    function (err) {
      if (err)
        return res.send(err);

      console.log('end');

      return res.send(bag.res || {});
    }
  );
}

function _getProductById(bag, next) {
  productModel.findOne({_id: bag.req.params.id},
    function(err, results) {
      if (err)
        return next(err);
      bag.res = results;
      return next();
    }
  );
}
