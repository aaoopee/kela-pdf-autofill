
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var pdfFiller = require('node-pdffiller');

var app = express();
var PORT = process.env.PORT || 3000;


var toFill = {"Given Name Text Box":"",
"Family Name Text Box":"",
"House nr Text Box":"",
"Address 2 Text Box":"",
"Postcode Text Box":"",
"Country Combo Box":"",
"Height Formatted Field":"",
"City Text Box":"",
"Driving License Check Box":"",
"Favourite Colour List Box":"",
"Language 1 Check Box":"",
"Language 2 Check Box":"",
"Language 3 Check Box":"",
"Language 4 Check Box":"",
"Language 5 Check Box":"","Gender List Box":"","Address 1 Text Box":""};

var _data = {
            "first_name" : "Antti",
            "last_name" : "Pelkonen",
            "date" : "Jan 1, 2013",
            "football" : "Off",
            "baseball" : "Yes",
            "basketball" : "Off",
            "hockey" : "Yes",
            "nascar" : "Off"
        };

var inputPdf = "./test.pdf";
var outputPdf = "./output.pdf";


app.use(bodyParser.json());

app.get('/fdf', function(req, resp) {
	console.log('Generating FDF data');

	var FDF_data = pdfFiller.generateFDFTemplate(inputPdf, null, function(err,fdfData) {
		if (err) {
			console.error('Error '+err);
			resp.status(404).send(err);
		} else {
			console.log('Sending FDF Data '+JSON.stringify(fdfData));
			resp.json(fdfData);
		}
	});
});

app.get('/doc', function(req, resp) {
	console.log('Generating doc.')

	pdfFiller.fillForm(inputPdf, outputPdf, _data, function(err) {
		if (err) {
			console.error('Error '+err);
		}

		console.log('In callback');

		resp.status(404).send(err);
	});

	resp.send('End of doc generation function. Callback may still be active.');
});


app.listen(PORT, function() {
	console.log('Server started on port '+PORT+'.');
});
