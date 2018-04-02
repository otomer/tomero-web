"use strict";

var express = require("express");
var app = express();
var dateFormat = require('dateformat');
var bodyParser = require("body-parser");
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');
const request = require('request');
const log = console.log;
var port = process.env.PORT || 8088;
var domain = "localhost";

var serverInfo = {
    expressVersion: require('express/package').version,
    port: port,
    upTime: dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT"),
    message: `server is listening ${domain}:${port}`,
}

//Serve static files from wwwroot
//app.use(express.static(path.join(__dirname, 'public')));

// serve static files from template
app.use(express.static(__dirname + '/public'));

//Parse application/json requests
app.use(bodyParser.json());// JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // URL


//Middleware
app.use(function (req, res, next) {
    console.log("\r");
    var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
    console.log(d + ": " + req.method + " " + req.url);
    var interceptObj = function (obj, key) { if (obj && Object.keys(obj).length > 0) { console.log(key, obj); } }
    interceptObj(req.query, "query");
    interceptObj(req.params, "params");
    interceptObj(req.body, "body");
    next();  // Passing the request to the next handler in the stack.
});

var printDate = function () {
    console.info(dateFormat(Date.now(), "\ndd/mm/yyyy H:MM:ss TT"));
}

//GET Requests
app.get('/server', function (req, res) {
    res.send(serverInfo);
})
 

 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("\r");
    var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
    console.log(d + ": " + req.method + " " + req.url);
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// Error Handler (define as the last app.use callback)
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.status !== 200) {
        console.log(chalk.red(err.status + " (" + err.message + ")"));
    }
    res.send(err.message);
});

//Server start
var server = app.listen(port, (err) => {
    printDate();
    if (err) {
        return console.error('something bad happened!', err)
    }
    console.info(serverInfo.message);
})
        