const Discord = require('discord.js');

exports.run = (client, message) => {
	if(message.author.id !== "295978095129657355") return;
  	
  	const embed = new Discord.RichEmbed()
  	  .setDescription("Information on the number of servers of this bot.")
  	  .setColor(0x9F45FF)
  	  .setThumbnail("https://images-ext-2.discordapp.net/external/knbnjnSKQgVKmEmZ7UYMQxHpC1ajzG-pwVw5wCa91Rw/https/images.emojiterra.com/twitter/512px/1f4ca.png")
	  .addField("Total servers", client.guilds.size)
	  .setTimestamp()
	  
	  message.channel.send(embed);
  }