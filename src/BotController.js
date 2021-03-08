require("dotenv").config();
const { DiscordBot } = require("./DiscordBot.js");
new DiscordBot(process.env.BOT_TOKEN);
