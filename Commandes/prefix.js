const Discord = require("discord.js");
const Command = require("../Structure/Command")

module.exports = new Command({
    name:"prefix",
    description:"Permet de changer le prefix",
    utilisation: "prefix",
    permission: "Administrateur",
    category: "System",
    cooldown: 10,
    
    async run(bot, message, args, db){

        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply("Vous n'avez pas la permission requise pour exécuter cette commande.");
        }

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err,req) => {
            try {
                let prefix = args[0]  || args._hoistedOptions[0].value;
    
                const ancienprefix = req[0].prefix;
                db.query(`UPDATE serveur SET prefix = '${prefix}' WHERE guildID = ${message.guild.id}`);
    
                message.reply(`Vous avez modifié le prefix, désormais le prefix est \`${prefix}\` !`);
            } catch (err) {
                return message.reply("Veuillez indiquer un prefix !");
            }

        })
    }
})