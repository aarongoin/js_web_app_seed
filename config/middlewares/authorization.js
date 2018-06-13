module.exports = {
	requiresLogin: (req, res, next) => {
		if (req.user)
			return next();

		res.redirect('/');
	},

	requiresAdmin: (req, res, next) => {
		if (req.user && req.user.type === 'admin')
			return next();

		res.sendStatus(401);
	}
}
