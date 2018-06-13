const winston = require('winston')
const auth = require('./middlewares/authorization')
const monitoring = require('../app/monitoring')

module.exports = (app, passport, db) => {

	// add user routes
	require('../app/users')(app, passport, db, auth);

	// add admin routes
	require('../app/admin')(app, passport, db, auth);

	app.get('/health', monitoring.health(db));

	app.use(function (err, req, res, next) {
		if (err.message && (~err.message.indexOf('not found')))
			return next();

		winston.error(err.stack);

		return res.status(500).json({error: 'Error on backend occurred.'});
	})

	app.use(function (req, res) {
		// if no route matched, redirect to home
		res.redirect('/');
	})
}

