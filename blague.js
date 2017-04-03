var axios = require('axios');
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

var exports = module.exports = {};

exports.replyJoke = function(message){
	axios.request({
	url:'http://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:txt;nb:1',
	method: 'GET',
	}).then(function (response) {
			message.reply(entities.decode(response.data[0].fact));
		}).catch(function (error) {
			console.log(error.response.data);
	});
}
