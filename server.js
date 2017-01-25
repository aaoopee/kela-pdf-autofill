
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var pdfFiller = require('pdffiller');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, resp) {
	resp.send(pdfFiller);
});

app.listen(PORT, function() {
	console.log('Server started on port '+PORT+'.');
});
