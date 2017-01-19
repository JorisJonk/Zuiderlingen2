var mysql = require("mysql");
var url = require("url");
var http = require("http");
var express = require("express");
var port = 3000;
var app = express();
var email = "";
var nodemailer = require('nodemailer');


var agenda = [];
var tx = {
    date: "11-12-2016",
    activiteit: "Kerstconcert"
};
agenda.push(tx);
var tx2 = {
    date: "28-12-2016",
    activiteit: "Repetitie"
};
agenda.push(tx2);
var tx3 = {
    date: "4-12-2016",
    activiteit: "Repetitie"
};
agenda.push(tx3);
var tx4 = {
    date: "11-01-2017",
    activiteit: "Repetitie"
};
agenda.push(tx4);


app.use(express.static(__dirname));
http.createServer(app).listen(port);

app.get('/newmember', function(req, res) {
    var urlparsed = url.parse(req.url, true)
    var query = urlparsed.query;

    if (query["email"] !== undefined) {
        var tx = query["email"];

        console.log(tx + " wil lid worden");
        res.end(tx + "wil lid worden");
    } else {
        res.end("Error");
    }
});


app.get('/newnieuwsbrief', function(req, res) {
    var urlparsed = url.parse(req.url, true)
    var query = urlparsed.query;

    if (query["email"] !== undefined) {
        var tx = query["email"];

        console.log(tx + " wil nieuwsbrief");
        res.end(tx + " wil nieuwsbrief");
    } else {
        res.end("Error");
    }
});

app.get('/getagenda', function(req, res) {
    console.log("agenda requested!");
    console.log(agenda + "console1");
    res.json(agenda);
});

app.get('/adddate', function(req, res) {
        var urlparsed = url.parse(req.url, true);
        var query = urlparsed.query;
        index = query['index'] - 1 ;
        var tx = {
            date: query["date"],
            activiteit: query["activiteit"]
        };
        agenda.splice(index, 1, tx);

    });

/*var transporter =  nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, joris33@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body

};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
*/
