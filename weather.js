const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (bot, message, args, func) => {

	weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);

            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a valid location.**')
                return;
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather from ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x9F45FF)
                .addField('Timezone',`GMT +${location.timezone}`, true)
                .addField('Wind',`${current.winddisplay}`, true)
                .addField('Temperature',`${current.temperature} °C`, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .addField('Cloudiness', `${current.cloudiness}`, true)

                message.channel.send({embed});
        });
}
