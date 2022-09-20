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
const table = [];
init();
//CACHED ELEMENTS
const tableSpaces = document.querySelector(".table").childNodes;
const playerSpace = tableSpaces[1];
const computerSpace = tableSpaces[3];
const playButton = document.querySelector(".play-button div");
const playerScoreEl = document.querySelectorAll("h4")[0];
const computerScoreEl = document.querySelectorAll("h4")[1];

console.log(computerScoreEl);
playButton.addEventListener("click", (e) => {
  pickRandomCard();
  const playerCard = players.user.lastCard;
  const computerCard = players.computer.lastCard;

  resolveWinner(playerCard, computerCard);
  console.log(players.computer.lastCard);
  render(computerCard, playerCard);
});

function render(computerCard, playerCard) {
  computerSpace.setAttribute(
    "class",
    `card ${computerCard.suit + computerCard.face}`
  );
  playerSpace.setAttribute(
    "class",
    `card ${playerCard.suit + playerCard.face}`
  );
  computerScoreEl.innerText = players.computer.handsWon;
  playerScoreEl.innerText = players.user.handsWon;
}

function resolveWinner(playerCard, computerCard) {
  // while (playerCard.value === computerCard.value) {
  //   pickRandomCard();
  // }
  playerCard.value > computerCard.value
    ? (players.user.handsWon += 1)
    : (players.computer.handsWon += 1);
  if (playerCard.value > computerCard.value) {
    table.forEach((index) => {
      players.user.hand.push(table.splice(index, 1)[0]);
    });
    document.querySelectorAll(".message")[0].innerText = "Player wins";
  } else {
    table.forEach((index) => {
      players.computer.hand.push(table.splice(index, 1)[0]);
    });
    document.querySelectorAll(".message")[0].innerText = "Computer wins";
  }
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
  table.push(pCard, cCard);
  players.user.lastCard = pCard;
  players.computer.lastCard = cCard;
}

function isGameWon() {
  return players.computer.hand.length == 0 || players.user.hand.length;
}

function init() {
  createCards();
  dealCards();
}
