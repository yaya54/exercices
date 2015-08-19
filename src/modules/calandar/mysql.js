var mysql = require('mysql');

var dbconfig = require('../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var test = function(name, start, end, callback){

	callback("coucou");

}

test(1, 1, 1, function(string){

	console.log(string);
})