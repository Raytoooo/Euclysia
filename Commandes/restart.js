const Discord = require("discord.js");
const Command = require("../Structure/Command")

module.exports = new Command({
    name:"restart",
    description:"Permet de redémarrer le bot.",
    utilisation: "restart",
    permission: "Développeur",
    category: "System",
    cooldown: 10,
    
    async run(bot, message, args, db){

        await message.reply("Le bot a redémarré avec succès !")

        await require("child_process").execSync("pm2 restart EuclysiaBot")

    }

})