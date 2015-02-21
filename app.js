var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var wallet = require('./config/wallet');
var solidityBridge = require('./services/solidityBridge');

var appRoutes = require('./routes/app');
var adminRoutes = require('./routes/admin');
var staticRoutes = require('./routes/static');
var api = require('./routes/api');

// setup db
mongoose.connect(config.db);
var db = mongoose.connection;

db.on('open', function () {
    wallet.setup().then(function (wallet){
        console.log('exchnage wallet address: ' + wallet.address);
    })
});

db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});


var app = express();

// view engine setup
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'public', 'js'),
]);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'shared')));

// remove trailing slash
app.use( function(req, res, next) {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

app.use('/', appRoutes);
app.use('/admin', adminRoutes);
app.use('/static', staticRoutes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// setup solidity bridge
solidityBridge.setup();

module.exports = app;

