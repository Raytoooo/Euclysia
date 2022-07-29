const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command");

module.exports = new Command({
    name:"unban",
    description:"permet de bannir un utilisateur !",
    utilisation: "ban [id] (raison)",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "Modération",
    cooldown: 10,

    async run(bot,message,args,db) {
        let user = message.user ? args._hoistedOptions[0].value : args[0]
        if(!user) return message.reply("Aucune personne trouvée !")

        let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
        if(!reason) reason = "Aucune raison donnée";

        if((await message.guild.bans.fetch(message.user ? args._hoistedOptions[0].value : args[0])).size === 0) return message.reply("Aucune personne trouvée dans les bannissements !")

        await message.reply(`${(await bot.users.fetch(message.user ? args._hoistedOptions[0].value : args[0])).tag} a été débanni par ${message.user === undefined ? message.author.tag : message.user.tag} pour la raison ${reason} avec succès !`)
        
        message.guild.members.unban(message.user ? args._hoistedOptions[0].value : args[0])

    }
})