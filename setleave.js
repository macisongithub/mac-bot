const db = require('quick.db')

exports.run = (bot, message, args, func) => {

    if (!message.member.roles.find('name', 'Owner')) return func.embed(message.channel, '**This command requires you to have the Owner role.**', 120000)
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return func.embed(message.channel, '**Please provide a message.**\n > *>>setleave <message>*')

    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = '';
    else newMessage = args.join(" ").trim();

    db.updateText(`leaveMessage_${message.guild.id}`, newMessage).then(i => {
        func.embed(message.channel, `**Updated leave message to:**\n > *${args.join(" ").trim()}*`)
    })

}
