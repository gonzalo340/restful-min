var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var config = require('./config/routes');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/', config);

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Servidor en http://%s:%s', host, port);

});
