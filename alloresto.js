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
connection.query('USE alloresto' );
var tab={};

var parsecommande = function(user_id, produits_id, count, callback){

	connection.query("SELECT * FROM users WHERE id=" + mysql.escape(user_id), function(err, datauser, fields){
		connection.query('SELECT * FROM produits WHERE id=' + mysql.escape(produits_id), function(err, dataproduit, fields){
		
		callback(null, datauser[0], dataproduit[0], count);
	})
	})
}

var parsecom = function(){

connection.query('SELECT * FROM commandes', function(err, datacommande, fields){
	for (var count in datacommande){
		parsecommande(datacommande[count].user_id, datacommande[count].produit_id, count, function(err, user, produit, x){

			tab[x]="l'utilisateur " + user.name + " a commandé " +produit.name;
		})
	}

})
}

app.get("/", function(req, res, next){
	parsecom();
		res.end(JSON.stringify(tab));
})

app.listen(port);
console.log('The magic happens on port ' + port);