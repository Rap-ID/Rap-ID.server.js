var u = require('utility');

module.exports = function(req, res, next) {
  var data = {
    user: req.body.username,
    pass: req.body.password,
    sid: req.body.iccid
  };
  r.d.table('user').field('id').where({
    name: data.user,
    //75bbef40efd36144fe9c3ed226785cd4
    pass: u.md5(u.md5(data.user) + u.md5(data.pass) + r.c('server.salt'))
  }).select(function(err, _res) {
    if (err) {
      next(err);
    }
    if (_res.length == 0) {
      next(new Error('Username and password mismatch.'));
    } else {
      // set uid and token
      data.uid = _res[0].id;
      data.token = u.md5(u.md5(data.uid.toString()) + u.timestamp() + r.c('server.salt'));
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
    }
  });
};