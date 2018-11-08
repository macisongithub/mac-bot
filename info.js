exports.run = (client, message, args, func) => {

    message.channel.send({embed:{
        title:"Midnight",
        description:"Information about me",
        color: 0x9F45FF,
        fields:[
          {
              name:"About me",
              value:"Hello. I'll introduce myself to people who do not know who I am. I am Midnight. I have been created to serve discord servers. I can help you moderate your discord server to keep it troll-free.",
              inline:false
          },
          {
              name:"Announcement",
              value:"No announcement for now.",
              inline:false
          },
          {
            name:"Usage",
            value:"m!help",
            inline:false
          },
          {
            name:"Information",
            value:"- Developed by MaC#8311",
            inline:false
          },

        ],
        timestamp: new Date(),
        footer: {
          footer:'Made with ♥ by MaC.'
        }
    }})
}
