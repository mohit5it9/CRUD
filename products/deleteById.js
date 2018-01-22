'use strict';

var self = deleteById;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongodb').ObjectId;

function deleteById(req, res) {
  var bag = {
    req: req,
    res: res
  };
  async.series([
    _deleteProductById.bind(null, bag)
  ],
    function (err) {
      if (err)
        return res.send(err);

      return res.send(bag.res);
    }
  );
}

function _deleteProductById(bag, next) {
  var collection = db.collection('documents');
  collection.deleteOne({_id: ObjectId(bag.req.params.id)},
    function(err, results) {
      if (err)
        return next(err);
      bag.res = results;
      return next();
    }
  );
}
