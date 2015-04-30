var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var _log = require('log'),
  log = new _log(config.get('log.level'));

// Routes
var routes = {};
routes.index = require('./routes/index');
routes.api=require('./routes/api');

var app = express();

// view engine setup
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes.index);
app.use('/api/',routes.api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use('/api',function(err,req,res,next){
    res.status(err.status || 500);
    res.json({
      error: {
        code: err.status,
        message: err.message,
        stack: err.stack
      }
    });
  });
  app.use('/demo',function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      code: err.status,
      stack: err.stack,
      title: err.status+' - '+err.message,
      banner: config.get('content.demo.banner'),
      home_title: config.get('site.demo')
    });
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      code:err.status,
      stack: err.stack,
      title: err.status+' - '+err.message,
      banner: config.get('content.front.banner'),
      home_title: config.get('site.front')
    });
  });
}
app.use('/api',function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status,
      message: err.message
    }
  });
});
app.use('/demo',function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    code: err.status,
    title: err.status+' - '+err.message,
    banner: config.get('content.demo.banner'),
    home_title: config.get('site.demo')
  });
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    code: err.status,
    title: err.status+' - '+err.message,
    banner: config.get('content.front.banner'),
    home_title: config.get('site.front')
  });
});


module.exports = app;
