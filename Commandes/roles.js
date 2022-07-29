const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "roles",
    description: "Permet d'envoyer l'embed des roles",
    utilisation: "",
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "Roles",
    cooldown: 10,

    async run(bot, message, args, db) {



        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Rôles de notifications")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Veuillez choisir les rôles de notifications que vous voulez dans le menu déroulant ci-dessous.")
        .setTimestamp()
        .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const menu = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
        .setCustomId("menu")
        .setMaxValues(3)
        .setMinValues(0)
        .setPlaceholder("Nous attendons votre choix !")
        .addOptions([{label: "Giveaway", description: "Rôle de notification pour les giveaways", emoji: "🎉", value: "giveaway"}, {label: "Annonces", description: "Rôle de notification pour les annonces", emoji: "📢", value: "annonce"}, {label: "Partenariat", description: "Rôle de notification pour les partenariats", emoji: "🤝", value: "partenariat"}]))

        let channel = bot.channels.cache.get("989503855115001916")
        try {
            await channel.bulkDelete(100)
        } catch (err) {}


     //   message.author ? await message.delete() : await message.deferReply() && await message.deleteReply();
        let msg = await message.channel.send({embeds: [Embed], components: [menu]})

        const filter = async() => true;
        const collector = msg.createMessageComponentCollector({filter})

        collector.on("collect", async menu => {

            let giveawayrole = channel.guild.roles.cache.get("989504468980744262")
            let annoncerole = channel.guild.roles.cache.get("989504497506205756")
            let partenariatrole = channel.guild.roles.cache.get("989504435065618432")

            for(let i = 0; i < menu.values.length; i++) {
                if(menu.values[i] === "giveaway") menu.member.roles.add(giveawayrole.id)
                if(menu.values[i] === "annonce") menu.member.roles.add(annoncerole.id)
                if(menu.values[i] === "partenariat") menu.member.roles.add(partenariatrole.id)
            }

            if(menu.member.roles.cache.has(annoncerole.id) && !menu.values.includes("annonce")) menu.member.roles.remove(annoncerole.id)
            if(menu.member.roles.cache.has(giveawayrole.id) && !menu.values.includes("giveaway")) menu.member.roles.remove(giveawayrole.id)
            if(menu.member.roles.cache.has(partenariatrole.id) && !menu.values.includes("partenariat")) menu.member.roles.remove(partenariatrole.id)

            menu.reply({content: "Vos rôles ont été modifiés !", ephemeral: true})
        })

    }
})

