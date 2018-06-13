const bcrypt = require('bcrypt');

module.exports = (app, passport, db, auth) => {

	app.get('/admin/login',
		(req, res) => {
			res.status(200).send('<html><head><title>Login</title></head><body><div class="container"><form class="login-form" name="login" action="/admin/login" method="POST" ><div><div><img class="logo" src="/images/logo.png" alt="Logo" /></div><div><div class="relative"><input placeholder="username" name="username" required /></div><div class="relative"><input placeholder="password" type="password" name="password" required /></div></div></div><button type="submit">Log in</button></form></div></body></html >');
		}
	);
	
	app.post('/admin/login',
		passport.authenticate('local', { failureRedirect: '/admin/login' }),
		(req, res) => {
			if (req.user.type === 'admin')
				res.redirect('/editor');
			else
				res.status();
		}
	);
}
