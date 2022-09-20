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
const playerHand = [];
const computerHand = [];

const players = {
  user: {
    lastCardVal: 0,
    handsWon: 0
  },
  computer: {
    lastCardVal: 0,
    handsWon: 0
  },
};
createCards();
dealCards();
//CACHED ELEMENTS
const tableSpaces = document.querySelector(".table").childNodes;
const playerSpace = tableSpaces[1];
const computerSpace = tableSpaces[3];
const playButton = document.querySelector(".play-button div");
playButton.addEventListener("click", (e) => {
  console.log(e.target);
  computerSpace.setAttribute(
    "class",
    `card ${
      pickRandomCard("user")[0].suit + pickRandomCard("computer")[0].face
    }`
  );
  playerSpace.setAttribute(
    "class",
    `card ${pickRandomCard("user")[0].suit + pickRandomCard("user")[0].face}`
  );

  console.log(pickRandomCard("user")[0].suit + pickRandomCard("user")[0].face);
});

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
    computerHand.push(cards.splice(randomIndex(), 1));
    playerHand.push(cards.splice(randomIndex(), 1));
  }
}

function pickRandomCard(player) {
  if (player === "user") {
    return playerHand[Math.floor(Math.random() * playerHand.length)];
  }
  if (player === "computer") {
    return computerHand[Math.floor(Math.random() * computerHand.length)];
  }
}
console.log(playerHand);
