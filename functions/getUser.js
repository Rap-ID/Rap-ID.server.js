module.exports = function(token, callback) {
  r.d.table('token').field('uid', 'iccid').where({
    token: token
  }).select(function(err, res) {
    if (err) {
      r.l.error(err);
      callback(new r.e('Database error.', 10001, 500));
    } else if (res.length === 0) {
      callback(new r.e('Invaid token.', 20201, 200));
    } else {
      var uid = res[0].uid;
      var iccid = res[0].iccid;
      r.d.table('user').where({
        id: uid
      }).select(function(err, res) {
        if (err) {
          r.l.error(err);
          callback(new r.e('Database error.', 10001, 500));
        } else if (res.length === 0) {
          callback(new r.e('Invaid token.', 20201, 200));
        } else {
          var result = res[0];
          result.iccid = iccid;
          callback(null, result);
        }
      });
    }
  });
};