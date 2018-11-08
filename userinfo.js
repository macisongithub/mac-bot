const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {

	const embed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setDescription("Information about your discord account.")
		.setColor(0x9F45FF)
		.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
		.addField("ID", message.author.id)
		.addField("Created At", message.author.createdAt)

	message.channel.send({embed});
}
