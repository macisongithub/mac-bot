module.exports = {

    ping: function(channel) {
        channel.send(new Date().getTime() - message.createdTimestamp + " ms");
    },

    hook: function(channel, title, message, color, avatar) {

        if (!channel) return console.log('Channel not specified.');
        if (!title) return console.log('Title not specified.');
        if (!message) return console.log('Message not specified.');
        if (!color) color = '9F45FF';
        if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png'

        color = color.replace(/\s/g, '');
        avatar = avatar.replace(/\s/g, '');

        channel.fetchWebhooks()
            .then(webhook => {

                let foundHook = webhook.find('name', 'Midnight');

                if (!foundHook) {
                    channel.createWebhook('Midnight', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                        .then(webhook => {

                            webhook.send('', {
                                "username": title,
                                "avatarURL": avatar,
                                "embeds": [{
                                    "color": parseInt(`0x${color}`),
                                    "description":message
                                }]
                            })
                                .catch(error => {
                                    console.log(error);
                                    return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                                })
                        })
                } else {
                    foundHook.send('', {
                        "username": title,
                        "avatarURL": avatar,
                        "embeds": [{
                            "color": parseInt(`0x${color}`),
                            "description":message
                        }]
                    })
                        .catch(error => {
                            console.log(error);
                            return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                        })
                    }

            })

    },

embed: function (channel, message, deleteTimer) {

    channel.send({
        embed:{
            description: message,
            color: 0x9F45FF
        }
    }).then(msg => {

        if (!isNaN(deleteTimer)) {
            msg.delete(deleteTimer)
        }
    })
  },

play : function (connection, message) {
    var server = servers[message.guild.id];

    nowplaying[message.guild.id] = server.queue.shift();
    var video = nowplaying[message.guild.id];

    var iconurl = bot.user.avatarURL;
    var embed = new Discord.RichEmbed()
        .setAuthor("Music", iconurl)
        .setColor([0, 255, 0])
        .setDescription("**Now Playing:**\n" +
        video.title)
        .setThumbnail(video.thumbnail)
    message.channel.send(embed);

    server.dispatcher = connection.playStream(YTDL(video.url, { filter: "audioonly" }));
    if (volume[message.guild.id])
        server.dispatcher.setVolume(volume[message.guild.id]);

    server.dispatcher.on("end", function () {
        nowplaying[message.guild.id] = null;
        if (server.queue.length > 0)
            play(connection, message);
        else {
            connection.disconnect();
            server.dispatcher = null;
        }
    });
}
}
