const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
	console.log(message);
});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	if(newMember.nickname == "Barjow"){
		sendMessage("Barjow", "Bonjour maitre");
	}
});

client.login(process.env.DISCORD_TOKEN);
