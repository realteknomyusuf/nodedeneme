var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "realtekno",
    password: "ppppp",
    database: "node"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE result (id int primary key auto_increment, temp1 varchar(255), temp2 varchar(255), temp3 varchar(255), date varchar(255))"
    var sql2 = "CREATE TABLE setting (id int primary key auto_increment, temp1_lo varchar(255) Default '21', temp1_hi varchar(255) Default '29', temp2_lo varchar(255) Default '21', temp2_hi varchar(255) Default '29', temp3_lo varchar(255) Default '21', temp3_hi varchar(255) Default '29')"
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result table created");
    });
    con.query(sql2, function (err, result) {
      if (err) throw err;
      console.log("Setting table created");
    });
  
  });
  