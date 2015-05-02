var u = require('utility');

module.exports = function(username, password, callback) {
  var data = {
    user: username,
    pass: password
  };
  r.d.table('user').insert({
    name: data.user,
    pass: u.md5(u.md5(data.user) + u.md5(data.pass) + r.c('server.salt'))
  }, function(err, _res) {
    if (err) {
      callback(new r.e('Database error.', 10001, 500));
    } else {
      callback(null);
    }
  });
};
