const yt = require('ytdl-core');

exports.run = (bot, message, args, func) => {

	 if (!message.member.roles.find("name", "DJ")) {
                message.channel.send('You need the \`DJ\` role to use this command. This command is broken.');
                return;
 }

	 const voiceChannel = message.member.voiceChannel;
	 if (!voiceChannel){
		 return message.channel.send("You must be in a voice channel!");
	 }
 message.channel.send("<:yes:408996738217541632> **Connected!**");
	 voiceChannel.join()
	 .then(connection => {
 const args = message.content.split(" ").slice(1);
		 let stream = yt(args.join(" "), {audioonly: true});
		 yt.getInfo(args.join(" "), function(err, info) {
		 const title = info.title
	 message.channel.send(`Now playing \`${title}\``)
		 })
		 const dispatcher = connection.playStream(stream);
		 dispatcher.on('end', () => {
				voiceChannel.leave();
			}).catch(e =>{
				console.error(e);
			});
	 })
}
