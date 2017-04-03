var axios = require('axios');
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

var exports = module.exports = {};


exports.replyMeteo = function(message, ville){
	axios.request({
		url:'http://samples.openweathermap.org/data/2.5/weather?q='+ville+'&appid=5aaa01984cc54ac180592116b5e0fb9c',
		method: 'GET',
	}).then(function (response) {
			message.reply("Météo à "+ville+": "+response.data.main.temp+" degrés kelvin");
		}).catch(function (error) {
			console.log(error.response.data);
	});
}
