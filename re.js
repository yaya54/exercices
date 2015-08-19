var mysql = require('mysql');


var query = "INSERT INTO test1 (name, age) VALUES (" + mysql.escape("test") + ")";
console.log(query); 