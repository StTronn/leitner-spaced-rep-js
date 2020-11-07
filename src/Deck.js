var _ = require("lodash");

const statEn = require("./Card");

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

  /*
   * pick a card from deck
   * @return -> Card
   */
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
    if (dayWords.length == 0) return _.sample(this.cards);
    return _.sample(dayWords);
  }

  /*
   * @return Count all Card in word with given status
   */
  countType(type) {
    return this.cards.filter(({ status }) => status == type).length;
  }
}

module.exports = Deck;
