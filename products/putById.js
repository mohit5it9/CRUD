'use strict';

var self = putById;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongodb').ObjectId;

function putById(req, res) {
  var bag = {
    req: req,
    res: res
  };
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
  if (_.has(bag.req.body, 'expiryDate'))
    update.expiryDate = bag.req.body.expiryDate;
  var collection = db.collection('documents');
  collection.updateOne({_id: ObjectId(bag.req.params.id)}, {$set: update}, {upsert: false},
    function(err, results) {
      if (err)
        return next(err);
      bag.res = results;
      return next();
    }
  );
}
