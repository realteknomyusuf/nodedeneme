var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE result (id int primary key auto_increment, temp1 varchar(255), temp2 varchar(255), hum1 varchar(255), hum2 varchar(255), date varchar(255))"
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table3 created");
    });
  
  });
  