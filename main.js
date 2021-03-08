require("dotenv").config();
const { app, BrowserWindow } = require("electron");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
  // win.setFullScreen(true);
  // win.maximize();
}

function initBot() {
  const { DiscordBot } = require("./src/DiscordBot.js");
  new DiscordBot(process.env.BOT_TOKEN, win);
}

app.whenReady().then(createWindow).then(initBot);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
