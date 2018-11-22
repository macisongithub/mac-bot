const db = require('quick.db')

exports.run = (client, message, args, func) => {

    let channel
    let dmText
    let joinText
    let leaveText

    let channelIDFetched = db.fetch(`messageChannel_${message.guild.id}`)

        if (!message.guild.channels.get(channelIDFetched)) channel = '*none*'
        else channel = message.guild.channels.get(channelIDFetched)

    let joinDMFetched = db.fetch(`joinMessageDM_${message.guild.id}`)

            if (!joinDMFetched) dmText = '*none*'
            else dmText = joinDMFetched

    let joinTextFetched = db.fetch(`joinMessage_${message.guild.id}`)

                if (!joinTextFetched) joinText = '*none*'
                else joinText = joinTextFetched

    let leaveTextFetched = db.fetch(`leaveMessage_${message.guild.id}`)
                    if (!leaveTextFetched) leaveText = '*none*'
                    else leaveText = leaveTextFetched

                    let response = `**Logging Channel**\n > ${channel}\n\n`
                    response += `**Welcome DM Text**\n > ${dmText}\n\n`
                    response += `**Welcome Channel Text**\n > ${joinText}\n\n`
                    response += `**Leave Channel Text**\n > ${leaveText}\n\n`

                    func.embed(message.channel, response)
}