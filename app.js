var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var accesos_modulo = require('./routes/accesos/modulo');
var accesos_item = require('./routes/accesos/item');
var accesos_sistema = require('./routes/accesos/sistema');
var accesos_subtitulo = require('./routes/accesos/subtitulo');
var accesos_usuario = require('./routes/accesos/usuario');
var accesos_views = require('./routes/accesos/views');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// ACCESOS
app.use('/accesos/item', accesos_item);
app.use('/accesos/modulo', accesos_modulo);
app.use('/accesos/sistema', accesos_sistema);
app.use('/accesos/subtitulo', accesos_subtitulo);
app.use('/accesos/usuario', accesos_usuario);
app.use('/accesos', accesos_views);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),
    function(){
        console.log("Express server listening on port " + app.get('port'));
    }
);

module.exports = app;
