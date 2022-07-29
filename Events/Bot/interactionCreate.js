const Event = require("../../Structure/Event")
const transcript = require("discord-html-transcripts")
const Discord = require("discord.js");
const createID = require("../../Fonctions/createID");

module.exports = new Event("interactionCreate", async (bot, interaction) => {

    if(interaction.isCommand()) {

        const command = bot.commands.get(interaction.commandName);
        

        if(!bot.cooldown.has(command.name)) {
            bot.cooldown.set(command.name, new Discord.Collection())
        }

        const time = Date.now();
        const cooldown = bot.cooldown.get(command.name);
        const timeCooldown = (command.cooldown || 5) * 1000;

        if(cooldown.has(interaction.user.id)) {

            const timeRestant = cooldown.get(interaction.user.id) + timeCooldown;

            if(time < timeRestant) {

                const timeLeft = (timeRestant - time);

                return interaction.reply(`Vous devez attendre ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60 * 24) % 30))}\`` + ` jour(s) ` + `\`${(Math.round(timeLeft / (1000 * 60 * 60)))}\`` + ` heure(s) ` + `\`${(Math.round(timeLeft / (1000 * 60) % 60))}\`` + ` minute(s) ` + `\`${(Math.round(timeLeft / 1000 % 60))}\`` + ` seconde(s) pour exécuter cette commande !`)
            }
        }

        cooldown.set(interaction.user.id, time);
        setTimeout(() => cooldown.delete(interaction.user.id), timeCooldown);
        if(command.permission === "Développeur" && interaction.user.id !== "646008712099528705") return interaction.reply("Vous n'avez pas la permission requise pour exécuter cette commande.")
        if(!(command.permission !== "Aucune") && command.permission !== "Développeur" && !interaction.member.permissions.has(Discord.Permissions[command.permission])) return message.reply("Vous n'avez pas la permission requise pour exécuter cette commande.")
   
        command.run(bot, interaction, interaction.options, bot.db);

    }

    if(interaction.isButton()) {

        if(interaction.customId === "ticket") {
            const ID = await bot.function.createID("C");

            let question1 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
            .setCustomId("description")
            .setLabel("Décrivez-nous votre/vos besoin(s) ?")
            .setRequired(true)
            .setPlaceholder("Description détaillée de ce que vous souhaitez.")
            .setStyle("PARAGRAPH")
            )
            
            let question2 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
            .setCustomId("budget")
            .setLabel("Quel est votre budget ?")
            .setRequired(true)
            .setPlaceholder("20€")
            .setStyle("SHORT")
            )
    
            let question3 = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
            .setCustomId("date")
            .setLabel("Date butoir")
            .setRequired(true)
            .setPlaceholder("Échéance à laquelle vous souhaitez que votre commande soit délivréee.")
            .setStyle("SHORT")
            )

            let Modal = new Discord.Modal()
            .setCustomId("Modal")
            .setTitle("Création de l'audit")
            .addComponents(question1, question2, question3)
    
            await interaction.showModal(Modal)
    
            try {
                let response = await interaction.awaitModalSubmit({time: 300000})

                let channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {type: "GUILD_TEXT"})
                await channel.setParent(interaction.channel.parentId)
                await channel.permissionOverwrites.create(interaction.user, {
                    SEND_MESSAGES: true,
                    EMBED_LINKS: true,
                    VIEW_CHANNEL: true,
                    READ_MESSAGE_HISTORY: true
                })
                await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    EMBED_LINKS: false,
                    VIEW_CHANNEL: false,
                    READ_MESSAGE_HISTORY: false
                })

                let date = response.fields.getTextInputValue("date")
                let budget = response.fields.getTextInputValue("budget")
                let description = response.fields.getTextInputValue("description")
    
                await response.reply({content: "Votre modals a été envoyé avec succès", ephemeral: true})

    
                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle(`Commande de ${interaction.user.username}`)
                .setDescription(`${interaction.user.tag} a créé ce ticket, merci de lui répondre !`)

                .addField("Description : ", `${description}`)
                .addField("Budget : ", `${budget}`)
                .addField("Date butoir : ", `${date}`)
                
                
                const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                .setStyle("DANGER")
                .setEmoji("🔒")
                .setLabel("Fermer le ticket")
                .setCustomId("close"),
                new Discord.MessageButton()
                .setStyle("PRIMARY")
                .setEmoji("📑")
                .setLabel("Demander le transcript")
                .setCustomId("transcript"))
                
                
                await channel.send({embeds: [Embed], components: [btn]})

        
            }catch(err){
                throw err        
            }            
        } else if(interaction.customId === "info") {

            
            let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle('🔰Comment commander chez nous ? ')
                .setDescription("Nous avons un système élaboré afin que votre expérience en tant que client soit la meilleure.")
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .addFields(
                    {name: "⠀", value:"**🛒 Le bouton __Commander__**"},
                    {name: '⠀', value: '__🧷 Un formulaire apparaitra, il contriendra trois critères importants__'},
                    {name:"Description:", value: "Expliquez en quelques mots le fondement de la commande, une vue générale nous aidera à mieux comprendre et plus rapidement les les tenants et aboutissants du projet."},
                    {name: "Budget: ", value:"Le budget est un élément nécessaire du cahier des charges. Essayez de déterminer le plafond de budget à partir duquel la commande perd tout intérêt."},
                    {name: "Délais: ", value: "Elle nous permet d’évaluer la durée de travail et de s’organiser. Pour vous, le délais indiqué sur le cahier des charges sert de preuve.  \n ⠀ \n ⠀"},
                    {name: "🎯 **Notre clientèle ciblée ?**", value:"\n __🧷 *Êtes-vous au bon endroit ?*__"},
                    {name: '⠀', value: "Nos clients sont propriétaire de serveur(s) et/ou communauté, jeune comme déjà installée, et qui souhaitent améliorer et avancer dans leur projet avec nous. \n > **-** Plugin Minecraft, \n > **-** Site internet, \n > **-** Bot discord, \n > **-** Correction d'erreur,  \n > **-** etc." },
                    
                    {name: "⠀", value:"**N'attendez plus !**"},
                    {name: "⠀", value:"*Un salon sera créé pour vous à l'envoi du formulaire.*"},

                            )

                interaction.reply({embeds: [Embed], ephemeral: true});
            
        } else if(interaction.customId === "transcript") {

            await interaction.deferReply()
            await bot.channels.cache.get("989538129612533820").send({content: `Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`, files: [await transcript.createTranscript(interaction.channel)]})
            await interaction.editReply({content: "Transcript envoyé avec succès !", ephemeral: true})
        } else if(interaction.customId === "close") {

         //   let user = interaction.guild.members.cache.find(m => m.user.username === interaction.message.embeds[0].description.split(" ")[0].split("#")[0] && m.user.discriminator === interaction.message.embeds[0].description.split(" ")[0].split("#")[1]).user;
            await interaction.channel.delete()
        } else if( interaction.customId === "infocaptcha") {

            let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle('🔰 Comment compléter le captcha ? ')
                .setDescription("Afin de protéger le serveur de RAIDS, nous avons mis en place un captcha. \n ⠀")
                .addFields(                    
                    {name: `👋 Tout d'abord bienvenue à toi ${interaction.user.username} !`, value:"⠀"},
                    {name: "Tu as __une minute__ pour compléter le CAPTCHA, avec autant d'essai que tu souhaite.", value:"*Vous devez écrire __en majuscule__ les lettres et les chiffres __écrits en vert__.*"},
                    )
                .setFooter({text: `Les points d'informations sont toujours indiqué par l'emoji "🔰"`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

                interaction.reply({embeds: [Embed], ephemeral: true});
        } else {
           interaction.reply(interaction.customId)
        }
    }
    
})