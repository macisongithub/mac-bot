exports.run = (client, message, args, func) => {

	async function purge() {
            message.delete(); 

            if (!message.member.roles.find("name", "+")) {
                message.channel.send('You need the \`+\` role to use this command.');
                return;
            }

            if (isNaN(args[0])) {

                message.channel.send('Please use a number as your argument. \n Usage: ' + prefix + 'purge <amount>'); // \n means new line.

                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages found, deleting.');

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

        }

        purge();
}