var axios = require('axios');
var fs = require('fs'),
request = require('request');
var Jimp = require("jimp");
//var sharp = require('sharp');

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

			download("http://staticmap.openstreetmap.de/staticmap.php?center="+LAT+","+LNG+"&zoom=2&size=400x300&maptype=mapnik", 'iss_map.png', function(){
			   	console.log('done');
			   	//message.sendFile("iss_map.png");
			   	Jimp.read("iss_icon.png").then(function(src){
			   		src.resize(64,64);
			   		Jimp.read("iss_map.png").then(function (lenna) {
					         lenna.composite(src, 200-32, 150-32)
					         .write("iss_map_final.png", function(){
					         	message.channel.sendFile("iss_map_final.png","iss_map_final.png","Voici où se trouve l'ISS: ",function(err,mess){
	                                if(err){
	                                    message.reply('FATAL ERROR');
	                                }
                      		    });
					         }); // save
					}).catch(function (err) {
					    console.error(err);
					});
			   	});

			});

			//message.reply("http://staticmap.openstreetmap.de/staticmap.php?center="+LAT+","+LNG+"&zoom=5&size=400x300&maptype=mapnik&markers="+LAT+","+LNG+",ltblu-pushpin");
		}).catch(function (error) {
			console.log(error.response.data);
	});
}