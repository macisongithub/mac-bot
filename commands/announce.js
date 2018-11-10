const Discord = require('discord.js');

exports.run = (client, message, args, func) => {
	if(message.author.id !== "295978095129657355") return;

		const embed = new Discord.RichEmbed()
		.setAuthor(message.author.tag)
		.setTitle("Announcement")
		.setColor(0x9F45FF)
		.setDescription(args.join(" "))

		client.guilds.get("387623524891623434").channels.get("387624704992608267").send("<@&387627056235544576>");
        client.guilds.get("387623524891623434").channels.get("387624704992608267").send({embed});

}
