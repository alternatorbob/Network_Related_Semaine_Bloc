const { Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

class DiscordBot {
  constructor(token, win) {
    console.log("bot start");
    this.client = new Client();
    this.win = win;

    this.client.on("ready", () => {
      console.log("bot logged in");
    });
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
  }

  async onMessage(message) {
    // const processMessage = message.content.trim().split(/\s+/);
    let processMessage = message.content.split(" ");
    let robotReply = "";

    if (processMessage[1] != undefined && !message.author.bot) {
      message.channel.send("You can only use single words");
    } else if (!message.author.bot) {
      const sendMessage = this.lastTwo(processMessage[0]);
      //CALL API
      const returnedWord = await this.searchWord(sendMessage);
      // console.log(returnedWord.word);
      message.channel.send(returnedWord);
    }

    if (message.author.bot) {
      robotReply = message.content;
    }

    console.log("same call", await this.sameLetters("stale", "lesbian"));

    if (!message.author.bot)
      if (this.sameLetters(robotReply, message.content)) console.log(true);

    const receivedEmbed = message.embeds[0];
    if (receivedEmbed) {
      this.win.webContents.send("Discord_Message", receivedEmbed);
    } else {
      this.win.webContents.send("Discord_Message", message.content);
    }
  }

  lastTwo(word) {
    return word.slice(word.length - 2, word.length);
  }

  oneWord(word) {
    word.slice(" ");
    if (word[1] != undefined) return false;
    else return true;
  }

  async sameLetters(word1, word2) {
    let wordOne = word1.slice(word1.length - 1, word1.length);
    let wordTwo = word2.slice(0, 1);
    console.log("wordOne:", wordOne);
    console.log("wordTwo:", wordTwo);
    console.log(wordOne.localeCompare(wordTwo));
  }

  async searchWord(query) {
    // let url = `api.datamuse.com/words?sp=${query}*`;
    // let url = "https://api.datamuse.com/words?ml=ringing+in+the+ears&max=4";
    let url = `https://api.datamuse.com/words?sp=${query}*`;
    let response = await fetch(url);
    let json = await response.json();

    let index = Math.floor(Math.random() * json.length);
    return json[index].word;

    // let result = json[index].word.split(" ");
    // console.log(result);
    // if (result[1] === undefined) return result;
    // else if (result[1] != undefined) index++;
  }
}

module.exports = { DiscordBot };
