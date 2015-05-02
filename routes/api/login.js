var u = require('utility');

module.exports = function(req, res, next) {
  var data = {
    user: req.body.username,
    pass: req.body.password,
    sid: req.body.iccid
  };
  r.d.table('user').field('id').where({
    name: data.user,
    pass: u.md5(u.md5(data.user) + u.md5(data.pass) + r.c('server.salt'))
  }).select(function(err, _res) {
    if (err) {
      next(new r.e('Database error.', 10001, 500));
    } else if (_res.length === 0) {
      next(new r.e('Username and password mismatch.', 20201, 200));
    } else {
      // set uid and token
      data.uid = _res[0].id;
      data.token = u.md5(u.md5(data.uid.toString()) + u.timestamp() + r.c('server.salt'));
      r.d.table('token').field('token').where({
        token: data.token
      }).select(function(err, __res) {
        if (err) {
          next(new r.e('Database error.', 10001, 500));
        } else if (__res.length === 0) {
          r.d.table('token').insert({
            uid: data.uid,
            token: data.token,
            iccid: data.sid
          }, function(err, __res) {
            if (err) {
              next(err);
            } else {
              res.json(r.aok(data.token));
            }
          });
        } else {
          res.json(r.aok(data.token));
        }
      });
    }
  });
};
