var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

UsersSockets = [[]];

Object.defineProperty(Array.prototype, "remove_socket", {
    enumerable: false,
    value: function (itemToRemove) {
        var filteredArray = this.filter(function(item){
            return item !== itemToRemove;
        });

        return filteredArray;
    }
});



function auth(socket, callback) {
			console.log("AUTHH");
	socket.on('auth', function(data){

		connection.query("SELECT * FROM users WHERE username=" + mysql.escape(data.username) + " AND iotoken=" + mysql.escape(data.ioToken), function(err, rows, fields){
			if (!err) {
					var x;
					((typeof UsersSockets[rows[0].id] == "undefined")) ? x = -1 : x = 1;
					console.log(x);
					if (x == -1) {
						UsersSockets[rows[0].id] = [];
						UsersSockets[rows[0].id][0] = socket;						
					} else {
						var i = UsersSockets[rows[0].id].indexOf(socket);
						if (i == -1) {
							UsersSockets[rows[0].id].push(socket);
						}
					}
					callback(null, rows[0]);
			} else {
				console.log("User trying to connect with wrong username and token");
				callback(err, null);
			}
		});
	});
}

module.exports = function(io) {

	var me;


	io.sockets.on('connection', function(socket){
		console.log("New socket connection enable");
		/*
		**	Auth system by token
		*/
		auth(socket, function(err, data){
			if (!err) {
				me = data;
				console.log(me.username + " is connected and have + open page");
			} else {
				console.log(err);
			}
			console.log(UsersSockets[me.id].length);
		});

		socket.on('disconnect', function(){
				if (typeof me == "object") {
					var i = UsersSockets[me.id].indexOf(socket);
					console.log(i);
					UsersSockets[me.id] = UsersSockets[me.id].remove_socket(socket);
					delete UsersSockets[me.id][i];
					console.log(UsersSockets[me.id][i]);
					console.log(UsersSockets[me.id].length);
				}
				//console.log(UsersSockets[me.id].length);
				//delete UsersSockets[me.id];
				delete me;
    			console.log('user disconnected');
  		});
	});
}
