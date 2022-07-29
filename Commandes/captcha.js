const { Captcha } = require("captcha-canvas")
const { MessageAttachment } = require("discord.js");

const Command = require("../Structure/Command")
module.exports = new Command({

    name: "captcha",
    description: "Permet de tester un capchat",
    utilisation: "capchat",
    permission: "",
    category: "Moderation",
    cooldown: 10,
    
    async run(bot,message,args,db) {
        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy(); 
        captcha.drawTrace(); 
        captcha.drawCaptcha(); 

        const captchaAttachment = new MessageAttachment(
            await captcha.png,
            "captcha.png"
        );

        message.channel.send({
            files : [captchaAttachment], 
            content: `Code: ${captcha.text}`})

    }
})