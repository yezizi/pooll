var express = require('express')
var router = express.Router()
var mysql = require('../util/mysql')

router.route('/browse/:category/:iid')
  .get(function (req, res) {
    mysql.pool.getConnection(function (error, connection) {
      if (error) {
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'insert into user_log '
          + '(user_id, item_id, category, date, time) '
          + 'values (?, ?, ?, now(), now())'
      let values = [req.cookies.user, req.params.iid, req.params.category]
      connection.query({
        sql: sql,
        values: values
      }, function (error, data) {
        connection.release()
        if (error) {
          console.log(error)
          res.send({message: 'ERROR', error: 'QUERY_FAILED'})
          return
        }
        res.send({message: 'OK'})
      })
    })
  })

module.exports = router
