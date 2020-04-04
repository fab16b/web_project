const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
});

connection.connect(err => {
  if (!err) {
    console.log('MySQL Connected');
  } else {
    console.log('MySQL Connection Failed.');
  }
});

module.exports = connection;
