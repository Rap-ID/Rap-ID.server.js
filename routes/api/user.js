var u = require('utility');
var getUserFunction = require('../../functions/getUser');
var getIdentityFunction = require('../../functions/getIdentity');

module.exports = function(req, res, next) {
  // initialize data object
  var data = {};
  data.token = req.query.token;
  // check params
  if (!data.token) {
    next(new r.e('Parameter \'token\' cannot be null.', 20202, 200));
    return;
  }
  // get user data
  getUserFunction(data.token, function(err, _res) {
    if (err) {
      next(err);
    } else {
      data.res = r.aok({
        uid: _res.id,
        username: _res.name
      });
      getIdentityFunction(_res.iccid, function(err, __res) {
        if (err) {
          next(err);
        } else {
          data.res.data.identity = __res;
          res.json(data.res);
        }
      });
    }
  });
};