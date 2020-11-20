const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST, // IP address of the server
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MYSQL Connected..');
  }
});

module.exports = db;
