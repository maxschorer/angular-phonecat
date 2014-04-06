// web.js
var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");

var app = express();
app.use(logfmt.requestLogger());
app.use('/',express.static(__dirname));

app.get('/projects', function(req, res) {
  var htmlFile = fs.readFileSync("app/projects/got.html").toString();
  res.send(htmlFile);
});

app.get('/', function(req, res) {
  var htmlFile = fs.readFileSync("app/index.html").toString();
  res.send(htmlFile);
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});
