const pg = require('pg');
const config = require('../config');
const winston = require('winston');

const dbConfig = Object.assign({}, config.db);

const pool = new pg.Pool(dbConfig);
pool.on('error', function (err) {
	winston.error('idle client error', err.message, err.stack)
});

module.exports = {
	pool,
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	},

	doesUserExist: name => (
		pool.query('SELECT username FROM users WHERE username=$1', [name])
			.then(res => res.rows.length ? true : false)
	),
	getUser: id => (
		pool.query('SELECT id, username, type FROM users WHERE id=$1', [id])
			.then(res => res.rows.length ? res.rows[0] : null)
	),
	getUserByName: name => (
		pool.query('SELECT id, username, type FROM users WHERE username=$1', [name])
			.then(res => res.rows.length ? res.rows[0] : null)
	),
	createUser: (email, password, salt, type) => (
		pool.query('INSERT INTO users(username, password, salt, type) VALUES($1, $2, $3, $4)', [email, password, salt, type])
	),
	setUserPassword: (id, password, salt) =>  (
		pool.query('UPDATE users SET password=$2, salt=$3 WHERE id=$1', [id, password, salt])
	),
	deleteUser: id => (
		pool.query('DELETE FROM users WHERE id=$1', [id])
	)
}
