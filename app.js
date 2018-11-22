const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const yt = require('ytdl-core');

const config = require("./config.json");

const func = require('./functions.js');
console.log(func)

const commands = JSON.parse(fs.readFileSync('Storage/commands.json', 'utf8'));

const prefix = config.prefix;

client.mutes = require("./mutes.json");

client.on('message', async message => {
    if (message.author.bot) return;

    const serverStats = {
        guildID: "387623524891623434",
        ticketCategoryID: "515255065011945472"
    }

    if (message.channel.type !== "text") {
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = client.guilds.get(serverStats.guildID);
        let channel, found = true;

        try {
            if (active) client.channels.get(active.channelID).guild;
        } catch (e) {
            found = false;
        }

        if (!active || !found) {
            active = {};
            channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`m!complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)
            
            let author = message.author;
            const newChannel = new Discord.RichEmbed()
            .setColor(0x9F45FF)
            .setAuthor(author.tag, author.avatarURL)
            .setFooter("Support Ticket Created")
            .addField("User", author)
            .addField("ID", author.id)

            await channel.send(newChannel);

            const newTicket = new Discord.RichEmbed()
            .setColor(0x9F45FF)
            .setAuthor(`Hello, ${author.tag}`, author.avatarURL)
            .setFooter("Support Ticket Created")

            await author.send(newTicket);

            active.channelID = channel.id;
            active.targetID = author.id;
        }

        channel = client.channels.get(active.channelID);
        
        const dm = new Discord.RichEmbed()
        .setColor(0x9F45FF)
        .setAuthor(`Thank you, ${message.author.tag}`, message.author.avatarURL)
        .setFooter(`Your message has been sent -- A staff member will be in contact with you soon.`)

        await message.author.send(dm);

        const embed = new Discord.RichEmbed()
        .setColor(0x9F45FF)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .setFooter(`Message Received -- ${message.author.tag}`)

        await channel.send(embed);
        
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id);
        return;
    }

    let support = await db.fetch(`supportChannel_${message.channel.id}`);

    if (support) {
        support = await db.fetch(`support_${support}`);
        
        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();

        if (message.content.toLowerCase() === "m!complete") {
            const complete = new Discord.RichEmbed()
            .setColor(0x9F45FF)
            .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
            .setFooter("Ticket Closed -- Midnight Support")
            .setDescription("*Your ticket has been marked as **complete**. If you wish to reopen this, or create a new one, please send a message to the bot.*")

            supportUser.send(complete);

            message.channel.delete();
            db.delete(`support_${support.targetID}`);

            let inEmbed = new Discord.RichEmbed()
                .setTitle('Ticket Closed')
                .addField('User', `${supportUser.tag}`)
                .addField('Support Member', message.author.tag)
                .setColor(0x9F45FF)
            const staffChannel = client.channels.get('501782028363235328');
            staffChannel.send(inEmbed);
        }

        const embed = new Discord.RichEmbed()
        .setColor(0x9F45FF)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setFooter(`Message Received -- Midnight Support`)
        .setDescription(message.content)

        client.users.get(support.targetID).send(embed)
        message.delete({timeout: 1000});

        embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);

        return message.channel.send(embed);
    }

    if(message.content === "wat") {
    message.channel.send("Say what?"); 
  }

  if(message.content === "gg") {
    message.channel.send("Well done.");
  }

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    // Message Leveling System
    const i = db.add(message.author.id + message.guild.id, 1)

        let messages;
        if (i.value == 25) messages = 25;
        else if (i.value == 50) messages = 50;
        else if (i.value == 75) messages = 75;

        if (!isNaN(messages)) {
        const o = db.add(`userLevel_${message.author.id + message.guild.id}`, 1)
                message.channel.send(`You leveled up! You are now level ${o.value}.`)
        }

    if (!message.content.startsWith(prefix)) return;

    // Command Handler
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, func);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.username} ran the command: ${cmd}`);
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

function resetBot(channel) {
    message.channel.send('πx6÷2149-54+2948')
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
}

function sleepBot(channel) {
    message.channel.send('Commiting stop living.')
    .then(msg => client.destroy())
  }

client.on('ready', async () => {

    console.log(`Launched. Defined as BOT. Username is ${client.user.username}.`);

    client.user.setStatus('online')
    client.user.setActivity(`m!help | ${client.guilds.size} servers`)

    client.setInterval(() => {
        for(let i in client.mutes) {
            let time = client.mutes[i].time;
            let guildId = client.mutes[i].guild;
            let guild = client.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`)
            
                member.removeRole(mutedRole);
                delete client.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(client.mutes), err => {
                    if(err) throw err;
                    console.log(`Successfully unmuted ${member.user.tag}.`)
                })
            }
        }
    }, 5000)

});

client.on("guildCreate", guild => {

  client.guilds.get("387623524891623434").channels.get("393076814769160195").send(`:envelope_with_arrow: OAuth joined ${guild.name} (${guild.id}). I am now in ${client.guilds.size}.`);
  client.user.setActivity(`m!help | ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  client.guilds.get("387623524891623434").channels.get("393076814769160195").send(`:leaves: Left ${guild.name} (${guild.id}). I am now in ${client.guilds.size}.`);
  client.user.setActivity(`m!help | ${client.guilds.size} servers`);
});

client.on('guildMemberAdd', member => {

    db.fetch(`autoRole_${member.guild.id}`).then(i => {

        if (!i.text || i.text.toLowerCase() === 'none');
        else {

            try {
                member.addRole(member.guild.roles.find('name', i.text))
            } catch (e) {
                console.log("A guild tried to auto-role an invalid role to someone.")
            }

        }


        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            db.fetch(`joinMessageDM_${member.guild.id}`).then(o => {

                if (!o.text) console.log('Error: Join DM Message not set. Please set one using m!setdm <message>');
                else func.embed(member, o.text.replace('{user}', member).replace('{members}', member.guild.memberCount))

                if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using m!setchannel <#channel>')

                db.fetch(`joinMessage_${member.guild.id}`).then(p => {

                    if (!p.text) console.log('Error: User Join Message not found. Please set one using m!setwelcome <message>')
                    else func.embed(member.guild.channels.get(i.text), p.text.replace('{user}', member).replace('{members}', member.guild.memberCount))

                })

            })

        })

    })

   client.on('guildMemberRemove', member => {

        db.fetch(`messageChannel_${member.guild.id}`).then(i => {

            if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using >>setchannel <#channel>')

            db.fetch(`leaveMessage_${member.guild.id}`).then(o => {

                if (!o.text) console.log( 'Error: User leave message not found. Please set one using >>setleave <message>')
                else func.embed(member.guild.channels.get(i.text), o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // Now, send the message.

            })

        })

    })

})

client.on('messageDelete', async (message) => {
  const logs = message.guild.channels.find(channel => channel.name === "logs");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions.')
  }  
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
})

client.login(config.token)