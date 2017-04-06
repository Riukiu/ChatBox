var axios = require('axios');
var fs = require('fs'),
request = require('request');
var sharp = require('sharp');

/*
	CODE FROM STACK OVERFLOW
*/
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var exports = module.exports = {};

exports.getIss = function(message){
	axios.request({
		url:'https://api.wheretheiss.at/v1/satellites/25544',
		method: 'GET',
	}).then(function (response) {
			//console.log(response);
			
			var LAT = response.data.latitude;
			var LNG = response.data.longitude;

			download("http://staticmap.openstreetmap.de/staticmap.php?center="+LAT+","+LNG+"&zoom=5&size=400x300&maptype=mapnik&markers="+LAT+","+LNG+",ltblu-pushpin", 'iss_map.png', function(){
			   	console.log('done');
			   	sharp('iss_map.png')
				  .overlayWith('iss_icon.png', { gravity: sharp.gravity.southeast } )
				  .sharpen()
				  .toFile("iss_msg.png")
				  .then(function() {
				    // outputBuffer contains upside down, 300px wide, alpha channel flattened
				    // onto orange background, composited with overlay.png with SE gravity,
				    // sharpened, with metadata, 90% quality WebP image data. Phew!
				    message.sendFile("iss_msg.png");
				  });

			});

			//message.reply("http://staticmap.openstreetmap.de/staticmap.php?center="+LAT+","+LNG+"&zoom=5&size=400x300&maptype=mapnik&markers="+LAT+","+LNG+",ltblu-pushpin");
		}).catch(function (error) {
			console.log(error.response.data);
	});
}