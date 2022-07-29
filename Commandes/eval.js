const Discord = require("discord.js");
const Command = require("../Structure/Command")

module.exports = new Command({
    name:"eval",
    description:"Permet d'évaluer un code.",
    utilisation: "eval [code]",
    permission: "Développeur",
    category: "System",
    cooldown: 0,

    async run(bot, message, args, db){

        const code = message.user ? args._hoistedOptions[0].value : args.slice(0).join(" ")

        if(!code) return message.reply("Veuillez indiquer un code !")


        try {
            let output = eval(code)
            if(typeof output !== 'string') output = require("util").inspect(output, {depth:0})
            
            if(output.includes(bot.token)) return message.reply("Vous ne pouvez pas obtenir le token du bot !")

            let Embed = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setTitle("Evaluation d'un code")
            .setTimestamp()
            .setDescription(`Entrée: \`\`\`js\n ${code} \`\`\`\n Sortie  :  \`\`\`js\n ${output} \`\`\``)
            .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic : true}) : message.author.displayAvatarURL({dynamic:true}))
        
            message.reply({embeds : [Embed]})
        } catch(err) {


            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle("Evaluation d'un code")
            .setTimestamp()
            .setDescription(`Entrée: \`\`\`js\n ${code} \`\`\`\n Sortie  :  \`\`\`js\n ${err} \`\`\``)
            .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic : true}) : message.author.displayAvatarURL({dynamic:true}))
        
            message.reply({embeds : [Embed]})
        }
    }

})