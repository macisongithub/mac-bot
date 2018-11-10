const Discord = require('discord.js');

exports.run = (client, message, args, func) => {

	message.channel.send("Hello.").then(sentMessage => sentMessage.edit("Hello.")).then(sentMessage => sentMessage.edit("Hello.")).then(sentMessage => sentMessage.edit("Hello.")).then(sentMessage => sentMessage.edit("I am a client created and maintained by <@295978095129657355>.")).then(sentMessage => sentMessage.edit("I am a client created and maintained by <@295978095129657355>.")).then(sentMessage => sentMessage.edit("Thank you for reading this."));
}