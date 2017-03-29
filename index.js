const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
/*
	if (message.mentions.users.get(client.user.id) != undefined) {
		message.reply('Pas compris');
	}*/
	if(message.isMentioned(client.user)){
		message.reply('Pas compris');
	}
});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	if(newMember.presence.status == "online" && newMember.user.username == "Barjow"){
		newMember.sendMessage("Bonjour maitre, je suis "+client.user.id+" le bot de Ludo et Adel, que puis-je faire pour vous aujourd'hui ?");
	}
});

client.login(process.env.DISCORD_TOKEN);
