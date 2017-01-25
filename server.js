
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var pdfFiller = require('pdffiller');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, resp) {

	var sourcePDF = "http://www.kela.fi/documents/10192/3423776/TO1_W.pdf/472f05d6-e804-491b-b576-18a45c57f5ae"
	var nameRegex = null;

	var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, nameRegex,
		function(err, fdfData) {
			if (err) {
				console.error(err);
			}
			console.log(fdfData);
		})

	resp.send(FDF_data.toJSON());
});

app.listen(PORT, function() {
	console.log('Server started on port '+PORT+'.');
});
