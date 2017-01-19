var mysql = require("mysql");
var url = require("url");
var http = require("http");

var port = 3000;
var app = express();
var email = "";
http.createServer(app).listen(port);

app.get('/newmember', function(req, res){
  var urlparsed = url.parse(req.url, true)
  var query = url_parts.query;
  var adres = query["email"];
  console.log(adres);
  res.end(adres)
  als het emailadres is doorgegeven moet er een mailtje worden gestuurd aan otto

}
