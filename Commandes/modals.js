const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command");

module.exports = new Command({
    name:"modals",
    description:"permet de tester modals !",
    utilisation: "modals",
    permission: Discord.Permissions.FLAGS.MODERATE_MEMBERS,
    category: "Modération",
    cooldown: 10,

    async run(bot, message, args, db) {
        if(message.author) return;
        let question1 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
        .setCustomId("pseudo")
        .setLabel("Quel est ton pseudo ?")
        .setRequired(true)
        .setPlaceholder("Rayto le bo")
        .setStyle("SHORT")
        )
        
        let question2 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
        .setCustomId("budget")
        .setLabel("Quel est ton budget?")
        .setRequired(true)
        .setPlaceholder("200millions de DOLLARD")
        .setStyle("SHORT")
        )

        let question3 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
        .setCustomId("description")
        .setLabel("Décrivez-nous votre commande ?")
        .setRequired(true)
        .setPlaceholder("Je veux une fusée pliable")
        .setStyle("SHORT")
        )
        
        let Modal = new Discord.Modal()
        .setCustomId("Modal")
        .setTitle("Test de formualire")
        .addComponents(question1, question2, question3)

        await message.showModal(Modal)

        try {
            let response = await message.awaitModalSubmit({time: 300000})

            let pseudo = response.fields.getTextInputValue("pseudo")
            let budget = response.fields.getTextInputValue("budget")
            let description = response.fields.getTextInputValue("description")

           // await response.reply({content: "Votre modals a été envoyé avec succès", ephemeral: true})

            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle(`Modals de ${message.user.username}`)
            .addField("Pseudo : ", `${pseudo}`)
            .addField("Budget : ", `${budget}`)
            .addField("Description : ", `${description}`)

            await bot.channels.cache.get("979765579214909492").send({embeds: [Embed]})


        }catch(err){
            throw err        
        }

    }
})