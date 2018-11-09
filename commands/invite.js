const Discord = require('discord.js');

exports.run = (client, message, args, func) => {

            const embed = new Discord.RichEmbed()
                .setAuthor("invite me pls")
                .setColor(0x9F45FF)
                .setDescription("You want to invite my bot to your server? here you go kthxbye https://discordapp.com/oauth2/authorize?client_id=379184816069017601&scope=bot&permissions=2146958591")
                .setThumbnail("https://cdn.discordapp.com/attachments/376764803596943383/414762325229305866/JPEG_20180211_191145.jpg")

                message.channel.send({embed});
}
