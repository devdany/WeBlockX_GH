var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const complainModel = require('./db/model/complain');
const feedbackModel = require('./db/model/feedback');
const userModel = require('./db/model/user');



feedbackModel.sync({force: false});
complainModel.sync({force: false});
userModel.sync({force: false});

complainModel.hasOne(feedbackModel, {foreignKey: 'complain_no'})
feedbackModel.belongsTo(complainModel, {foreignKey: 'complain_no'})

userModel.hasMany(complainModel, {foreignKey:'user_no'})
complainModel.belongsTo(userModel, {foreignKey:'user_no'})




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
