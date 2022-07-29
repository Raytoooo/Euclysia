const Discord = require("discord.js");
const Command = require("../Structure/Command");

module.exports = new Command({

    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    utilisation: "clear [nombre de messages]",
    permission: "Gérer les messages",
    category: "Moderation",
    cooldown: 10,
    
    async run(bot,message,args,db) {
        try {
        //    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Vous n'avez pas la permission requise d'exécuter cette commande.");

            let number = args[0]  || args._hoistedOptions[0].value
            if(isNaN(number)) return message.reply("Veuillez indiquer un nombre entre `0` et `100` !");
            if(parseInt(number) <= 0 || parseInt(number) > 100)  return message.reply("Veuillez indiquer un nombre entre `0` et `100` !");

            try{await message.delete()} catch(err) {  }

            message.channel.bulkDelete(number).catch(async err => {
            if(err) return message.reply("Les messages datent de plus de 14 jours !")

            }).then(async msg => {
                try {


                    let messageReply = await message.reply(`${message.author === undefined ? message.user : message.author} a supprimé \`${msg.size}\` message avec succès !`)
                    var delayInMilliseconds = 5000; //1 second

                    setTimeout(function() {
                        messageReply.delete();
                    }, delayInMilliseconds);


                } catch(err) {
                    let messageReply = await message.channel.send(`${message.author === undefined ? message.user : message.author} a supprimé \`${msg.size}\` message avec succès !`)
                    var delayInMilliseconds = 5000; //1 second

                    setTimeout(function() {
                        messageReply.delete();
                    }, delayInMilliseconds);

                }
            }) 
            
        } catch(err) {
            return message.reply("Veuillez indiquer un nombre entre `0` et `100` !");
        }
    }

})