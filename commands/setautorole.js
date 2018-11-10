const db = require('quick.db')

exports.run = (client, message, args, func) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires you to have a role with `Administrator`.')
    if (!args.join(" ")) return message.channel.send('Please enter the correct arguments. `setautorole <rolename>`')

    db.updateText(`autoRole_${message.guild.id}`, args.join(" ").trim()).then(i => {

        message.channel.send('Successfully changed auto-role to: `' + i.text + '`');

    })

}