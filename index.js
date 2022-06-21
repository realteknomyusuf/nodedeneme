const { SerialPort } = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;
var mysql = require('mysql');


const serialPort = new SerialPort({
    path: 'COM3',
    baudRate: 9600
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node"
});

const master = new ModbusMaster(serialPort);
var i1 = 0;
var i2 = 0;
var i3 = 0;
var i4 = 0;
var minute1 = 0;
var minute2 = 0;
var minute3 = 0;
var minute4 = 0;
var temp1 = 0;
var temp2 = 0;
var temp3 = 0;
var temp4 = 0;
var temperature1 = 0;
var temperature2 = 0;
var humidity1 = 0;
var humidity2 = 0;
var minute = 0;

function readtemp() {
    var date = new Date();
    master.readInputRegisters(2, 1, 1).then((data) => { data1(data / 10, date.getMinutes()) }, (err) => { });
    

    
    

    if(minute == date.getMinutes()){

    } else {
        if(minute != 0){
            goster();
        }
        minute = date.getMinutes();
   }

    function data1(data, min) {
        if (min == minute1) {
            temp1 = data + temp1;
            i1++;
            temperature1 = temp1 / i1;
            master.readInputRegisters(3, 1, 1).then((data) => { data2(data / 10, date.getMinutes()) }, (err) => { });
        } else {
            temp1 = 0;
            minute1 = min;
            i1 = 0;
        }
    }
    function data2(data, min) {
        if (min == minute2) {
            temp2 = data + temp2;
            i2++;
             temperature2 = temp2 / i2;
             master.readInputRegisters(2, 2, 1).then((data) => { data3(data / 10, date.getMinutes()) }, (err) => { });
       } else {
            temp2 = 0;
            minute2 = min;
            i2 = 0;
        }
    }
    function data3(data, min) {
        if (min == minute3) {
            temp3 = data + temp3;
            i3++;
            humidity1 = temp3 / i3;
            master.readInputRegisters(3, 2, 1).then((data) => { data4(data / 10, date.getMinutes()) }, (err) => { });
        } else {
            temp3 = 0;
            minute3 = min;
            i3 = 0;
        }
    }
    function data4(data, min) {
        if (min == minute4) {
            temp4 = data + temp4;
            i4++;
            humidity2 = temp4 / i4;
        } else {
            temp4 = 0;
            minute4 = min;
            i4 = 0;
        }
    }
    console.log("temp1=" + temp1.toFixed(1) + "-" + minute1 + "-" + i1 + "-----temp2=" + temp2.toFixed(1) + "-" + minute2 + "-" + i2 + "----hum1=" + temp3.toFixed(1) + "-" + minute3 + "-" + i3 + "----hum2=" + temp4.toFixed(1) + "-" + minute4 + "-" + i4);

    function goster() {
        var sonuc = "slave2 temp = " + temperature1.toFixed(1) + "C - hum = " + humidity1.toFixed(1) + "% --- slave3 temp = " + temperature2.toFixed(1) + "C - hum = " + humidity2.toFixed(1) + "%";
        console.log();
        console.log(sonuc);
        con.connect(function() {
            console.log("Connected!");
            var tarih = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+"  "+date.getHours()+":"+date.getMinutes();
            var sql = "INSERT INTO result (temp1, temp2, hum1, hum2, date) VALUES ('"+temperature1.toFixed(1)+"', '"+temperature2.toFixed(1)+"', '"+humidity1.toFixed(1)+"', '"+humidity2.toFixed(1)+"', '"+tarih+"')";
            con.query(sql, function (result) {
              console.log("1 record inserted");
        temperature1 = 0;
        temperature2 = 0;
        humidity1 = 0;
        humidity2 = 0;
            });
          });
        console.log();
    }
}
//readtemp();
setInterval(readtemp, 500);