var axios = require('axios');
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

var exports = module.exports = {};

exports.replyMeteo = function(message, ville){
	console.log(ville);
	axios.request({
		url:'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ville+'&appid=5aaa01984cc54ac180592116b5e0fb9c&cnt=2',

		method: 'GET',
	}).then(function (response) {
		var emot = "";
		
		//console.log(response.data.list[1].weather[0].description);
		
		if((response.data.list[1].weather[0].description).includes("clouds")){
			emot = ":cloud: :frowning2:";
		}
		else if((response.data.list[1].weather[0].description).includes("rain")){
			emot = ":cloud_rain: :disappointed_relieved:";
		}
		else if((response.data.list[1].weather[0].description).includes("clear")){
			emot =":sunny: :grinning:";
		}

			message.reply("The weather will be "+response.data.list[1].weather[0].description+" in "+ville+" tomorrow."+emot+" \n"+"Temperature:  "+(response.data.list[1].temp.day-273.15)+"°");
		}).catch(function (error) {
			message.reply("Problème rencontré...");
		});
}
