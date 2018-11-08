const db = require('quick.db')

exports.run = (bot, message, args, func) => {

    let channel
    let dmText
    let joinText
    let leaveText

    db.fetchObject(`messageChannel_${message.guild.id}`).then(channelIDFetched => {

        if (!message.guild.channels.get(channelIDFetched.text)) channel = '*none*'
        else channel = message.guild.channels.get(channelIDFetched.text)

        db.fetchObject(`joinMessageDM_${message.guild.id}`).then(joinDMFetched => {

            if (!joinDMFetched.text) dmText = '*none*'
            else dmText = joinDMFetched.text

            db.fetchObject(`joinMessage_${message.guild.id}`).then(joinTextFetched => {

                if (!joinTextFetched.text) joinText = '*none*'
                else joinText = joinTextFetched.text

                db.fetchObject(`leaveMessage_${message.guild.id}`).then(leaveTextFetched => {

                    if (!leaveTextFetched.text) leaveText = '*none*'
                    else leaveText = leaveTextFetched.text

                    let response = `**Logging Channel**\n > ${channel}\n\n`
                    response += `**Welcome DM Text**\n > ${dmText}\n\n`
                    response += `**Welcome Channel Text**\n > ${joinText}\n\n`
                    response += `**Leave Channel Text**\n > ${leaveText}\n\n`

                    func.embed(message.channel, response)

                })


            })

        })

    })

}
