const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {

    // Kick
    if (message.content.startsWith(`${prefix}kick`)) {
        // Check kick permissions.
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            let member = message.mentions.members.first()
            member.kick().then((member) => {
                message.channel.send("Yes master, " + member.displayName + " has been kicked.")
            }).catch(() => {
                message.channel.send("I am unable to kick " + member.displayName + ", I am inferior.")
            })
        }
    } else {
        message.channel.send(member.displayName + " stop talking to me, you pleb.")
    }

    //console.log(message.content)
    // message.channel.send("Kick")
})

client.login(token)

