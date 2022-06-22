var mysql = require('mysql');



var con1 = mysql.createConnection({
    host: "localhost",
    user: "real",
    password: "pppppp"
  });
  
  con1.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con1.query("CREATE DATABASE node", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });


