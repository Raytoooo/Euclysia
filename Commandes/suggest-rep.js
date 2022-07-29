const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({
    name: "suggest-rep",
    description: "Permet de changer le statut d'une suggestion",
    utilisation: "suggest [id] [raison]",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "Community",
    cooldown: 1,

    async run(bot, message, args, db) {
        if(message.channel.id !== "994006336897556500") return message.delete()

        let suggest_channel = message.guild.channels.cache.get("990251722188394496")

        if (!args[0]) return message.reply('Spécifier accept/deny');
        if (!args[1]) return message.reply('Spécifier id');


        try {
            let status = "En attente"
            let color = "GREY"
            let reason = 'Aucune raison spécifiée'
            if(args[0] === "accept") status = "Accepté", color = "GREEN"
            if(args[0] === "deny") status = "Refusé", color = "RED"
            if(args[2]) reason = args.slice(2).join(" ") 


            const suggest_message = await suggest_channel.messages.fetch(args[1])

            suggest_message.embeds.forEach((embed) => {

                 const exampleEmbed = new Discord.MessageEmbed()
                .setAuthor({name: `${embed.author.name}`, iconURL: `${embed.author.iconURL}`})

                .setColor(color)
                .addFields(
                    { name : embed.fields[0].name, value: embed.fields[0].value},

                    { name: `${embed.fields[1].name} :`, value: `${status} \n⠀`, inline: true },

                    { name: "\n Raison :", value: reason, inline: false },

                )
                suggest_message.edit({ embeds: [exampleEmbed] }); 


            });

        

            message.reply("Edited.")

        } catch(err) {
            console.log(err.stack);

            message.reply("Message introuvable.")
        }

        
    }
})