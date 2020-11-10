# lt-spaced-repetition-js 
![test](https://github.com/StTronn/leitner-spaced-rep-js/workflows/test/badge.svg)

An implementation of modified leitner algorithm for flashcards

## Install

`npm i lt-spaced-repetition-js`

## Usage
```
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

```

### Deck Methods
```
console.log(deck.dump()); //creates a dump obj of deck

//takes statEn enumeration returns count in deck
console.log(deck.countType(statEn.NEW)); 
```
### Options 

You can specifiy `dayIteration` which is by default 1 to determine how many cards are shown before a day progresses.

```
// 2 cards are shown on each day
const deck = new Deck({ cards: createCards(dummyCards) },dayIteration=2);
```

## Rules 
There are four status of a card can have 
* NEW
* MASTERED
* REVIEW
* WRONG

user has 2 choice for each word know this word (1) or wrong (0)

**NEW word update-1 is MASTERED**

**WRONG word update-1 is  REVIEW**

**REVIEW word update-1 for the first time is still REVIEW**

**REVIEW word update-1 for the seconed time is MASTERED**

**any word update-0 is WRONG**

MASTERED has 1/4 less chance occuring than others
