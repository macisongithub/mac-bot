const db = require('quick.db')

exports.run = (client, message, args, func) => {

    if (!message.member.roles.find('name', '+')) return func.embed(message.channel, '**This command requires you to have the + role.**', 120000)
    if (!message.mentions.channels.first() && args.join(" ").toLowerCase() !== 'none') return func.embed(message.channel, '**Please specify a channel.**\n > *m!setchannel <#channel>*')

    let newChannel;
    if (args.join(" ").toLowerCase() === 'none') newChannel = '';
    else newChannel = message.mentions.channels.first().id;

    db.updateText(`messageChannel_${message.guild.id}`, newChannel).then(i => {
        func.embed(message.channel, `**Updated logging channel to ${message.mentions.channels.first()}**`)
    })

}
