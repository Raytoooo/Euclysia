const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { token } = require("../config");

module.exports = async (bot) => {
      
    const commands = [
        new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Permet de connaitre la latence du bot."),
        
        new SlashCommandBuilder().setName("prefix")
        .setDescription("Permet de changer le prefix du bot.")
        .addStringOption(option => option.setName("prefix").setDescription("Le prefixe que le bot doit avoir").setRequired(true)),

        new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Permet de supprimer des messages.")
        .addStringOption(option => option.setName("nombre").setDescription("nombre de message(s) a effacer.").setRequired(true)),

        new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Permet de bannir définitivement un utilisateur.")
        .addUserOption(option => option.setName("membre").setDescription("Le nom du membre à bannir.").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(true)),

        new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Permet d'expulser un utilisateur.")
        .addUserOption(option => option.setName("membre").setDescription("Le nom du membre à expulser.").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison de l'expulsion").setRequired(true)),
        
        new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Permet de redémarrer le bot."),

        new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Permet d'arrêter le bot."),

        new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Permet d'évaluer un code.")
        .addStringOption(option => option.setName("code").setDescription("Le code à évaluer").setRequired(true)),

        new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Permet de recharger une commande.")
        .addStringOption(option => option.setName("commande").setDescription("Le commande à recharger").setRequired(true)),
        
        new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Permet de warn un joueur.")
        .addUserOption(option => option.setName("membre").setDescription("Le nom du membre à warn.").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du warn.").setRequired(false)),

        new SlashCommandBuilder()
        .setName("tempban")
        .setDescription("Permet de bannir temporairement un joueur.")
        .addUserOption(option => option.setName("membre").setDescription("Le nom du membre à bannir").setRequired(true))
        .addStringOption(option => option.setName("temps").setDescription("Le temps du bannissement").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(false)),

        new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Permet de débannir un membre.")
        .addStringOption(option => option.setName("id_membre").setDescription("Le nom du membre à débannir").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(false)),

        new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Permet de rendre muet un membre.")
        .addUserOption(option => option.setName("id_membre").setDescription("Le nom du membre à rendre muet").setRequired(true))
        .addStringOption(option => option.setName("temps").setDescription("Le temps du mute").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du mute").setRequired(false)),

        new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Permet de rendre la parole d'un utilisateur")
        .addUserOption(option => option.setName("membre").setDescription("Le membre à qui rendre la parole").setRequired(true))
        .addStringOption(option => option.setName("raison").setDescription("La raison du rendu de parole").setRequired(false)),

        new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Permet d'envoyer l'embed des tickets."),

        new SlashCommandBuilder()
        .setName("modals")
        .setDescription("Permet de créer un modal."),

        new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Permet de rendre la parole d'un utilisateur")
        .addStringOption(option => option.setName("idée").setDescription("Votre idée").setRequired(true))




    ]

    const rest = new REST( { version: '10' } ).setToken(token);

    bot.guilds.cache.forEach(async guild => {
        
        await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });
    
    })

    console.log("Les SlashCommands créées avec succès !")

}