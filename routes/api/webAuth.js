var u = require('utility');
var loginFunction = require('../../functions/login');

module.exports = function(req, res, next) {
  // initialize data object
  var data = {};
  data.user = req.body.username;
  data.pass = req.body.password;
  // check params
  if (!data.user) {
    next(new r.e('Parameter \'username\' cannot be null.', 20202, 500));
    return;
  }
  if (!data.pass) {
    next(new r.e('Parameter \'password\' cannot be null.', 20202, 500));
    return;
  }
  if (!data.iccid) {
    data.iccid = '';
  }
  // call to login
  loginFunction(data.user,
    data.pass,
    data.iccid,
    function(err, token) {
      if (err) {
        r.l.debug('login error');
        res.render('api/webAuth',{
          title: r.c('site.front'),
          banner: r.c('content.front.banner'),
          home_title: r.c('site.front'),
          error: err.message
        });
        return;
      } else {
        r.l.debug('login ok');
        r.l.debug(req.body.callback);
        res.render('api/webAuth', {
          title: r.c('site.front'),
          banner: r.c('content.front.banner'),
          home_title: r.c('site.front'),
          success: true,
          callback: req.body.callback + token
        });
      }
    });
};
