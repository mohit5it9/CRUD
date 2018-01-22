'use strict';

var self = validateAccount;
module.exports = self;

var async = require('async');
var _ = require('underscore');

function validateAccount(req, res, next) {
  console.log('Validating apiToken for user');

  var bag = {
    req: req,
    res: res
  };
  async.series([
    _validateToken.bind(null, bag)
  ],
    function (err) {
      if (err)
        return res.status(err.statusCode).json(err);

      return next();
    }
  );
}

function _validateToken(bag, next) {
  console.log('Inside ' + _validateToken.name);
  if (bag.req.headers && bag.req.headers.authorization) {
    console.log('Token found in the request headers. Value is ',
      bag.req.headers.authorization);
  } else {
    console.log('No token found in the request header. Unauthorized User');
    var err = {
      statusCode: 403,
      errorMessage: 'Unauthorized',
      errorDescription: 'Authenticate your requests with a valid API token.'
    };
    return next(err);
  }

  var tokensCollection = db.collection('tokens');
  tokensCollection.findOne({tokenId: bag.req.headers.authorization},
    function (err, results) {
      if (err)
        return next(err);

      if (!_.isEmpty(results)) {
        console.log('Authentic request');
        return next();
      } else {
        console.log('Unauthorized User. Invalid apiToken');
        var err = {
          statusCode: 403,
          errorMessage: 'Unauthorized',
          errorDescription: 'Authenticate your requests with a valid API token.'
        };
        return next(err);
      }
    }
  );
}