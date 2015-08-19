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
connection.query('USE bibliotech' );
var tab ={};
app.set('view engine', 'ejs');
app.use("/", express.static(__dirname + "/public"));

var parseDataHistory =function(user_id, livre_id, count, callback){

connection.query('SELECT * FROM users WHERE id=' +mysql.escape(user_id), function(err, datauser, fields)
{
	connection.query('SELECT * FROM livres WHERE id=' +mysql.escape(livre_id), function(err, datalivre, fields){

		callback(null, datauser[0], datalivre[0], count);

	})
})

}
var parseHistory = function(){

connection.query('SELECT * FROM historique',function(err, datahistory, fields){
 
for (var count in datahistory){

	console.log(datahistory[count].user_id);
	console.log(datahistory[count].livre_id);
	parseDataHistory(datahistory[count].user_id, datahistory[count].livre_id, count, function(err, user, livre, x){
		tab[x]= "l'utilisateur " + user.name+ " a loué " + livre.titre;
	});
}
})
}
app.post("/biblio", function(req, res, next){
 
	parseHistory();
		res.end(JSON.stringify(tab));
})

app.get("/", function(req, res, next){

	res.render("modules/table.ejs")
})

app.listen(port);
console.log('The magic happens on port ' + port);