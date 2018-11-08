const Discord = require('discord.js');

exports.run = (client, message, args, func) => {

            const embed = new Discord.RichEmbed()
                .setAuthor("Join our discord!")
                .setColor(0x9F45FF)
                .setDescription("https://discord.gg/6PFN5f9")
                .setThumbnail("https://cdn.discordapp.com/attachments/376764803596943383/414762325229305866/JPEG_20180211_191145.jpg")

                message.channel.send({embed});
}
