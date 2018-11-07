const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');

const config = require("./config.json");

const func = require('./functions.js');
console.log(func)

const commands = JSON.parse(fs.readFileSync('Storage/commands.json', 'utf8'));

const prefix = config.prefix;

bot.mutes = require("./mutes.json");

bot.on('message', message => {

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
    db.updateValue(message.author.id + message.guild.id, 1).then(i => {

        let messages;
        if (i.value == 25) messages = 25;
        else if (i.value == 50) messages = 50;
        else if (i.value == 75) messages = 75;

        if (!isNaN(messages)) {
            db.updateValue(`userLevel_${message.author.id + message.guild.id}`, 1).then(o => {
                message.channel.send(`You leveled up! You are now level ${o.value}.`)
            })
        }

    })

    if (!message.content.startsWith(prefix)) return;

    // Command Handler
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(bot, message, args, func);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.username} ran the command: ${cmd}`);
    }

});

bot.on('ready', () => {

    console.log(`Launched. Defined as BOT. Username is ${bot.user.username}.`);

    bot.user.setStatus('online')
    bot.user.setGame(`m!help | ${bot.guilds.size} servers`)

    bot.setInterval(() => {
        for(let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildId = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`)
            
                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw err;
                    console.log(`Successfully unmuted ${member.user.tag}.`)
                })
            }
        }
    }, 5000)

});

bot.on("guildCreate", guild => {

  bot.guilds.get("387623524891623434").channels.get("393076814769160195").send(`:envelope_with_arrow: OAuth joined ${guild.name} (${guild.id}). I am now in ${bot.guilds.size}.`);
  bot.user.setGame(`>>help | ${bot.guilds.size} servers`);
});

bot.on("guildDelete", guild => {

  bot.guilds.get("387623524891623434").channels.get("393076814769160195").send(`:leaves: Left ${guild.name} (${guild.id}). I am now in ${bot.guilds.size}.`);
  bot.user.setGame(`>>help | ${bot.guilds.size} servers`);
});

bot.on('guildMemberAdd', member => {

    db.fetchObject(`autoRole_${member.guild.id}`).then(i => {

        if (!i.text || i.text.toLowerCase() === 'none');
        else {

            try {
                member.addRole(member.guild.roles.find('name', i.text))
            } catch (e) {
                console.log("A guild tried to auto-role an invalid role to someone.")
            }

        }


        db.fetchObject(`messageChannel_${member.guild.id}`).then(i => {

            db.fetchObject(`joinMessageDM_${member.guild.id}`).then(o => {

                if (!o.text) console.log('Error: Join DM Message not set. Please set one using m!setdm <message>');
                else func.embed(member, o.text.replace('{user}', member).replace('{members}', member.guild.memberCount))

                if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using m!setchannel <#channel>')

                db.fetchObject(`joinMessage_${member.guild.id}`).then(p => {

                    if (!p.text) console.log('Error: User Join Message not found. Please set one using m!setwelcome <message>')
                    else func.embed(member.guild.channels.get(i.text), p.text.replace('{user}', member).replace('{members}', member.guild.memberCount))

                })

            })

        })

    })

    bot.on('guildMemberRemove', member => {

        db.fetchObject(`messageChannel_${member.guild.id}`).then(i => {

            if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using >>setchannel <#channel>')

            db.fetchObject(`leaveMessage_${member.guild.id}`).then(o => {

                if (!o.text) console.log( 'Error: User leave message not found. Please set one using >>setleave <message>')
                else func.embed(member.guild.channels.get(i.text), o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // Now, send the message.

            })

        })

    })

})

bot.on('messageDelete', async (message) => {
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

bot.login(config.token)
