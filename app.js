var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejs_mate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

var dbURL = 'mongodb://localhost/myapp';
mongoose.connect(dbURL,function(err){
	if(err) {
			console.log(err);
		}
		else{
			console.log("Connected to the Database");
		}

});
app.use(express.static(__dirname+'/public')); 

//Middleware
app.use(morgan('dev')); //Logs all action to terminal
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended : true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "@colonus"
}));
app.use(flash());



var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000,function(err){
	if(err) throw err;
	console.log("Server is running");
});