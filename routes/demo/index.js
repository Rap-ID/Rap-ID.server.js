var express = require('express');
var router = express.Router();
var config = require('config');

// GET /
router.get('/', function(req, res, next) {
  res.render('demo/index', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    uri: 'rapid://authorize/?callback=' + encodeURIComponent(config.get('server.base') + 'demo/callback?token=') +
      '&app=916FA0569B0135402A84FF2506C3CEC553241D568A0796F9F08A603AFB6BCB036FDC4A61DE218540CFAD0A7A7D52AC1345EDAFDCC02CC5330311DC40CDB6B3F3E36540ED759398F89F8A913E469805C497FB6DEE0E7B95A4'
  });
});
// GET /callback
router.get('/callback', function(req, res, next) {
  res.render('demo/callback', {
    title: config.get('site.demo'),
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo'),
    token: req.query.token,
    demo_callback: true,
    api: config.get('server.api')
  });
});

module.exports = router;
