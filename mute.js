const fs = module.require("fs");

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:no:408996763748270080> You must have the MANAGE_ROLES permission in this discord server to use this command!");

		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
		if(!toMute) return message.channel.send("You did not mention a user or specify their ID.");

		if(toMute.id === message.author.id) return message.channel.send("<:no:408996763748270080> Made a mistake somewhere have we?");
		if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send(":radioactive: You cannot mute a user who has a higher role than you or has the same role as you.")

		let role = message.guild.roles.find(r => r.name === "Muted");
		if(!role) {
				try {
				role = await message.guild.createRole({
					name: "Muted",
					color: "#000001",
					permissions: []
				});

			  	message.guild.channels.forEach(async (channel, id) => {
			  		await channel.overwritePermissions(role, {
			  			SEND_MESSAGES: false,
			  			ADD_REACTIONS: false,
			  			CREATE_INSTANT_INVITE: false
			  		});
			  	});			
			} catch(e) {
				console.log(e.stack);
			}
		}	
		
		if(toMute.roles.has(role.id)) return message.channel.send(`:radioactive: Member **${toMute.user.tag}** is already muted!`);

		client.mutes[toMute.id] = {
			guild: message.guild.id,
			time: Date.now() + parseInt(args[1]) * 1000
		}

		await toMute.addRole(role);
		

		fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
			if(err) throw err;
			message.channel.send(`<:yes:408996738217541632> Succesfully muted **${toMute.user.tag}**.`);
		});


}
