const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Launched. Defined as BOT. Username is ${client.user.username}.`);
});

const prefix = config.prefix;

client.on("message", async message => {
  if (message.author.bot) return;

  if(message.content === "wat") {
    message.channel.send("Say what?"); 
  }

  if(message.content === "gg") {
    message.channel.send("Well done.");
  }
  
  if(message.content === "<@&513835273763684403>") {
    message.channel.send("<@&513835273763684403>");
  }
  
  if(message.content === "<@&513864816004300801>") {
    message.channel.send("<@&513864816004300801>");
  }
  
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  client.guilds.get("494235134170628106").channels.get("513843535242592256").send("<@&513835273763684403>");
  
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");
  client.guilds.get("494235134170628106").channels.get("514518536991932448").send("<@&513864816004300801>");

  const args = message.content.split(" ").slice(1);

    if (message.content.startsWith(config.prefix + "rs")) {
    if(message.author.id !== config.ownerID) return;
    switch(message.content.toLowerCase()) {
        case 'm!rs':
            resetBot(message.channel);
            break;
    }
};

function resetBot(channel) {
    message.channel.send('πx6÷2149-54+2948')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.token));
}
  
if(message.content.startsWith(config.prefix + "serverinfo")) {
  let sicon = message.guild.displayAvatarURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Guild Info")
  .setColor(0x9F45FF)
  .setThumbnail(sicon)
  .addField("Guild Name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addfield(`{message.author.username} joined on, {message.member.joinedAt}`)
  .addField("Total Members", message.guild.memberCount);
  
  return message.channel.send(serverembed);
}
  
if(message.content.startsWith(config.prefix + "botinfo")) {
  let bicon = client.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setColor(0x9F45FF)
  .setThumbnail(bicon)
  .addField("Bot Name", client.user.username)
  .addField("Created On", client.user.createdAt);
  
  message.channel.send(botembed);
}
  
if(message.content.startsWith(config.prefix + "kick")) {
  let member = message.mentions.members.first();
  let reason = args.slice(1).join(" ");
  member.kick(reason);
}

if (message.content.startsWith(config.prefix + "deadify")) {
  if(message.author.id !== config.ownerID) return;
  switch(message.content.toLowerCase()) {
      case 'm!deadify':
          sleepBot(message.channel);
          break;
    }      
};

function sleepBot(channel) {
  message.channel.send('Commiting uninstall life.')
  .then(msg => client.destroy())
}

  if (message.content.startsWith(config.prefix + "skarff")) {
    if(message.author.id !== config.ownerID) return;
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
  }

  msg = message.content.toLowerCase();

  if (message.author.bot) return;

  mention = message.mentions.users.first();

  if (message.content.startsWith(config.prefix + "send")) {
    if (mention == null) { return; }
    message.delete();
    mentionMessage = message.content.slice (8);
    mention.send (mentionMessage);
  }

  if (message.content.startsWith(config.prefix + "eval")) {
    if(message.author.id !== config.ownerID) return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
        message.react("✅")
    } catch(e) {
    	message.react("❌")
        message.channel.send(`🆘\`ERROR\` \`\`\`js\n${e}\n\`\`\``);
    }
  }
});

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/``/g, "`" + String.fromCharCode(8203) + "`").replace(/@/g, "@" + String.fromCharCode(8203));
  } else if (text !== null && text !== undefined) {
    return text.toString().replace(/``/g, "`" + String.fromCharCode(8203) + "`").replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return text;
  }
}

client.login(process.env.token);
