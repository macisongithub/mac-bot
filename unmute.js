const fs = require("fs")

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:no:408996763748270080> You must have the MANAGE_ROLES permission in this discord server to use this command!");

		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
		if(!toMute) return message.channel.send("<:no:408996763748270080> You did not mention a user or specify their ID!");

		let role = message.guild.roles.find(r => r.name === "Muted");	
		
		if(!role || !toMute.roles.has(role.id)) return message.channel.send(`:radioactive: **${toMute.user.tag}** is not muted!`);

		await toMute.removeRole(role);

			delete client.mutes[toMute.id];

			fs.writeFile("./mutes.json", JSON.stringify(client.mutes), err => {
				if(err) throw err;
				console.log(`Successfully unmuted ${toMute.user.tag}.`);
			});
		message.channel.send(`<:yes:408996738217541632> Successfully unmuted **${toMute.user.tag}**.`);
}
