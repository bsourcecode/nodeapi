var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Body parser

var jsonParser = bodyParser.json();

app.use((err, req, res, next) => {
  if (err) {
    res.json({statusCode:400, message: 'Invalid json format'});
  } else {
    next()
  }
})

app.use('/api', jsonParser, apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.json({statusCode:404, message: 'Invalid API request' })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;