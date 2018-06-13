# js_web_app_seed
This is a scaffold for an isomorphic ReactJS single-page web app with an ExpressJS backend and a PostgreSQL database.

## Technology Stack

### Front-end
React w/ React Router, Redux (through `react-redux`), Muicss, Basscss, bundled with Webpack.

### Back-end
NodeJS w/ ExpressJS, Passport (for authentication), Helmet (for setting http headers), and PostgreSQL (though `pg`).

### Development Environment
The front-end uses Babel to enable development with ES6+ features, and Flow for type safety. The back-end is NodeJS JavaScript and leverages the `babel-register` package when needed to get access to front-end code that lives in ES modules (as NodeJS still only supports CommonJS modules). The development environment is managed by npm scripts documented below.

## Getting Started

*You will need NodeJS 8 and NPM 4 or better pre-installed, along with access to a bash (or other) terminal to type commands in.*

1. Clone this repo into your project directory.
2. Open your terminal at the project directory and run `npm install` to install all the necessary dependencies.
3. In the same terminal, run `npm recreate_db` to wipe out any pre-existing db and recreate a new db.
4. Then run `npm run postgres` to start the postgres db server.
5. Open a new terminal window and run `npm run setup_db` to setup the User and Session databases.
6. Run `npm run dev` to start the Webpack watcher which will automatically rebundle anytime there's changes.
7. In a third terminal window run `npm run start` to start the development server, which will reboot anytime you make changes to the project.

## NPM Commands

### Dev-Server Commands
`npm run start` - Execute this command to start the development server.
`npm run debug` - Execute this command to start the development debugging server.

### Testing Commands
`npm run test` - Execute this command to run jest tests.

### Build Commands
`npm run build` - Execute this command to build the project for production.
`npm run dev` - Execute this command to continually rebuild project for development.

### Database Commands
`npm run recreate_db` - Execute this command to build the project for production.
`npm run postgres` - Execute this command to continually rebuild project for development.
`npm run setup_db` - Execute this command to build the project for production.

## Resetting the Database

**Warning: This will wipe any current database and all tables and rows!!!**

1. Make sure that the postgres db server is not running.
2. Open terminal at your project directory and run `npm run recreate_db` to clear and reset the database.
3. Run `npm run postgres` to start the postgres db server.
4. Run `npm run setup_db` to recreate the tables defined in db/init.sql.

The database is now reset and ready for use (though there's no admin account currently setup).

## Roadmap

Some things I'd still like to do:

- Extend flow coverage and write a small test suite.
- Wrap back-end in docker container, and use nginx for reverse-proxy.
- Create a better CSS build/workflow by including Sass in build step, setup Muicss for customization, and using Autoprefixer.
- Add nice things like hot-reloading