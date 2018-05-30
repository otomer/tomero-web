"use strict";

var express = require("express");
var app = express();
var dateFormat = require("dateformat");
var bodyParser = require("body-parser");
var path = require("path");
var chalk = require("chalk");
var fs = require("fs");
var request = require("request");
var log = console.log;
var port = process.env.PORT || 8088;
var domain = "localhost";
var socket = require("socket.io");
var cors = require("cors");

var connectedUsers = new Map();
var serverInfo = {
  expressVersion: require("express/package").version,
  port: port,
  upTime: dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT"),
  message: `server is listening ${domain}:${port}`
};

function mapToJson(map) {
  return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

//Serve static files from wwwroot
//app.use(express.static(path.join(__dirname, 'public')));

// serve static files from template
app.use(express.static(__dirname + "/public"));

//Parse application/json requests
app.use(bodyParser.json()); // JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // URL
app.use(cors());

//Middleware
app.use(function(req, res, next) {
  console.log("\r");
  var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
  console.log(d + ": " + req.method + " " + req.url);
  var interceptObj = function(obj, key) {
    if (obj && Object.keys(obj).length > 0) {
      console.log(key, obj);
    }
  };
  interceptObj(req.query, "query");
  interceptObj(req.params, "params");
  interceptObj(req.body, "body");
  next(); // Passing the request to the next handler in the stack.
});

var apiRouter = require("./src/routes/mango")();
app.use("/api", apiRouter);

var printDate = function() {
  console.info(dateFormat(Date.now(), "\ndd/mm/yyyy H:MM:ss TT"));
};

//GET Requests
app.get("/server", function(req, res) {
  res.send(serverInfo);
});
//GET Requests
app.get("/onlineUsers", function(req, res) {
  res.send(mapToJson(connectedUsers));
});

//GET Requests
app.get("/components/amp-access/authorization", function(req, res) {
  res.send({
    subscriber: true,
    access: true,
    name: ""
  });
});
app.get("/components/amp-access/login", function(req, res) {
  res.send({
    subscriber: true,
    access: true,
    name: ""
  });
});

app.get("/components/amp-access/logout", function(req, res) {
  res.send({
    subscriber: true,
    access: true,
    name: ""
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("\r");
  var d = dateFormat(Date.now(), "dd/mm/yyyy H:MM:ss TT");
  console.log(d + ": " + req.method + " " + req.url);
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// Error Handler (define as the last app.use callback)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (err.status !== 200) {
    console.log(chalk.red(err.status + " (" + err.message + ")"));
  }
  res.send(err.message);
});

//Server start
var server = app.listen(port, err => {
  printDate();
  if (err) {
    return console.error("something bad happened!", err);
  }
  console.info(serverInfo.message);
});

var register = function(app) {
  // config middleware
   

  app.get("/categories", function(req, res) {
    res.send({
      items: [
        {
          title: "Image 01",
          imageUrl:
            "https://bp-samples.firebaseapp.com/examples/images/flowers.jpg"
        },

        {
          title: "Image 02",
          imageUrl:
            "https://bp-samples.firebaseapp.com/examples/images/sunset.jpg"
        }
      ]
    });
  });
};

// var https = express({ key: null });
// register(https);
// https.listen(443);

// const io = require("socket.io")(server);

// function usersMsg(user, state) {
//   var formattedMap = [];
//   for (var [key, value] of connectedUsers.entries()) {
//     formattedMap.push(
//       key + "@" + dateFormat(value.connectTime, "dd/mm/yyyy H:MM:ss")
//     );
//   }

//   console.log(
//     "Server: " +
//       user +
//       " " +
//       state +
//       ". " +
//       connectedUsers.size +
//       " Connected Users = (" +
//       formattedMap.join(", ") +
//       ")"
//   );
// }

// io.on("connection", socket => {
//   connectedUsers.set(socket.handshake.query.name, {
//     name: socket.handshake.query.name,
//     connectTime: new Date()
//   });
//   usersMsg(socket.handshake.query.name, "connceted");
//   console.log(connectedUsers);
//   socket.emit("whos_connected", mapToJson(connectedUsers));
//   socket.broadcast.emit("whos_connected", mapToJson(connectedUsers));

//   socket.on("chat", data => {
//     io.sockets.emit("chat", data);
//     console.log("Chat emitted from server");
//   });

//   // Disconnects
//   socket.on("disconnect", () => {
//     if (connectedUsers.has(socket.handshake.query.name)) {
//       connectedUsers.delete(socket.handshake.query.name);
//     }
//     usersMsg(socket.handshake.query.name, "disconnected");
//     socket.emit("whos_connected", mapToJson(connectedUsers));
//     socket.broadcast.emit("whos_connected", mapToJson(connectedUsers));
//   });

//   socket.on("selected_option", function(msg) {
//     console.log("message: " + msg);
//   });
// });
