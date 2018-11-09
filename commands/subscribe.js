const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args, func) => {

	message.channel.send(message.author.toString() + ", You are now subscribed to announcements on the Midnight discord server.")

	message.author.addRole("<@&387627056235544576>");
}
