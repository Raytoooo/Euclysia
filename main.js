const { token } = require("./config");
const Client = require("./Structure/Client")
const bot = new Client();

bot.start(token)