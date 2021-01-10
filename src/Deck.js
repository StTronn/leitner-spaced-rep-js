var _ = require("lodash");

class Deck {
  /*----properties---*/
  day = 0;
  cardsInday = 0;
  dayIteration;
  cards = [];
  /*----properties---*/

  constructor(obj, dayIteration = 1) {
    // obj must have a cards property
    Object.keys(obj).map((e) => {
      this[e] = obj[e];
    });
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
    if (this.cardsInday >= this.dayIteration) {
      this.cardsInday = 0;
      this.day++;
    }
    if (dayWords.length == 0) return _.sample(this.cards);
    return _.sample(dayWords);
  }

  /*
   * @return count of all Card in word with given status
   */
  countType(type) {
    return this.cards.filter(({ status }) => status == type).length;
  }

  /*
   * @return Count all Card in word with given status
   */
  dump() {
    return JSON.parse(JSON.stringify(this));
  }

  /* reset the deck
   * @return null
   */
  reset() {
    this.cards.forEach((card) => {
      card.reset();
    });
    this.day = 0;
  }
}

module.exports = Deck;
