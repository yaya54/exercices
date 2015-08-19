var mysql = require('mysql');
var dbconfig = require('./src/config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE journal' );


var parsejournal = function(writer_id, cat_id, title, callback){
	connection.query('SELECT * FROM writers WHERE id= ' + mysql.escape(writer_id), function(err, datawriter, fields){
	connection.query('SELECT * FROM categories WHERE id =' + mysql.escape(cat_id), function(err, datacat, fields){
		callback(null, datawriter[0], datacat[0], title);

		})
	})
}

connection.query('SELECT * FROM article', function(err, dataarticle, fields){

	for (var count in dataarticle){

		parsejournal(dataarticle[count].writer_id, dataarticle[count].cat_id, dataarticle[count].title, function(err, writer, cat, title){
			console.log("l'auteur " + writer.name+ " a écrit " + title + " de la categorie " + cat.name);
		})
	}
})