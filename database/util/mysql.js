var mysql = require('mysql');

exports.pool = mysql.createPool({
  connectionLimit: 5,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'travel',
  debug: false
});
