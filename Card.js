/*
 * Implementation of leitner algo with modification
 */

var _ = require("lodash");

const dummyCards = [
  { front: "a", back: "alphabet", reviewCount: 0, status: "New", bucket: 0 },
  { front: "b", back: "alphabet", reviewCount: 0, status: "New", bucket: 0 },
  { front: "d", back: "alphabet", reviewCount: 0, status: "New", bucket: 0 },
];

class Deck {
  /*----properties---*/
  day = 0;
  cardsInday = 0;
  dayIteration;
  cards;
  /*----properties---*/

  constructor(cards, dayIteration = 1) {
    this.cards = cards;
    this.dayIteration = dayIteration;
  }

  //pick a card from deck
  pick() {
    //find all the buckets for this day and concat them into a single list
    let dayWords = this.cards.filter(
      ({ bucket }) => bucket == 0 || this.day % bucket == 0
    );
    this.cardsInday++;
    if (this.cardsInday > this.dayIteration) {
      this.cardsInday = 0;
      this.day++;
    }
    return _.sample(dayWords);
  }
}

class Card {
  /*----properties---*/
  front;
  back;
  status = "new"; //reviewing,learning,mastered
  reviewCount = 0;
  bucket = 0;
  /*----properties---*/

  constructor({ front, back }) {
    this.front = front;
    this.back = back;
  }

  update(choice) {
    //choice is either 1 or 0
    if (choice) {
      if (this.status == "new") {
        this.bucket = 2;
        this.status = "mastered";
      } else if (this.status == "learning") {
        this.status = "reviewing";
      } else if (this.status == "reviewing" && this.reviewCount == 0)
        this.reviewCount = 1;
      else if (this.status == "reviewing" && this.reviewCount == 1) {
        this.reviewCount = 0;
        this.status = "mastered";
        this.bucket = 2;
      }
    } else {
      this.status = "learning";
      this.reviewCount = 0;
      this.bucket = 0;
    }
  }
}

//factory method
const createCards = (cards) => {
  return cards.map((card) => new Card(card));
};

const deck1 = new Deck(createCards(dummyCards));
const card = deck1.pick();
console.log(card);
card.update(1);
console.log(card);

