const Discord = require('discord.js');
var express = require('express');
var axios = require('axios');
var et = require('html-entities').AllHtmlEntities();
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
		var re = /(!blague|!météo .*|image)/g;
		var res = message.content.match(re);

		console.log(res);
		if(res != null){
			for(i in res){	
				if(res[i].includes("!blague")){
				//message.reply("Chuck norris peut finir super mario sans sauter.");				
					axios.request({
						url:'http://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:txt;nb:1',
						method: 'GET',
					}).then(function (response) {
							console.log(response);
							message.reply(et.decode(response.data[0].fact + " Jajaja on se fend la poire."));
						}).catch(function (error) {
							console.log(error.response.data);
					});					
				}
				else if(res[i].includes("!météo")){
					ville = res[i].replace("!météo ","");
					message.reply('Ville = '+ ville);
				}
				else{
					message.reply('Pas compris');
				}
			}
			 

		}
		else{
			message.reply('Pas compris');
		}
		//

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
