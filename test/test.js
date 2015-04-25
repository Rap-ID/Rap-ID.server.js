var should = require('should');
var config = require('config');

describe('server', function() {
  describe('start', function() {
    before(function() {
      var www = require('../bin/www');
      www();
    });
  });
});
