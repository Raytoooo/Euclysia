const Discord = require("discord.js")
const Command = require("../Structure/Command");
const createID = require("../Fonctions/createID");

module.exports = new Command({
    name:"kick",
    description:"Permet d'expulser un utilisateur !",
    utilisation: "kick [membre] (raison)",
    permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
    category: "Modération",
    cooldown: 10,
    
    async run(bot,message,args,db) {
        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value);
        if(!user) return message.reply("Aucune personne trouvée !");

        let reason = message.user === undefined ? args.slice(1).join(" ") : args._hoistedOptions[1].value;
        if(!reason) reason = "Aucune raison donnée";

        if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply("Vous ne pouvez pas vous expulser vous même.")
        if(user.id === message.guild.ownerId) return message.reply("Vous ne pouvez pas expulser cette personne !")

        if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply("Vous ne pouvez pas expulser cette personne.")

        const ID = await bot.function.createID("KICK");

        try{
            await user.send(`${message.user === undefined ? message.author.tag : message.user.tag} vous a expulsé du serveur ${message.guild.name} pour la raison ${reason}`)
        } catch(err ){}

        await message.reply(`${user.tag} a été expulsé par ${message.user === undefined ? message.author.tag : message.user.tag} pour la raison ${reason} avec succès !`).then(async msg => {
            await message.guild.members.cache.get(user.id).kick({reason: `${reason} (Expulsé par par ${message.user === undefined ? message.author.tag : message.user.tag})`})

            if(reason.includes("'")) reason = reason.replace(/'/g, "\\'");
            const date = Date.now()
            let sql = `INSERT INTO kicks (userID, authorID, kickID, guildID, reason, date) VALUES ('${user.id}', '${message.user === undefined ? message.author.id : message.user.id}', '${ID}', '${message.guildId}', '${reason}', '${date}')`
            db.query(sql, function(err) {
                if(err) throw err;
            })
        })


    }
})