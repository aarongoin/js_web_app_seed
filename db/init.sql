CREATE TABLE session (
	sid varchar NOT NULL PRIMARY KEY,
	sess json NOT NULL,
	expire timestamp(6) NOT NULL
) WITH (OIDS=FALSE);


CREATE TYPE user_type AS ENUM ('user', 'admin');
CREATE TABLE users (
	id bigserial PRIMARY KEY,
	username varchar(255) UNIQUE,
	password varchar(100),
	salt text,
	type user_type DEFAULT 'user'
);
-- index by username for fast duplicate checking
CREATE INDEX ON users(username);