
module.exports = function(app) {

	app.get('/calandar', function(req, res, next){

		if (req.isAuthenticated()) {
			res.render('modules/calandar');

		} else {

				res.redirect('/');

		}
	}) 

}