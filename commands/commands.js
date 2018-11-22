const Discord = require('discord.js');

exports.run = (client, message) => {

		const embed = new Discord.RichEmbed()
		.setAuthor(client.user.tag)
		.setColor(0x9F45FF)
		.setDescription("List of commands:")
		.addField("Commands", "DMs you this list." , true)
		.addField("Config", "Shows you status of welcome/leave.", true)
		.addField("Find Users", "Self-explanatory really.", true)
		.addField("Help", "Gives you info about the bot.", true)
		.addField("Info", "Also gives you info about the bot", true)
		.addField("Invite", "Gives you an invite link for the bot.", true)
		.addField("Kick", "Kicks the member who has been mentioned, very basic.", true)
		.addField("Messages", "Tells you how many messages you have sent in said server.", true)
		.addField("Mute", "Mutes the mentioned member.", true)
		.addField("Ping", "Tells you the bot ping.", true)
		.addField("Purge", "Removes a certain amount of messages from a certain channel.", true)
		.addField("Set Autorole", "Sets an autorole, roles members said role when join.", true)
		.addField("Set Channel", "Sets channel for welcome/leave messages.", true)
		.addField("Set DM", "Sets welcome DM.", true)
		.addField("Set Leave", "Sets leave message.", true)
		.addField("Set Welcome", "Sets welcome message.", true)
		.addField("Unmute", "Unmutes the mentioned member.", true)
		.addField("User Info", "Gives you info about yourself.", true)
		.addField("Weather", "Tells you the weather of said city.", true)

		message.author.send({embed});
}