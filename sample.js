const { Card, Deck, createCards, statEn } = require("./index");

const dummyCards = [
  {
    front: "a",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.NEW,
    bucket: 0,
  },
];

const deck = new Deck(createCards(dummyCards));
const currCard = deck.pick();
console.log(currCard);
currCard.update(1); // 1 -> if user know the word, 0 otherwise
console.log(currCard);

