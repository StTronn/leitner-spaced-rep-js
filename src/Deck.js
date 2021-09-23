var _ = require("lodash");

class Deck {
  /*----properties---*/
  day = 0;
  cardsInday = 0;
  dayIteration;
  cards = [];
  TestRight = 0;
  TestWrong = 0;
  _testIndex = 0;
  /*----properties---*/

  constructor(obj, dayIteration = 1) {
    // obj must have a cards property
    Object.keys(obj).forEach((e) => {
      this[e] = obj[e];
    });
    this.dayIteration = dayIteration;
  }

  /*
   * pick a card from deck
   * @return -> Card
   */
  update(id,choice) {
    //find card with id
    let card = this.cards.find(({ _id }) => _id == id);
    card.update(choice);
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

  /*
   * reset the Test
   */
  resetTest() {
    this.TestRight = 0;
    this.TestRight = 0;
    this._testIndex = 0;
    //this.cards = _.shuffle(this.cards);
  }

  /*
   * pick new Card for test mode
   * @return -> Next Card of false if no Cards left
   */
  pickTest() {
    if (this._testIndex == this.cards.length) return false;
    return this.cards[this._testIndex++];
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
