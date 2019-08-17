var express = require('express');
var router = express.Router();
var config = require('../config/config')
const mariadb = require('mariadb/callback');
var fs = require('fs');



// initially create tables if not exist
let connection = createConnection();
fs.readFile('./create_tables.sql', 'utf8', function(err, contents) {
    connection.query(contents, [], (err, results, fields) => {
        if (err){
            console.error('could not create tables',err)
        }
        connection.end()
    })
});


/* GET home page. */
router.post('/', function(req, res, next) {

    logData(req.body, err=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json({message:'saved'})
        }
    })


});

function createConnection(){
    return mariadb.createConnection({
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : config.database
    });
}

function logData(data,cb){
    let connection = createConnection();

    let stmt = `INSERT INTO logdata(data) VALUES(?);`;

// execute the insert statment
    connection.query(stmt, [data], (err, results, fields) => {
        if (err) {
            console.error(err.message);
            cb(err)
        }
        else {
            // get inserted id
            let id = results.insertId;
            console.log('inserted Id:' + id);
            if (id) {
                cb();
            }
            else {
                cb('no id returned after insert')
            }
        }
        if (connection) {
            connection.end();
        }
    });
}

module.exports = router;
