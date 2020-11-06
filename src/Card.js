/*
 * Implementation of leitner algo with modification
 */

const statEn = {
  NEW: "new",
  MASTERED: "mastered",
  REVIEW: "reviewing",
  WRONG: "wrong",
};
const Deck = require("./Deck");

class Card {
  /*----properties---*/
  front;
  back;
  status = statEn.NEW; //reviewing,learning,mastered
  reviewCount = 0;
  bucket = 0;
  //enum
  statEn = {
    NEW: "new",
    MASTERED: "mastered",
    REVIEW: "reviewing",
    WRONG: "wrong",
  };
  /*----properties---*/

  constructor({ front, back, reviewCount, status, bucket }) {
    this.front = front;
    this.back = back;
    if (reviewCount) this.reviewCount = reviewCount;
    if (status) this.status = status;
    if (bucket) this.bucket = bucket;
  }

  update(choice) {
    //know this word
    if (choice) {
      //new
      if (this.status == this.statEn.NEW) {
        this.bucket = 2;
        this.status = this.statEn.MASTERED;
      }
      // wrong
      else if (this.status == this.statEn.WRONG) {
        this.bucket = 0;
        this.status = this.statEn.REVIEW;
      }
      // review
      else if (this.status == this.statEn.REVIEW) {
        //move to mastered if progress>1
        if (this.reviewCount != 0) {
          this.reviewCount = 0;
          this.status = this.statEn.MASTERED;
          this.bucket = 2;
        }
        //increase review progress
        else this.reviewCount = 1;
      }
    }
    //wrong ans
    else {
      this.status = this.statEn.WRONG;
      this.reviewCount = 0;
      this.bucket = 0;
    }
  }
}

//factory method
const createCards = (cards) => {
  return cards.map((card) => new Card(card));
};

const createDeck = (cards) => {
  return Deck(createCards(cards));
};

/* --- END CLASS --- */

const dummyCards = [
  {
    front: "a",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.new,
    bucket: 0,
  },
  {
    front: "b",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.new,
    bucket: 0,
  },
  {
    front: "d",
    back: "alphabet",
    reviewCount: 0,
    status: statEn.wrong,
    bucket: 0,
  },
];
const deck1 = new Deck(createCards(dummyCards));
const card = deck1.pick();
card.update(0);

exports.Card = Card;
exports.createCards = createCards;
exports.statEn = statEn;
