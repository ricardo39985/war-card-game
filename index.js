const ranks = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];
const suits = ["c", "d", "h", "s"];
const cards = [];

const players = {
  user: {
    lastCardVal: 0,
    handsWon: 0,
    hand: [],
    lastCard: {},
  },
  computer: {
    lastCardVal: 0,
    handsWon: 0,
    hand: [],
    lastCard: {},
  },
};
let table = [];
//CACHED ELEMENTS
const tableSpaces = document.querySelector(".table").childNodes;
const playerSpace = tableSpaces[1];
const computerSpace = tableSpaces[3];
const playButton = document.querySelector(".play-button div");
const playerScoreEl = document.querySelectorAll("h4")[0];
const computerScoreEl = document.querySelectorAll("h4")[1];
const messageEl = document.querySelectorAll(".message")[0];
const resetButtonEl = document.querySelector(".reset-button div");

init();
resetButtonEl.addEventListener("click", () => restart());
playButton.addEventListener("click", handleClick);

function init() {
  createCards();
  dealCards();
}

function restartGame() {
  restart();
}

function restart() {
  gameOverMessage();
  resetVariables();
  render();
}

function gameOverMessage() {
  if (players.user.hand.length === players.computer.hand.length) {
    messageEl.innerText = "Game is draw";
  } else {
    messageEl.innerText =
      players.user.hand.length > players.computer.hand.length
        ? "Game Over: Player Wins"
        : "Game Over: Computer Wins";
  }
}

function handleClick(e) {
  pickRandomCard();
  gameisWon() ? restartGame() : continueGame();
}
function continueGame() {
  resolveWinner(players.user.lastCard, players.computer.lastCard);
  render(players.computer.lastCard, players.user.lastCard);
}

function gameisWon() {
  return players.computer.hand.length === 0 || players.user.hand.length === 0;
}

function resetVariables(resetClicked) {
  players.user.hand = [];
  players.computer.hand = [];
  players.computer.handsWon = 0;
  players.user.handsWon = 0;
  players.computer.lastCard = 0;
  players.user.lastCard = 0;
  players.computer.lastCard = {};
  players.user.lastCard = {};
  createCards();
  dealCards();
}

function render(computerCard, playerCard) {
  if (computerCard && !gameisWon()) {
    computerSpace.setAttribute(
      "class",
      `card ${computerCard.suit + computerCard.face}`
    );
  } else {
    computerSpace.setAttribute("class", `card joker-red`);
  }
  if (playerCard && !gameisWon()) {
    playerSpace.setAttribute(
      "class",
      `card ${playerCard.suit + playerCard.face}`
    );
  } else {
    playerSpace.setAttribute("class", `card joker-black`);
  }
  computerScoreEl.innerText = players.computer.handsWon;
  playerScoreEl.innerText = players.user.handsWon;
}

function resolveWinner(playerCard, computerCard) {
  while (players.user.lastCard.value === players.computer.lastCard.value) {
    setTimeout(()=>{
      messageEl.innerText = "There has been a draw! Play again";

    }, 3000)
    pickRandomCard();
  }

  playerCard.value > computerCard.value
    ? (players.user.handsWon += 1)
    : (players.computer.handsWon += 1);
  if (playerCard.value > computerCard.value) {
    table.forEach((card) => {
      players.user.hand.push(card);
    });
    messageEl.innerText = "Player wins";
  } else {
    table.forEach((card) => {
      players.computer.hand.push(card);
    });
    messageEl.innerText = "Computer wins";
  }
  table = []
}

// HELPERS
function createCards() {
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      let newCard = {};
      newCard.face = rank;
      newCard.suit = suit;
      switch (rank) {
        case "Jack":
          newCard.value = 11;
          newCard.face = "J";

          break;
        case "Queen":
          newCard.value = 12;
          newCard.face = "Q";

          break;
        case "King":
          newCard.value = 13;
          newCard.face = "K";

          break;
        case "Ace":
          newCard.value = 14;
          newCard.face = "A";

          break;
        default:
          newCard.value = parseInt(rank);
          newCard.face = rank;

          break;
      }
      cards.push(newCard);
    });
  });
}
function dealCards() {
  let randomIndex = () => Math.floor(Math.random() * cards.length);
  while (cards.length > 0) {
    players.user.hand.push(cards.splice(randomIndex(), 1)[0]);
    players.computer.hand.push(cards.splice(randomIndex(), 1)[0]);
  }
}

function pickRandomCard() {
  let pCard = players.user.hand.splice(
    Math.floor(Math.random() * players.user.hand.length),
    1
  )[0];
  let cCard = players.computer.hand.splice(
    Math.floor(Math.random() * players.computer.hand.length),
    1
  )[0];
  players.user.lastCard = pCard;
  players.computer.lastCard = cCard;
  table.push(pCard, cCard);
}

function isGameWon() {
  return players.computer.hand.length == 0 || players.user.hand.length;
}


