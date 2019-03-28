# Pokemon Let's Go 304

UBC CPSC 304 Term Project: Front-end Repository and General Installation Instructions

Back-end Repository: [Link](https://github.com/kelseylaw/pokemon-lets-go-three-o-four-backend);

## Team

[Nicholas Kong](https://github.com/Asiapenguin)

[Cindy Tu](https://github.com/cindy-yhtu)

[Kelsey Law](https://github.com/kelseylaw)

[Andrew Choi](https://github.com/andrchoi)

## Development Notes

### Setup & Run

#### Database
Make sure you have downloaded PostgreSQL for your environment (Mac/Windows/Linux) and remember your superuser password

Start PostgreSQL (Path is default in this example for Windows with version 11)
```bash
$ pg_ctl -D "C:/Program Files/PostgreSQL/11/data" start
```
For Mac users, use homebrew and start PostgreSQL service.

Connect to *postgres* as *postgres* superuser and enter your superuser password
```bash
$ psql postgres postgres
```
Create database named *proj304*
```
$ CREATE DATABASE proj304;
```
Create user named *three* with password *p304*
```
$ CREATE ROLE three WITH LOGIN PASSWORD 'p304';
```
Logout of PostgreSQL server and using *data.sql* in the root directory of backend repository, populate the *proj304* database with user *three* and enter *p304* as password
```
$ psql --username=three proj304 < data.sql
```
A bunch of SQL queries should have ran. If so, the *proj304* database has been populated successfully!

#### Front-end code
Make sure you have cloned and in the root directory of this repository (pokemon-lets-go-three-o-four-dashboard)

```bash
$ npm install     # install dependencies
$ ng serve --open # run development server and open on default browser
```

#### Back-end code
Make sure you have cloned the backend repository and in the root directory of that repository (pokemon-lets-go-three-o-four-backend)

```bash
$ npm install     # install dependencies
$ node index.js   # run backend server that connects to PostgreSQL database
```

#### Notes

If you run into issues while running front-end code, maybe try this
```
$ npm rebuild node-sass
```

If you run into localhost database and backend service connection issues, please consider changing this file: *pg_hba.conf*
Replace section with title "Allow replication connections from localhost, by a user with the replication privilege"
Note: This is for Windows users, not sure if Mac/Linux users have this issue.
```
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
host    all             all             0.0.0.0/0               trust
host    all             all             ::/0                    trust
```
