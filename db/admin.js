const pg = require('pg');
const bcrypt = require('bcrypt');
const client = new pg.Client({
    user: '',
    password: '',
    database: 'app_db',
    host: 'localhost',
    port: 5432
});
const password = process.argv[2] || '';

function onQueryForAdmin(admin, salt, hash) {
    if (admin) {
        // admin account exists, so update password
        let { id } = admin;
        client.query('UPDATE users SET password=$1, salt=$2 WHERE id=$3', [hash, salt, id])
            .then(() => console.log('Updated admin account with password: ', password) || client.end())
            .catch(err => console.error('Error updating admin: ', err) || client.end());
    } else {
        client.query('INSERT INTO users(username, password, salt, type) VALUES($1, $2, $3, $4)', ['admin', hash, salt, 'admin'])
            .then(() => console.log('Created admin account with password: ', password) || client.end())
            .catch(err => console.error('Error creating admin: ', err) || client.end());
    }
}

(async function () {
    if (password === '') {
        throw Error('Cannot create admin account with no password! Execute `npm run set_admin <password>`');
    } else {
        await client.connect();
        // generate salt and hash password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        // check if admin account already exists
        client.query('SELECT * FROM users WHERE username=$1', ['admin'])
            .then(res => res.rows.length ? res.rows[0] : null)
            .then(admin => onQueryForAdmin(admin, salt, hash))
            .catch(err => console.error('Error querying for admin: ', err));
    }
})();