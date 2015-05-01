var express = require('express');
var router = express.Router();
var config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api/index', {
    title: config.get('site.front'),
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});
// POST /login
router.post('/login', require('./login'));

module.exports = router;