const { SerialPort } = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;
var mysql = require('mysql');


const serialPort = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600
});

var con = mysql.createConnection({
  host: "localhost",
  user: "realtekno",
  password: "ppppp",
  database: "node"
});

const master = new ModbusMaster(serialPort);
var i1 = 0;
var i2 = 0;
var i3 = 0;
var minute1 = 0;
var minute2 = 0;
var minute3 = 0;
var temp1 = 0;
var temp2 = 0;
var temp3 = 0;
var temperature1 = 0;
var temperature2 = 0;
var temperature3 = 0;
var minute = 0;

function readtemp() {
    var date = new Date();
    master.readInputRegisters(2, 1, 1).then((data) => { tp1(data / 10, date.getMinutes()) }, (err) => { });
    if(minute != date.getMinutes()){
        if(minute != 0){ goster(); }
        minute = date.getMinutes();
   }

    function tp1(data, min) {
        if (min == minute1) {
            temp1 = data + temp1;
            i1++;
            temperature1 = temp1 / i1;
        } else {
            temp1 = 0;
            minute1 = min;
            i1 = 0;
        }
        master.readInputRegisters(3, 1, 1).then((data) => { tp2(data / 10, date.getMinutes()) }, (err) => { });
    }
    function tp2(data, min) {
        if (min == minute2) {
            temp2 = data + temp2;
            i2++;
             temperature2 = temp2 / i2;
       } else {
            temp2 = 0;
            minute2 = min;
            i2 = 0;
        }
        master.readInputRegisters(2, 1, 1).then((data) => { tp3(data / 10, date.getMinutes()) }, (err) => { }); //3. slave adresi mümkünse 4 olsun
    }
    function tp3(data, min) {
        if (min == minute3) {
            temp3 = data + temp3;
            i3++;
            temperature3 = temp3 / i3;
        } else {
            temp3 = 0;
            minute3 = min;
            i3 = 0;
        }
    }
    console.log("temp1=" + (temp1/i1).toFixed(1) + "----min1=" + minute1 + "----loop1=" + i1);
    console.log("temp2=" + (temp2/i2).toFixed(1) + "----min2=" + minute2 + "----loop2=" + i2); 
    console.log("temp3=" + (temp3/i3).toFixed(1) + "----min3=" + minute3 + "----loop3=" + i3);

    function goster() {
        console.log();
        con.connect(function() {
            console.log("Connected!");
            var sonuc = "slave2 temp = " + temperature1.toFixed(1) + "--- slave3 temp = " + temperature2.toFixed(1) + "--- slave4 temp = " + temperature3.toFixed(1) + "C";
            console.log(sonuc);
            var tarih = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+"  "+date.getHours()+":"+date.getMinutes();
            var sql = "INSERT INTO result (temp1, temp2, temp3, date) VALUES ('"+temperature1.toFixed(1)+"', '"+temperature2.toFixed(1)+"', '"+temperature3.toFixed(1)+"', '"+tarih+"')";
            con.query(sql, function (result) {
                console.log("This record inserted to database");
                temperature1 = 0;
                temperature2 = 0;
                temperature3 = 0;
            });
        });
        console.log();
    }
}

setInterval(readtemp, 1000);
