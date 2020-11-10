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

// object passed to constructor must inclued cards a list of Card
const deck = new Deck({ id: 1, cards: createCards(dummyCards) });

const currCard = deck.pick();

currCard.update(1); // 1 -> if user know the word, 0 otherwise

//console.log(deck.dump());
//console.log(deck.countType(statEn.NEW));
