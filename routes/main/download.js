var u = require('utility');

module.exports = function(req, res, next) {
  r.d.table('releases').order('version', 'DESC').limit(10)
    .select(function(err, _res) {
      if (err) {
        next(err);
      } else {
        // prepare data
        var data = {};
        data.releases = _res;
        for (var i = 0; i < data.releases.length; i++) {
          data.releases[i].time = u.timestamp(data.releases[i].time);
          var decode = JSON.parse(data.releases[i].data);
          data.releases[i].note = decode.note;
          data.releases[i].packs = decode.packs;
          data.releases[i].color = decode.color;
        }
        // render result
        data.title = r.c('site.front');
        data.banner = r.c('content.front.banner');
        data.home_title = r.c('site.front');
        res.render('main/download', data);
      }
    });
};