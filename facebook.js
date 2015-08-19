var mysql = require('mysql');
var dbconfig = require('./src/config/database');
var connection = mysql.createConnection(dbconfig.connection);
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var multer  = require('multer');
var io = require('socket.io');
var app      = express();
var port     = process.env.PORT || 1337;
connection.query('USE facebook' );
var tab={};


var parseFriend = function(user_id, friend_id, count, callback){

	connection.query('SELECT * FROM users WHERE id=' + mysql.escape(user_id), function(err, datauser, fields){
		console.log(err);
		connection.query('SELECT * FROM users WHERE id=' + mysql.escape(friend_id), function(err, datafriend, fields){
			console.log(err);
			callback(null, datauser[0], datafriend[0], count);
		})

	})
}

var parseami = function(){

connection.query('SELECT * FROM friends ', function(err, datafriends, fields){

	for ( var count in datafriends){
		parseFriend(datafriends[count].user_id, datafriends[count].friend_id, count, function(err, user, friend, x){

			tab[x]="l'utilisateur " +user.name+ " est ami avec " +friend.name;
		})

	}
})
}

app.get("/", function(req, res, next){
	parseami();
		res.end(JSON.stringify(tab));
})

app.listen(port);
console.log('The magic happens on port ' + port);