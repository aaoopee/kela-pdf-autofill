
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var pdfFiller = require('pdffiller');

var app = express();
var PORT = process.env.PORT || 3000;


var toFill = {
	"Given Name Text Box": "Antti"
}


app.use(bodyParser.json());

app.get('/fdf', function(req, resp) {
	var sourcePDF = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';
	var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, null, function(err,fdfData) {
		console.log('Generating FDF data');

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

	var sourcePDF = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';

	pdfFiller.fillFormWithFlatten(sourcePDF, "./tst.pdf", toFill, false, function(err) {
		if (err) {
			console.error('Error '+err);
		}

		resp.status(404).send(err);
	});

	resp.send('End of doc generation function. Callback may still be active.');
});


app.listen(PORT, function() {
	console.log('Server started on port '+PORT+'.');
});
