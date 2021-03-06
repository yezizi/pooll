var express = require('express')
var mysql = require('../util/mysql')

var router = express.Router()

router.route('/:id')
  .get(function (req, res) {
    mysql.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select id, name, alias, taste, area, history, propose, intro, pic_1, pic_2 '
          + 'from wine_and_dine '
          + 'where id = ? '
          + 'limit 1'
      let param = [parseInt(req.params.id)]
      connection.query({
        sql: sql,
        values: param
      }, function (err, data) {
        connection.release()
        if (err) {
          console.log(err)
          res.send({message: 'ERROR', error: 'QUERY_FAILED'})
          return
        }
        res.json(data)
      })
    })
  })

router.route('/popular/:counter')
  .get(function (req, res) {
    mysql.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select wad.id, wad.name, wad.alias, wad.taste, wad.area, wad.propose, wad.pic_1, '
          + 'count(*) counter '
          + 'from user_log l '
          + 'join wine_and_dine wad on wad.id = l.item_id '
          + 'where l.category = ? '
          + 'group by wad.id '
          + 'order by counter desc '
          + 'limit ?'
      let param = ['wad', parseInt(req.params.counter)]
      connection.query({
        sql: sql,
        values: param
      }, function (err, data) {
        connection.release()
        if (err) {
          console.log(err)
          res.send({message: 'ERROR', error: 'QUERY_FAILED'})
          return
        }
        res.json(data)
      })
    })
  })

router.route('/recommand/:counter')
  .get(function (req, res) {
    mysql.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error)
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select id, name, alias, taste, area, history, propose, intro, pic_1, pic_2 '
          + 'from wine_and_dine '
          + 'order by id desc '
          + 'limit ?'
      let param = [parseInt(req.params.counter), ]
      connection.query({
        sql: sql,
        values: param
      }, function (error, data) {
        connection.release()
        if (error) {
          console.log(error)
          res.send({message: 'ERROR', error: 'QUERY_FAILED'})
          return
        }
        res.json(data)
      })
    })
  })

module.exports = router
