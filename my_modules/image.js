var axios = require('axios');
var Entities = require('html-entities').AllHtmlEntities;

var exports = module.exports = {};

exports.getImage = function(message, query){
	axios.request({
		url:'https://api.imgur.com/3/gallery/search/?q='+query,
		method: 'GET',
		headers: {
	          Authorization: 'Client-ID 265c853e7e96078',
	          Accept: 'application/json'
	    },
		}).then(function (response) {
			message.reply(response.data.data[0].link);

			}).catch(function (error) {
				console.log(error.response.data);
	});
}