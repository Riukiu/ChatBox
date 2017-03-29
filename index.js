const Discord = require('discord.js');
var express = require('express');
var axios = require('axios');

var app = express();

app.get('/', function(req,res){
	res.send('ready');
});
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
/*
	if (message.mentions.users.get(client.user.id) != undefined) {
		message.reply('Pas compris');
	}*/
	
	if((message.channel.type=="dm" && !message.author.bot) || message.isMentioned(client.user)){
		var re = /(!.*)/i;
		var res = message.content.match(re);
		console.log(res);
		if(res != null){
			if(res[0] == "!blague"){
			//message.reply("Chuck norris peut finir super mario sans sauter.");				
				axios.request({
					url:'http://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:txt;nb=1',
					method: 'GET',
				}).then(function (response) {
						message.reply(response + " Jajaja on se fend la poire.");
					}).catch(function (error) {
						console.log(error.response.data);
				});					
			}
		}
		//message.reply('Pas compris');

	}
	
});

client.on('presenceUpdate', function(oldMember, newMember) {
	//console.log(oldMember.presence, '=>', newMember.presence);
	if(newMember.presence.status == "online" && newMember.user.username == "bramas"){
		newMember.sendMessage("Bonjour maitre, je suis "+client.user.id+" le bot de Ludo et Adel, que puis-je faire pour vous aujourd'hui ?");
	}
});

client.login(process.env.DISCORD_TOKEN);
app.listen(process.env.PORT || 5000);
