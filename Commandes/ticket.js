const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "ticket",
    description: "Permet d'envoyer l'embed des tickets",
    utilisation: "",
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "Moderation",
    cooldown: 10,

    async run(bot, message, args, db) {
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply("Vous n'avez pas la permission requise d'exécuter cette commande.");

        let Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commander 🛒')
        .setAuthor({ name: 'Équipe Euclysia'})
        .setDescription("Vous souhaitez commencer un projet avec nous ?")
       // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", value:"⠀"},
        //    { name: '\u200B', value: '\u200B' },
            { name: 'Étape 1', value: 'Remplissez notre formulaire', inline: true },
            { name: 'Étape 2', value: 'Échangez avec un développeur', inline: true },
        )
        .addFields(
            {name: 'Étape 3', value:'Passez commande !', inline: true},
            {name: '\u200B', value: '\u200B' },
            {name: "Créer un ticket ne vous engage __pas__ à acheter.", value:"⠀"},
                    )


        .setImage('https://www.zupimages.net/up/22/25/nlv8.png')
        .setTimestamp()
        .setFooter({ text: "Consultez notre site web pour plus d'informations", iconURL: 'https://static.vecteezy.com/system/resources/previews/005/747/906/original/info-icon-template-information-icon-colorful-free-vector.jpg' });
/*
        .setColor(bot.color)
        .setTitle(`Tickets`)
        .setDescription("Appuyer sur le bouton ci-dessous pour ouvrir un  ticket")
        .setTimestamp()
        .setImage("https://www.zupimages.net/up/22/25/nlv8.png")
        .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})*/

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Commander")
        .setEmoji("📩")
        .setCustomId("ticket"),
        new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Informations")
        .setEmoji("🔰")
        .setCustomId("info"),
        new Discord.MessageButton()
        .setStyle("LINK")
        .setLabel("Site")
        .setEmoji('🌐')
        .setURL("https://www.lowarya.net"))


        message.author ? await message.delete() : await message.deferReply() && await message.deleteReply();
        await message.channel.send({embeds: [Embed], components: [btn]});
    }
})