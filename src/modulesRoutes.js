
module.exports = function(app, passport) {


	require("./modules/login/routes.js")(app, passport);
	require("./modules/calandar/routes.js")(app);
	app.use(function(req, res){
		res.render('error-404');
	});
};
