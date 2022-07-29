const Discord = require("discord.js")
const Canvas = require("canvas")
const Event = require("../../Structure/Event")
const { Captcha } = require("captcha-canvas")
const { MessageAttachment } = require("discord.js");


module.exports = new Event("guildMemberAdd", async (bot, member, guild) => {

    const db = bot.db;

    db.query(`SELECT * FROM serveur WHERE guildID = ${member.guild.id}`, async (err, req) => {

        if(req.length < 1) return;

        if(req[0].captcha === "on") {

            let text = await bot.function.createCaptcha();

            const captcha = new Captcha();
            captcha.async = true;
            captcha.addDecoy(); 
            captcha.drawTrace(); 
            captcha.drawCaptcha(); 
    
            const captchaAttachment = new MessageAttachment(
                await captcha.png,
                "captcha.png"
            );

            const captchaEmbed = new Discord.MessageEmbed()
            .setDescription("Merci de compléter ce captcha !\n Vous n'avez qu'**une minute**.")
            .setImage("attachment://captcha.png")

            
            Canvas.registerFont("./node_modules/discord-canvas-easy/Assets/futura-bold.ttf", { family: "Futura Book"})
            
            const canvas = Canvas.createCanvas(300, 150)
            const ctx = canvas.getContext("2d");

            ctx.font = '35px "Futura Book"';
            ctx.fillStyle = "#ffffff";
            ctx.fillText(text, (150 - (ctx.measureText(`${text}`).width) / 2), 85)

            const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
            .setStyle("SECONDARY")
            .setCustomId("infocaptcha")
            .setLabel("Informations")
            .setEmoji("⚠️"))

            let msg = await bot.channels.cache.get("989539621278998548").send({content: `**Bienvenue** <@${member.id}> ! Nous devons vérifier que tu es bien humain... 🤖`, files: [captchaAttachment], components: [btn], embeds: [captchaEmbed]})

            const filter = (message) => {
                if(message.author.id !== member.id) return;
                if(message.content === captcha.text) return true;
                else message.react("❌");

            }
            try {
                const response = await msg.channel.awaitMessages({
                    filter, 
                    max:1, 
                    time: 60000, 
                    errors: ['time']
                });
                
                if(response && member!= undefined) {
            // Bonne réponse                    client.guilds.cache.get(server).members.fetch(user_id)

                    member.roles.add('989539760949301299')
                    let welcomemsg = await bot.channels.cache.get("1002335949235163136").send(`👐 Bienvenue à <@${member.id}> !`)
                    welcomemsg.react("👋")
                    await msg.delete()
                    msg.channel.messages.fetch({
                        limit: 100 
                    }).then((messages) => { 
                        const botMessages = [];
                        messages.filter(m => m.author.id === member.id).forEach(mess => botMessages.push(mess))
                        msg.channel.bulkDelete(botMessages)
                    })
                    
                }

            } catch (err){
                try{
                    await msg.delete()
                    msg.channel.messages.fetch({
                        limit: 100 
                    }).then((messages) => { 
                        const botMessages = [];
                        messages.filter(m => m.author.id === member.id).forEach(mess => botMessages.push(mess))
                        msg.channel.bulkDelete(botMessages)
                    })

                }catch(err){}
                if(member!= undefined) {
                    member.kick("FAIL CAPTCHA")
                }

            }

        }
    })
})