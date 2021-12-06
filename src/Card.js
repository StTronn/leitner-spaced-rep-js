/*
 * Implementation of leitner algo with modification
 */

const statEn = {
  NEW: "new",
  MASTERED: "mastered",
  REVIEW: "reviewing",
  WRONG: "wrong",
};
const { uniqueId } = require("lodash");
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

  constructor(obj) {
    Object.keys(obj).map((e) => {
      this[e] = obj[e];
      // this._id = uniqueId()
    });
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

  /*
   * reset the card to default
   * @return null
   */
  reset() {
    this.status = statEn.NEW;
    this.reviewCount = 0;
    this.bucket = 0;
  }
}

//factory method
const createCards = (cards) => {
  return cards.map((card) => new Card(card));
};

const createDeck = (cards) => {
  return Deck(createCards(cards));
};

exports.Card = Card;
exports.createCards = createCards;
exports.statEn = statEn;
