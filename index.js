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
let playerHand = [];
let computerHand = [];
createCards();
function createCards() {
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      let newCard = {};
      newCard.face = rank;
      newCard.suit = suit;
      switch (rank) {
        case "Jack":
          newCard.value = 11;
          break;
        case "Queen":
          newCard.value = 12;

          break;
        case "King":
          newCard.value = 13;

          break;
        case "Ace":
          newCard.value = 14;

          break;

        default:
          newCard.value = parseInt(rank);

          break;
      }
      cards.push(newCard);
    });
  });
}
let randomIndex = () => Math.floor(Math.random() * cards.length);
while (cards.length > 0) {
  if (playerHand.length === 0) {
    playerHand.push(cards.splice(randomIndex, 1));
  }
  playerHand < computerHand
    ? playerHand.push(cards.splice(randomIndex, 1))
    : computerHand.push(cards.splice(randomIndex, 1));
}
console.log(playerHand)
