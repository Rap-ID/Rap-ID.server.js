module.exports = function(req, res, next) {
  var regFunction = require('../../functions/reg');
  // initialize data object
  var data = {};
  data.user = req.body.username;
  data.pass = req.body.password;
  data.pass2 = req.body['password-check'];
  // check params
  if (!data.user) {
    res.render('main/reg', {
      title: r.c('site.front'),
      banner: r.c('content.front.banner'),
      home_title: r.c('site.front'),
      error: 'Parameter \'username\' cannot be null.'
    });
    return;
  }
  if (!data.pass) {
    res.render('main/reg', {
      title: r.c('site.front'),
      banner: r.c('content.front.banner'),
      home_title: r.c('site.front'),
      error: 'Parameter \'password\' cannot be null.'
    });
    return;
  }
  if (data.pass !== data.pass2) {
    res.render('main/reg', {
      title: r.c('site.front'),
      banner: r.c('content.front.banner'),
      home_title: r.c('site.front'),
      error: 'Parameter \'password\' mismatches \'password-check\'.'
    });
    return;
  }
  // call to reg
  regFunction(data.user,
    data.pass,
    function(err) {
      if (err) {
        r.l.debug('reg error')
        res.render('main/reg', {
          title: r.c('site.front'),
          banner: r.c('content.front.banner'),
          home_title: r.c('site.front'),
          error: err.message
        });
        return;
      } else {
        r.l.debug('reg ok')
        res.render('main/reg', {
          title: r.c('site.front'),
          banner: r.c('content.front.banner'),
          home_title: r.c('site.front'),
          success: true
        });
      }
    });
};