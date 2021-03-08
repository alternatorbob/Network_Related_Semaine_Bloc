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
    if (message.content.includes("$")) {
      //🍐 query
      // const response = new MessageEmbed();
      // response.setTitle("answer from bot");
      let token = message.content.split(" "); // -> ["first", "second"] if message.content is "first second"
      let numberOfMessages = 6;

      const receivedEmbed = message.embeds[0];

      let startWordSearch = token[1];
      let currentQuerry = startWordSearch;

      for (let i = 0; i < numberOfMessages; i++) {
        let url = await this.searchGif(currentQuerry);
        message.channel.send(`turn number ${i + 1}`);
        message.channel.send(url);
        let changeQuery = await this.searchWord(currentQuerry);
        console.log("changeQuerry: ", changeQuery);
        currentQuerry = changeQuery;
      }
    }
    return message.content;
  }

  async searchGif(query) {
    let url = `https://g.tenor.com/v1/search?q=${query}&key=${process.env.TENOR_KEY}`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    return json.results[index].url;
  }

  async searchWord(query) {
    let url = `https://wordsapiv1.p.rapidapi.com/words/${query}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9c96dbf1b0msh0f4f598b9bcd3a3p1eb1a7jsn836c286783d5",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      },
    });
    let json = await response.json();

    // console.log("derivation: ", json.results[0].derivation[0]);
    // console.log("synonyms: ", json.results[0].synonyms);
    // console.log("hasTypes: ", json.results[0].hasTypes);

    const ogQuery = query;

    // const index = Math.floor(Math.random() * json.results.hasTypes.length);
    // console.log(index);
    console.log(json.results[0].hasTypes);

    return json.results[0].hasTypes[0];

    // if (json.results[0].derivation[0] != undefined) {
    //   console.log("derivation");
    //   return json.results[0].derivation[0];
    // } else if (json.results[0].synonyms[0] != undefined) {
    //   console.log("synonym");
    //   return json.results[0].synonyms[0];
    // } else if (json.results[0].hasTypes[0] != undefined) {
    //   console.log("hasTypes");
    //   return json.results[0].hasTypes[0];
    // } else {
    //   return ogQuery;
    // }

    // .hasTypes.derivation);
  }

  async changeWord(query) {
    e;
  }
}

module.exports = { DiscordBot };
