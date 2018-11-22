const Discord = require('discord.js');

exports.run = (client, message, args, func) => {

		let member = message.mentions.members.first();
		let reason = args.slice(1).join(" ");
		member.kick(reason);
}