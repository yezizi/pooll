var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('./util/mysql.js');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var user = require('./router/user');
app.use('/user', user);

var wad = require('./router/wad');
app.use('/wad', wad);

var userLog = require('./router/user-log')
app.use('/log', userLog)

app.post('/register', function (req, res) {
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      res.send({message: '连接数据库失败'});
      return;
    }
    console.log('[info] mysql client id:', connection.threadId);
    let sql = 'select count(*) counter '
        + 'from users '
        + 'where account = ?';
    let param = [req.body['account'],];
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      if (error) {
        res.send({message: 'ERROR', error: '查询失败'});
        return;
      }
      if (0 != data[0].counter) {
        res.send({message: 'ERROR', error: 'DUPLICATED_ACCOUNT'});
        return;
      }
      sql = 'insert into users '
          + 'set account = ?, '
          + 'password = ?, '
          + 'nickname = ?';
      param = [req.body['account'], req.body['password'], req.body['account']];
      connection.query({
        sql: sql,
        values: param
      }, function (error, data) {
        connection.release();
        if (error) {
          res.send({message: 'ERROR', error: 'ERROR_ON_INSERT'});
          return;
        }
        res.send({message: 'OK'});
      });
    })
  });
})

app.post('/login', function (request, response) {
  mysql.pool.getConnection(function(error, connection) {
    if (error) {
      response.json({message: '连接数据库失败'});
      return;
    }
    console.log('[info] mysql client id:', connection.threadId);
    const sqlText = 'select id, count(*) counter '
        + 'from users '
        + 'where account = ? '
        + 'and password = ? '
        + 'limit 1';
    const param = [request.body['account'], request.body['password']];
    connection.query({
      sql: sqlText,
      values: param
    }, function (error, data) {
      connection.release();
      if (error) {
        response.send({message: 'ERROR'});
        return;
      }
      if (data[0].counter == 1) {
        response.send({
          message: 'OK',
          userId: data[0].id
        });
      } else {
        response.send({
          message: 'ERROR',
          error: 'INVALID_ACCOUNT_PASSWORD'
        });
      }
    });
  });
});

app.get('/', function (req, res) {
  res.send('1123');
});

app.get('/test', function (req, res) {
  res.send({message: 'OK'});
});

app.listen(8000);
