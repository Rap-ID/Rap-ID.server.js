var u = require('utility');

module.exports = function(req, res, next) {
  var data = {
    user: req.body.username,
    pass: req.body.password
  };
  r.d.table('user').insert({
    name: data.user,
    pass: u.md5(u.md5(data.user) + u.md5(data.pass) + r.c('server.salt'))
  }, function(err, _res) {
    if (err) {
      next(new r.e('Database error.', 10001, 500));
    } else {
      res.json(r.aok(0));
    }
  });
};
