var express 		=		require('express');
var session 		=		require('express-session');
var cookieParser 	=		require('cookie-parser');
var bodyParser 		=		require('body-parser');
var morgan 			=		require('morgan');
var passport 		=		require('passport');
var flash 			=		require('connect-flash');
var io 				=		require('socket.io');
var app 			= 		express();
var port 			= 		process.env.PORT || 1227;


require('./src/config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use("/", express.static(__dirname + "/public"));

app.use(session({
	secret: 'rwqerwesdafgxcsdafwSDAVGFDSREWWQRTGFDASwqADASDqdasdfsdfasagdf',
	resave: true,
	saveUninitialized: true
 } )); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());


require('./src/modulesRoutes.js')(app, passport);

var http = app.listen(port);


var io = io.listen(http);

//require('./app/realtime.js')(io); 

console.log('The magic happens on port ' + port);
