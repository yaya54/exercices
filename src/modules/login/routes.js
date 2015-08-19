var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {
		

	app.get('/', function(req, res, next) {
			if (req.isAuthenticated()) {
				res.redirect('/calandar');		
			} else {
				res.render('login.ejs');
			}
		});



	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', 
            failureRedirect : '/login', 
            failureFlash : true 
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
    });

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};
