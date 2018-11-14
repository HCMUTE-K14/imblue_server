const Express = require('express');
const BodyParse = require('body-parser');

const Config = require('./config');
//const Routes = require('../routes/main.route');

const app = Express();

app.use(BodyParse.json());
app.use(BodyParse.urlencoded({ extended: false }));

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


//app.use('/', Routes);

app.set('port', (Config.port || 3000));

module.exports = app;