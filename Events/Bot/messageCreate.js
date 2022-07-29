const Discord = require("discord.js");
const Event = require("../../Structure/Event")

module.exports = new Event("messageCreate", async (bot, message) => {
    const db = bot.db;
    if(message.guildId === null ) return;
    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guildId}`, async (err, req) => {

        if(req.length < 1) {
            let sql = `INSERT INTO serveur (guildID, prefix, captcha) VALUES (${message.guildId}, '!', 'off')`
            db.query(sql, function(err){
                if(err) throw err;

            })
            return message.reply("Attendez que le bot enregistre le serveur.")
        }


        let prefix = req[0].prefix

        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        let commandFile = bot.commands.get(command.slice(prefix.length));

        if(!message.content.startsWith(prefix)) return;
        if(!commandFile) return message.reply(`Cette commande n'existe pas !`);

        if(!bot.cooldown.has(commandFile.name)) {
            bot.cooldown.set(commandFile.name, new Discord.Collection())
        }

        const time = Date.now();
        const cooldown = bot.cooldown.get(commandFile.name);
        const timeCooldown = (commandFile.cooldown || 5) * 1000;

        if(cooldown.has(message.author.id)) {

            const timeRestant = cooldown.get(message.author.id) + timeCooldown;

            if(time < timeRestant) {

                const timeLeft = (timeRestant - time);

                return message.reply(`Vous devez attendre ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60 * 24) % 30))}\`` + ` jour(s) ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60)))}\`` + ` heure(s) ` + `\`${(Math.round(timeLeft / (1000 * 60) % 60))}\`` + ` minute(s) ` + `\`${(Math.round(timeLeft / 1000 % 60))}\`` + ` seconde(s) pour exécuter cette commande !`)
            }
        }

        cooldown.set(message.author.id, time);
        setTimeout(() => cooldown.delete(message.author.id), timeCooldown);

        if(commandFile.permission === "Développeur" &&  message.author.id !== "646008712099528705") return interaction.reply(`Vous n'avez pas la permission requise pour exécuter cette commande. `)

        if(!(commandFile.permission !== "Aucune") && command.permission !== "Développeur" &&  !interaction.member.permissions.has(Discord.Permissions(commandFile.permission))) return message.reply("Vous n'avez pas la permission d'exécuter cette commande.");

        
        commandFile.run(bot, message, args, db);
    })

})