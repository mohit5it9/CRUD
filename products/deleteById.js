'use strict';

var self = deleteById;
module.exports = self;

var async = require('async');
var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
var productModel = require('./model.js');

function deleteById(req, res) {
  var bag = {
    req: req,
    res: res
  };

  if (!ObjectId.isValid(bag.req.params.id)) {
    return res.send('invalid ObjectId passed in the params');
  }

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
  productModel.findByIdAndRemove({_id: bag.req.params.id},
    function(err, results) {
      if (err)
        return next(err);
      bag.res = results;
      return next();
    }
  );
}
