// global object
global.r = {};
// get config
r.c = function(name) {
  var config = require('config');
  return config.get(name);
};
var _log = require('log');
// log
r.l = new _log(r.c('log.level'));
r.l.info('Logging level ' + r.c('log.level'));
// mysql
var mysql = require('aa-mysql');
mysql.config({
  host: r.c('database.host'),
  port: r.c('database.port'),
  user: r.c('database.user'),
  pass: r.c('database.pass'),
  db: r.c('database.db')
});
// dump mysql
r.l.info('Connecting database on ' +
  r.c('database.host') + ':' +
  r.c('database.port'));
r.d = mysql.createPool();
// ok result for api
r.aok = function(data) {
    return {
      data: data,
      error: {
        id: 0,
        msg: "ok"
      }
    };
  }
  // error object
r.e = function(msg, id, status, stack) {
    this.message = msg;
    this.id = id;
    this.status = status;
    this.stack = stack;
  }
  // dump env
r.l.info('Server env: ' + r.c('server.env'));

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// express app
var app = express();

// view engine setup
var hbs = require('hbs');
// register partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
// use handlebars
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
// use middleware for /public
app.use(express.static(path.join(__dirname, '/public')));
// use middleware for /demo
app.use('/demo', express.static(path.join(__dirname, '/demo')));

// routes
var mainRoutes = require('./routes/main');
var apiRoutes = require('./routes/api');
// use routes
app.use('/', mainRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (r.c('server.env') === 'debug') {
  app.use('/api', function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: {
        id: err.id || err.status,
        msg: err.message,
        stack: err.stack
      }
    });
  });
  app.use('/demo', function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      code: err.status,
      stack: err.stack,
      title: err.status + ' - ' + err.message,
      banner: r.c('content.demo.banner'),
      home_title: r.c('site.demo')
    });
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      code: err.status,
      stack: err.stack,
      title: err.status + ' - ' + err.message,
      banner: r.c('content.front.banner'),
      home_title: r.c('site.front')
    });
  });
}
app.use('/api', function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      id: err.id || err.status,
      msg: err.message
    }
  });
});
app.use('/demo', function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    code: err.status,
    title: err.status + ' - ' + err.message,
    banner: r.c('content.demo.banner'),
    home_title: r.c('site.demo')
  });
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    code: err.status,
    title: err.status + ' - ' + err.message,
    banner: r.c('content.front.banner'),
    home_title: r.c('site.front')
  });
});

module.exports = app;
