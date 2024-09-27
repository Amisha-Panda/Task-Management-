const express = require("express");  // calling express framework
const app = express();          // creating object of express
const cors = require("cors");  // calling cors origin library to allow data communication between 2 server
app.use(cors());             // creating object of cors library
app.use(express.json());    // injecting .json to send and receive data in json between 2 server


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Management"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", function (req, res) {
  res.write("<h1> Api Server is Live </h1>");
  res.end(); // end of response - nothing left after this.
});

//http://localhost:3333/facility
app.get("/facility", function (req, res) {
  let sql = "SELECT * FROM facilities";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify(result);
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/rooms
app.get("/rooms", function (req, res) {
  let sql = "SELECT * FROM rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify(result);
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/transaction
app.get("/transaction", function (req, res) {
  let sql = "SELECT * FROM transation";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify(result);
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/addtransaction
app.post("/addtransaction", function (req, res) {
  let name = req.body.name;
  let Idproof = req.body.Idproof;
  let Address = req.body.Address;
  let bookingfor = req.body.bookingfor;
  let checkin = req.body.checkin;
  let checkout = req.body.checkout;
  let facilityget = req.body.facilityget;

  let sql = "insert into transation(name, Idproof, Address, bookingfor, checkin, checkout, facilityget) values ('"+name+"', '"+Idproof+"', '"+Address+"', '"+bookingfor+"', '"+checkin+"', '"+checkout+"', '"+facilityget+"')";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify("Data Inserted");
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/deletetransaction
app.delete("/deletetransaction", function (req, res) {
  let name = req.body.name;
  let sql = `DELETE FROM transation WHERE name = '${name}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify({"message" : "Data Deleted"});
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/transationdetails
app.post("/transationdetails", function(req, res) {
  let name = req.body.name;
  let sql = "select * from transation where name = '" + name + "'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify(result);
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/Edittransaction
app.post("/Edittransaction", function (req, res) {
  let name = req.body.name;
  let Idproof = req.body.Idproof;
  let Address = req.body.Address;
  let bookingfor = req.body.bookingfor;
  let checkin = req.body.checkin;
  let checkout = req.body.checkout;
  let facilityget = req.body.facilityget;

  let sql = `UPDATE transation SET Idproof = '${Idproof}', Address = '${Address}', bookingfor = '${bookingfor}', checkin = '${checkin}', checkout = '${checkout}', facilityget = '${facilityget}' WHERE name = '${name}'`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify({"message" : "Data Updated"});
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/addFacility
app.post("/addFacility", function (req, res) {
  let facilities = req.body.facilities;
  let sql = "insert into facilities(facilities) values ('"+facilities+"')";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify("Data Inserted");
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/deleteFacility
app.delete("/deleteFacility", function (req, res) {
  let nooffacility = req.body.nooffacility;
  let sql = `DELETE FROM facilities WHERE nooffacility = '${nooffacility}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify({"message" : "Data Deleted"});
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/addroom
app.post("/addroom", function (req, res) {
  let available = req.body.available;
  let sql = "insert into rooms(available) values ('"+available+"')";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify("Data Inserted");
    res.send(jsonData);
    res.end();
  });
})

//http://localhost:3333/deleteroom
app.delete("/deleteroom", function (req, res) {
  let roomNum = req.body.roomNum;
  let sql = `DELETE FROM rooms WHERE roomNum = '${roomNum}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    let jsonData = JSON.stringify({"message" : "Data Deleted"});
    res.send(jsonData);
    res.end();
  });
})

app.listen(3333, function () {
  console.log("Sever Started on http://localhost:3333");
})

