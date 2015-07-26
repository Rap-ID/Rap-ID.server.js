var u = require('utility');
var regFunction = require('../../functions/reg');

module.exports = function(req, res, next) {
  // initialize data object
  var data = {};
  data.user = req.body.username;
  data.pass = req.body.password;
  // check params
  if (!data.user) {
    next(new r.e('Parameter \'username\' cannot be null.', 20202, 200));
    return;
  }
  if (!data.pass) {
    next(new r.e('Parameter \'password\' cannot be null.', 20202, 200));
    return;
  }
  // call to reg
  regFunction(data.user,
    data.pass,
    function(err) {
      if (err) {
        next(err);
        return;
      } else {
        res.json(r.aok(0));
      }
    });
};