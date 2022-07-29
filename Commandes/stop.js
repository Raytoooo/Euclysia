const Discord = require("discord.js");
const Command = require("../Structure/Command")

module.exports = new Command({
    name:"stop",
    description:"Permet d'arrêter le bot.",
    utilisation: "restart",
    permission: "Développeur",
    category: "System",
    cooldown: 10,
    
    async run(bot, message, args, db){

        await message.reply("Au revoir ! Arrêt du bot...")

        await require("child_process").execSync("pm2 stop EuclysiaBot")

    }

})