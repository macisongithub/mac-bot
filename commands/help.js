const Discord = require('discord.js');

exports.run = (client, message, args, func) => {

            const embed = new Discord.RichEmbed()
                .setAuthor("Help for the client")
                .setColor(0x9F45FF)
                .setDescription("This client is designed for stuff.")
                .addField("Can I get this in my server?", "No. It is only in specific servers allowed by MaC.")
                .addField("Commands", "m!commands")
                .setTimestamp()
                .setFooter("Made by MaC#8311.")
                .setThumbnail("https://content-8338.kxcdn.com/wp-content/uploads/2017/04/midnightdeer-01.png")

                message.channel.send({embed});
}