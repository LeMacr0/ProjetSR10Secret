var createError = require('http-errors');
var express = require('express'); ////
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sessions = require ('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var candidateRoute = require('./routes/candidate');
var administratorRoute = require('./routes/administrator');
var recruiterRoute = require('./routes/recruiter');
var authRoute = require('./routes/auth');
var session=require('./model/session');

var app = express(); ////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Gestion des sessions
app.use(sessions({
  secret : "xxxzzzyyyaaabbbcc",
  resave : false,
  saveUninitialized : false,
  //autres options comme cookie, durée de vie , etc.
}));

/*app.all("*", function (req, res, next) {
	const nonSecurePaths = ["/auth/login", "/auth/signup"];
	const adminPaths = []; //list des urls admin
	if (nonSecurePaths.includes(req.path)) return next();
	
	//authenticate user
	if (adminPaths.includes(req.path)) {
		if (session.isConnected(req.session, "admin")) return next();
		else
		res
			.status(403)
			.render("error", { message: " Unauthorized access", error: {} });
	} else {
		if (session.isConnected(req.session)) return next();
		// not authenticated
		else res.redirect("/");
	}
});*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoute);

// definition des routes
app.use('/candidate',candidateRoute);
app.use('/administrator',administratorRoute);
app.use('/recruiter',recruiterRoute);

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
