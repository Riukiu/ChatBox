const Discord = require('discord.js');
var express = require('express');
var axios = require('axios');
var et = require('html-entities').AllHtmlEntities();
var app = express();
var blague = require('./blague.js');
var meteo = require('./meteo.js');

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
		
		var re = /!([a-z]|\s)*([a-z]*)/g;
		var res = message.content.match(re);

		console.log(res);
		if(res != null){
			for(i in res){	
				if(res[i].includes("!blague")){
					blague.replyJoke(message);
				}
				else if(res[i].includes("!meteo")){
					//console.log("res[i]"+ res[i]);
					var ville = res[i].replace("!meteo","");
					//console.log("ville : "+ ville);
					meteo.replyMeteo(message, ville);

				}
				else if(res[i].includes("!image")){

				}
				else if(res[i].includes("!iss")){
					
				}
				else{
					message.reply('Je n\'ai pas compris la commande suivante : '+res[i]+', Mon vocabulaire ne se limite qu\'à: ...');
				}
			}
			 
		}
		else{
			message.reply('Je n\'ai pas compris. Mon vocabulaire ne se limite qu\'à: ...');
		}

	}

});

client.on('presenceUpdate', function(oldMember, newMember) {
	//console.log(oldMember.presence, '=>', newMember.presence);
	if(newMember.presence.status == "online" && newMember.user.username == "bramas"){
		newMember.sendMessage("Bonjour maitre, je suis "+client.user.id+" le bot de Ludo et Adel, que puis-je faire pour vous aujourd'hui ?");
	}
});

//client.login("Mjk2NTM0NDgzOTk2Mzc3MDk3.C8OQ5g.JMh30QRrGKudUyAOd5HjBR2EmDQ");
client.login(process.env.DISCORD_TOKEN);
app.listen(process.env.PORT || 5000);