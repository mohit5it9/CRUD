'use strict';

var self = test;
module.exports = self;
var async = require('async');

function test(req, res) {
  // test wheteher API is functional or not
  async.series([
    // _postToken
  ],
    function (err) {
      if (err)
        return res.status(500).json(err);
      return res.status(200).json({
        status: 'OK'
      });
    }
  );
}

function _postToken(next) {
  var tc = db.collection('tokens');
  tc.insert({tokenId: 'apiToken123'},
    function (err, results) {
      if (err)
        return next(err);

      return next();
    }
  );
}