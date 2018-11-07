const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.on("ready", () => {
  console.log(`Launched. Defined as BOT. Username is ${client.user.username}.`);
});

const prefix = "m!";

client.on("message", (message) => {
  const args = message.content.split(" ").slice(1);

  if(message.content === "wat") {
    message.channel.send("Say what?"); 
  }

  if(message.content === "gg") {
    message.channel.send("Well done.");
  }

    if (message.content.startsWith("m!" + "rs")) {
    if(message.author.id !== "295978095129657355") return;
    switch(message.content.toLowerCase()) {
        case 'm!rs':
            resetBot(message.channel);
            break;
    }
};

function resetBot(channel) {
    message.channel.send('πx6÷2149-54+2948')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.BOT_TOKEN));
}

if (message.content.startsWith("m!" + "deadify")) {
  if(message.author.id !== "295978095129657355") return;
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

  if (message.content.startsWith("m!" + "skarff")) {
    if(message.author.id !== "295978095129657355") return;
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
    message.channel.send("<@270252850121146369>")
  }

  msg = message.content.toLowerCase();

  if (message.author.bot) return;

  mention = message.mentions.users.first();

  if (message.content.startsWith("m!" + "send")) {
    if (mention == null) { return; }
    message.delete();
    mentionMessage = message.content.slice (8);
    mention.send (mentionMessage);
  }

  if (message.content.startsWith("m!" + "eval")) {
    if(message.author.id !== "295978095129657355") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`:sos:\`ERROR:\` \`\`\`xl\n${clean(err)}\n\`\`\``);
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

client.login(process.env.BOT_TOKEN);
