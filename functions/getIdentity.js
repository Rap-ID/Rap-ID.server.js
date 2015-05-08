module.exports = function(iccid, callback) {
  r.d.table('identity').where({
    iccid: iccid
  }).select(function(err, res) {
    if (err) {
      r.l.error(err);
      callback(new r.e('Database error.', 10001, 500));
    } else if (res.length === 0) {
      callback(null, {});
    } else {
      callback(null, JSON.parse(res[0].data));
    }
  });
};