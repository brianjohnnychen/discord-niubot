const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

// Initial setup.
const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!')

    // Set bot activity.
    client.user.setActivity('with himself')
})

// Read and process commands starting with prefix.
client.on('message', message => {

    // Retrieve person who sent command.
    const member = message.mentions.members.first()
    // Change all messages to lowercase before parsing.
    const messageContent = message.content.toLowerCase()

    // Show all available commands.
    if (messageContent.startsWith(`${prefix}help`) || messageContent.startsWith(`${prefix}bot`)) {
        message.channel.send(
            "Things I'm willing to do for you:\n" +
            "1. niuKick @member"
        )
        // Set new playing with to whoever talked to him.
        client.user.setActivity(`with ${message.member.displayName}`)
    }

    // Kick
    if (messageContent.startsWith(`${prefix}kick`)) {
        // Check kick permissions.
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            // To patch member.kick() undefined.
            if (member) {
                member.kick().then((member) => {
                    message.channel.send("Yes master, " + member.displayName + " has been kicked.")
                })
            } else {
                message.channel.send("I am unable to kick " + member.displayName + ", I am inferior.")
            }
        } else {
            message.channel.send("Don't tell me what to do, you pleb.")
        }

        // Set new playing with to whoever talked to him.
        client.user.setActivity(`with ${message.member.displayName}`)
    }

    // Reset Niubot to play with himself. Timer in milliseconds, (1000 ms = 1 second).
    setTimeout(function() {
        client.user.setActivity('with himself')
    }, 60000)
})

// Log into local Discord with Niubot token. Need config.json file to have token access.
client.login(token)