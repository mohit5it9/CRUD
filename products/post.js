'use strict';

var self = post;
module.exports = self;

var async = require('async');
var _ = require('underscore');

function post(req, res) {
  var bag = {
    req: req,
    res: res
  };
	async.series([
		_postProduct.bind(null, bag)
	],
		function (err) {
			if (err) {
				return res.send(err);
			} else {
				return res.status(200).json(bag.res);
			}
		}
	);
}

function _postProduct(bag, next) {
	var collection = db.collection('documents');
	collection.insert(bag.req.body,
		function (err, results) {
			if (err)
				return next(err);
      bag.res = results;
			return next();
		}
	);
}
