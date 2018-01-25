'use strict';

var self = putById;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
var productModel = require('./model.js');

function putById(req, res) {
  var bag = {
    req: req,
    res: res
  };

  if (!ObjectId.isValid(bag.req.params.id)) {
    return res.send('invalid ObjectId passed in the params');
  }

  async.series([
    _putProductById.bind(null, bag)
  ],
    function (err) {
      if (err)
        return res.send(err);

      return res.send(bag.res);
    }
  );
}

function _putProductById(bag, next) {
  var update = {};
  if (_.has(bag.req.body, 'name'))
    update.name = bag.req.body.name;
  if (_.has(bag.req.body, 'quantity'))
    update.quantity = bag.req.body.quantity;
  if (_.has(bag.req.body, 'code'))
    update.code = bag.req.body.code;
  if (_.has(bag.req.body, 'expiry'))
    update.expiry = bag.req.body.expiry;
  productModel.findOneAndUpdate(
    {_id: bag.req.params.id}, {$set: update},
    function(err, results) {
      if (err)
        return next(err);
      bag.res = results;
      return next();
    }
  );
}
