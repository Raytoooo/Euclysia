const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({
    name: "suggest",
    description: "Permet de créer une suggestion",
    utilisation: "suggest [create] [idée]",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "Community",
    cooldown: 10,

    async run(bot, message, args, db) {
        if(message.channel.id !== "990251722188394496") return message.delete()
        if(!args[0]) return message.delete()
        
        try {
            let number = args[0]  || args._hoistedOptions[0].value
            
            let user = message.user ? message.user : message.author        
            let username = message.user ? message.user.username : message.author.username        
            let idea = message.user === undefined ? args.slice(0).join(" ") : args._hoistedOptions[0].value;

            
            let Embed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setAuthor({name: `${username}`, iconURL: user.displayAvatarURL({dynamic: true})})
                .addFields(
                    { name: `\u200B`, value: `« ${idea} »` },

                    { name: '\n⠀\nStatut :', value: 'En attente \n ⠀', inline: true },
                )
                .setFooter({text: `PRO TIPS: Vous pouvez voter par les réactions ci-dessous !`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.channel.send({embeds: [Embed]}).then(function(message) {
                message.react("👍")
                message.react("👎")
            })
            message.delete()
  

        } catch (err) {
            console.log(err)
            message.reply({content: "Merci de mettre une suggestion =)", ephemeral: true})

            message.delete()


        
        }

    }
})