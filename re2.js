var mysql = require('mysql');
var dbconfig = require('./src/config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var deleteByName =function(name)
{
connection.query('DELETE FROM test1 WHERE name=' + mysql.escape(name));
}

var affiche =function()
{
connection.query("SELECT * FROM test1",function(err, rows, fields){
	console.log(rows);
})

}



var deleteByAge = function(age)
{
connection.query('DELETE FROM test1 WHERE age=' +mysql.escape(age));
}

var insert = function(name, age)
{
	connection.query('INSERT INTO test1 (name, age) VALUES ('+mysql.escape(name)+ ',' +mysql.escape(age)+ ')');
}

deleteByAge(22);
affiche();