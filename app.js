var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser= require("body-parser");
var logger = require('morgan');
//To manipulate Mongodb
var mongo= require('Mongoose');
mongo.connect('mongodb://localhost/yelp_cam');

var Blogs= require("./Models/Blogs"),
    Comments= require("./Models/Comments");

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/Blogs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//To use html form data
app.use(express.static('views/image-storage/'));
app.use(indexRouter);
app.use(blogRouter);

app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler



module.exports = app;


app.listen(3000, function () {
    console.log("Server has started");
});

