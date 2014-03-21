// web.js
var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");

var app = express();

app.use(logfmt.requestLogger());


app.get('/', function(req, res) {
  htmlFile = fs.readFileSync("app/index.html").toString();
  res.send(htmlFile);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
