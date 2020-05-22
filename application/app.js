var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var mysqlStore = require("express-mysql-session")(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts')
var app = express();

app.use((req, res, next) => {
    console.info('\x1b[42m\x1b[30m Request URL : ' + req.url + '\x1b[0m');
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new mysqlStore({/* using default options */}, require('./config/database'));

var sessionOptions = {
    key: "csid",
    secret: "this is a secret for csc317",
    store: sessionStore,
    cookie: {secure: false, httpOnly: false, maxAge:900000},
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionOptions));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

app.use((err, req, res, next) => {
    res.status(500);
    console.log(err);
    res.sendFile('error.html', {root: "public/html" });
})

module.exports = app;
