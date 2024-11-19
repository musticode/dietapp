const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
require('dotenv/config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const foodItemRouter = require('./routes/foodItemRouter');
const ocppService = require('./routes/ocppService');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const databaseName = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const pwd = process.env.DATABASE_PASSWORD;


const testUri = 'mongodb://';

// mongoose.connect(`mongodb://${databaseName}:${username}:${pwd}`,
//     (e) => {
//       console.log(e )
//     }
// ).then(r =>{
//   console.log("test")
// });

mongoose.connect('mongodb://localhost:27017/test_db',
    (e) => {
      console.log(e )
    }
).then(r =>{
  console.log("test")
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foodItems', foodItemRouter);
app.use('/socket', ocppService)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
