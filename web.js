// web.js
var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");

var app = express();
app.use(logfmt.requestLogger());
//app.use('/',express.static(process.env.PWD+'/app/js/'));

app.get('/', function(req, res) {
  var htmlFile = fs.readFileSync("app/index.html").toString();
  res.send(htmlFile);
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});
