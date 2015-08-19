var mysql = require('mysql');
var dbconfig = require('./src/config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var insertTest =function(name, age, callback)
{
 
 connection.query('INSERT INTO test1 (name, age) VALUES ('+ mysql.escape(name) +','+ mysql.escape(age) +' )', function(err, rows, fields){

 		console.log(rows);
 		callback(rows.insertId);
 	});

}
 



 var updateTest =function(id, name, callback)
 {
connection.query('UPDATE test1 SET name=' + mysql.escape(name) +' WHERE id=' + mysql.escape(id));
 }

 insertTest("toto", 21, function(id){
 	updateTest(id, "jean");
 });


 var updateAge =function(id, age, callback)
 {
 	connection.query('UPDATE test1 SET age=' + mysql.escape(age) +' WHERE id=' + mysql.escape(id));
 }

 updateAge(4, 44);

 var affiche =function()
 {
  connection.query("SELECT * FROM test1", function(err, rows, fields){
  	console.log(rows);
  })
 }

 affiche();

 var supprime =function(id)
 {
 	connection.query("DELETE FROM test1 WHERE id=" + mysql.escape(id));
 }
 supprime(2);
 affiche();