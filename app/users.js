const bcrypt = require('bcrypt');

const React = require('react');
const { renderToString } = require('react-dom/server');

const { StaticRouter, Switch, Route } = require('react-router-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers } =  require('redux');

require("babel-register");
require("babel-polyfill");
const routes = require('../client/routes.js').default;
const { AccountReducer } = require('../client/reducers/account');

const store = createStore(
	combineReducers({
		account: AccountReducer
	}),
);

const renderStatic = url => `<html>
	<head>
		<title>Hello World</title>
		<link href="//cdn.muicss.com/mui-0.9.39/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />
		<link href="./css/style.css" rel="stylesheet"></link>
	</head>
	<body>
		<div id="mountPoint">${
			renderToString(
				React.createElement(Provider, { store },
					React.createElement(StaticRouter, { location: url },
						React.createElement(Switch, null,
							routes.map(
								([path, component, exact], i) => React.createElement(Route, {
									key: path,
									path,
									component,
									exact: (exact === 'exact')
								})
							)
						)
					)
				)
			)
		}</div>
		<script type="text/javascript" src="./js/app.bundle.js"></script>
	</body>
</html>`;

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
					res.redirect('/join');
			})
			.catch(err => console.error('Oh noes! ', err) || res.status(500));
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
				.catch(err => console.error('Oh noes! ', err) || res.status(500));			
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
							db.createUser(username, hash, salt, 'free')
								.then(result => db.getUserByName(username))
								.then(user => user !== null ? res.status(201).json(user) : res.status(409))
								.catch(err => console.error('Oh noes! ', err) || res.status(500));
						else {
							console.error(err);
							res.status(500);
						}
					});
				} else {
					console.error(err);
					res.status(500);
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
								.then(result => res.status(200))
								.catch(err => console.error('Oh noes! ', err) || res.status(500));
						else {
							console.error(err);
							res.status(500);
						}
					});
				} else {
					console.error(err);
					res.status(500);
				}
			});
		}
	)

	app.post('/delete',
		auth.requiresLogin,
		(req, res) => {
			const { id } = req.user;
			
			db.deleteUser(id)
				.then(result => res.status(200))
				.catch(err => console.error('Oh noes! ', err) && res.status(500));
		}
	)
}