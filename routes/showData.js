var express = require('express');
var router = express.Router();
const mariadb = require('mariadb/callback');
var config = require('../config/config')


/* GET home page. */
router.get('/', function(req, res, next) {
  let connection = createConnection();
  let stmt = `SELECT * FROM logdata order by timestamp DESC LIMIT 1000;`;

  // execute the insert statment
  connection.query(stmt, [], (err, results, fields) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
    else {
      res.render('showdata', { title: 'Sleep Log Server', logentries: results });
    }
    if (connection) {
      connection.end();
    }
  });

});

function createConnection(){
  return mariadb.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });
}

module.exports = router;
