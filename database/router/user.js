var express = require('express')
var router = express.Router()
var mysql = require('../util/mysql');

// var multer = require('multer');

// var upload = multer()

// router.use(function timeLog(req, res, next) {
//   console.log('[info] Time:', Date.now());
//   next();
// });

router.route('/info')
  .get(function (req, res) {
    mysql.pool.getConnection(function (err, connection) {
      if (err) {
        // console.log(err)
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select id, account, nickname '
          + 'from users '
          + 'where id = ? '
          + 'limit 1'
      let param = [req.cookies.user]
      connection.query({
        sql: sql,
        values: param
      }, function (err, data) {
        connection.release()
        if (err) {
          res.send({message: 'QUERY_FAILED'})
          return
        }
        res.json(data[0])
      })
    })
  })

router.route('/check')
  .get(function (req, res) {
    console.log('Cookies: ', req.cookies.user)
    res.send({message: 'OK', counter: 1})
  })

// 修改密码
router.route('/change-password')
  .post(function (req, res) {
    res.send({message: 'NOT_FINISHED'})
  })

// 修改昵称
router.route('/change-nickname')
  .post(function (req, res) {
    res.send({message: 'NOT_FINISHED'})
  })

module.exports = router
