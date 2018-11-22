const Discord = require('discord.js');

exports.run = (client, message, args, func) => {
    if(message.author.id !== "295978095129657355") return;
    
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setColor(0x9F45FF)
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
        message.react("✅")
    } catch(e) {
        message.react("❌")
        message.channel.send(`🆘\`ERROR\` \`\`\`js\n${e}\n\`\`\``);
    }
}