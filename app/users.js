const bcrypt = require('bcrypt');

require("babel-register");
require("babel-polyfill");
const renderStatic = require('../client/renderStatic').default;

module.exports = (app, passport, db, auth) => {

	app.get('/',
		(req, res) => {
			res.status(200).send(renderStatic('/'));
		}
	);

	app.get('/login',
		(req, res) => {
			res.status(200).send(renderStatic('/login'))
		}
	);

	app.get('/join',
		(req, res) => {
			res.status(200).send(renderStatic('/join'))
		}
	)

	app.post('/login',
		passport.authenticate("local"),
		(req, res) => {
			const { user } = req;

			db.getUser().then(result => {
				if (result !== null)
					res.status(200).json(result);
				else // user not in db
					res.sendStatus(404);
			})
			.catch(err => console.error('Oh noes! ', err) || res.sendStatus(500));
		}
	);

	app.put('/logout',
		(req, res, next) => {
			req.session.destroy((err) => {
				if (err)
					return next(err);

				req.logout();
				res.sendStatus(200);
			})
		}
	);

	app.post('/username',
		(req, res) => {
			// check if username is available in db
			db.doesUserExist()
				.then(result => res.status(200).json({valid: !result}))
				.catch(err => console.error('Oh noes! ', err) || res.sendStatus(500));			
		}
	);

	app.post('/join',
		(req, res) => {
			const { username, password } = req.body;
			// generate salt and hash password
			bcrypt.genSalt(10, (err, salt) => {
				if (!err) {
					bcrypt.hash(password, salt, (err, hash) => {
						if (!err) 
							// create user in db
							db.createUser(username, hash, salt, 'user')
								.then(result => db.getUserByName(username))
								.then(user => user !== null ? res.status(201).json(user) : res.sendStatus(409))
								.catch(err => console.error('Oh noes! ', err) || res.sendStatus(500));
						else {
							console.error(err);
							res.sendStatus(500);
						}
					});
				} else {
					console.error(err);
					res.sendStatus(500);
				}
			});
		}
	);

	app.post('/password',
		auth.requiresLogin,
		(req, res) => {
			const { id } = req.user;
			const { password } = req.body;

			bcrypt.genSalt(10, (err, salt) => {
				if (!err) {
					bcrypt.hash(password, salt, (err, hash) => {
						if (!err)
							// update user password in db
							db.setUserPassword(id, hash, salt)
								.then(result => res.sendStatus(200))
								.catch(err => console.error('Oh noes! ', err) || res.sendStatus(500));
						else {
							console.error(err);
							res.sendStatus(500);
						}
					});
				} else {
					console.error(err);
					res.sendStatus(500);
				}
			});
		}
	)

	app.post('/delete',
		auth.requiresLogin,
		(req, res) => {
			const { id } = req.user;
			
			db.deleteUser(id)
				.then(result => res.sendStatus(200))
				.catch(err => console.error('Oh noes! ', err) && res.sendStatus(500));
		}
	)
}