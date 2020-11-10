const { Card, Deck, createCards, statEn } = require("./index");

const dummyCards = [
  {
    front: "a",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.NEW,
    bucket: 0,
  },
  {
    front: "a",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.NEW,
    bucket: 0,
  },
];

const deck = new Deck({ id: 1, cards: createCards(dummyCards) });
const currCard = deck.pick();
console.log(currCard);
currCard.update(1); // 1 -> if user know the word, 0 otherwise
console.log(currCard);

//console.log(deck.dump());
//console.log(deck.countType(statEn.NEW));
