const { ipcRenderer, Main } = require("electron");
let msgLog = [];

class App {
  constructor() {
    this.initListeners();
  }
  initListeners() {
    ipcRenderer.on("Discord_Message", this.onMessage.bind(this));
  }

  onMessage(event, message) {
    msgLog.push(message);
    console.log(message);
    this.gridFill();
  }

  gridFill() {
    // const $btn = document.querySelector("[data-btn]");
    const $grid = document.querySelector("[data-grid]");

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };

    //////////////////////////////////////////////////////////////////////////////////////////
    // const totalColumns = parseInt(this.$colInput.value);
    const columnsArray = new Array(msgLog.length).fill(0);
    const gridColumns = columnsArray
      .map(() => {
        return `${getRandomInt(1, 4)}fr`;
      })
      .join(" ");

    // document.getElementById(0).innerHTML = msgLog[msgLog.length - 1];

    let newColumn = document.createElement("div");

    newColumn.setAttribute("class", "col");
    newColumn.style.setProperty("--gridColumns", gridColumns);
    let deleteColumn = document
      .getElementById(0)
      .setAttribute("style", "display:none");

    let returnedMsg = msgLog[msgLog.length - 1];
    let returnedLT = lastTwo(returnedMsg);
    let combinedString = returnedMsg.slice(0, returnedMsg.length - 2);
    console.log("combinedString:", combinedString);
    newColumn.innerHTML = `${combinedString}<u>${returnedLT}<u>`;

    if (msgLog.length > 10) {
      $grid.classList.remove("grid");
      $grid.setAttribute("class", "grid-row-1");
    }

    $grid.appendChild(newColumn);

    function lastTwo(word) {
      return word.slice(word.length - 2, word.length);
    }

    // const createColumns = columnsArray
    //   .map(() => {
    //     return `<div class="col">${msgLog[msgLog.length - 1]}</div>`;
    //   })
    //   .join("");

    $grid.style.setProperty("--gridColumns", gridColumns);
    // $grid.innerHTML = createColumns;
  }
  async searchWord(query) {
    // let url = `api.datamuse.com/words?sp=${query}*`;
    // let url = "https://api.datamuse.com/words?ml=ringing+in+the+ears&max=4";
    let url = `https://api.datamuse.com/words?sp=${query}*`;
    let response = await fetch(url);
    let json = await response.json();

    const index = Math.floor(Math.random() * json.length);
  }
}

window.onload = () => {
  new App();
};
