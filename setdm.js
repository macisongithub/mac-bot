const db = require('quick.db')

exports.run = (bot, message, args, func) => {

    if (!message.member.roles.find('name', 'Owner')) return func.embed(message.channel, '**This command requires you to have the Owner role**', 120000)
    if (!args.join(" ") && args.join(" ").toLowerCase() !== 'none') return func.embed(message.channel, '**Please provide a channel.**\n > *>>setdm <message>*')

    let newMessage;
    if (args.join(" ").toLowerCase() === 'none') newMessage = '';
    else newMessage = args.join(" ").trim();

    db.updateText(`joinMessageDM_${message.guild.id}`, newMessage).then(i => {
        func.embed(message.channel, `**Updated DM welcome text to:**\n > *${args.join(" ").trim()}*`)
    })

}