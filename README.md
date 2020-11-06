# lt-spaced-repetition-js 
![test](https://github.com/StTronn/leitner-spaced-rep-js/workflows/test/badge.svg)

An implementation of modified leitner algorithm for flashcards


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
];

const deck = new Deck(createCards(dummyCards));
const currCard = deck.pick();
console.log(currCard);
currCard.update(1); // 1 -> if user know the word, 0 otherwise
console.log(currCard);

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
