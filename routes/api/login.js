var u = require('utility');
var loginFunction = require('../../functions/login');

module.exports = function(req, res, next) {
  // initialize data object
  var data = {};
  data.user = req.body.username;
  data.pass = req.body.password;
  data.iccid = req.body.iccid;
  // check params
  if (!data.user) {
    next(new r.e('Parameter \'username\' cannot be null.', 20202, 200));
    return;
  }
  if (!data.pass) {
    next(new r.e('Parameter \'password\' cannot be null.', 20202, 200));
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
        next(err);
        return;
      } else {
        res.json(r.aok(token));
      }
    });
};