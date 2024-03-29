"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require("lodash");

var Deck = /*#__PURE__*/function () {
  /*----properties---*/

  /*----properties---*/
  function Deck(obj) {
    var _this = this;

    var dayIteration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, Deck);

    _defineProperty(this, "day", 0);

    _defineProperty(this, "cardsInday", 0);

    _defineProperty(this, "dayIteration", void 0);

    _defineProperty(this, "cards", []);

    _defineProperty(this, "TestRight", 0);

    _defineProperty(this, "TestWrong", 0);

    _defineProperty(this, "_testIndex", 0);

    // obj must have a cards property
    Object.keys(obj).forEach(function (e) {
      _this[e] = obj[e];
    });
    this.dayIteration = dayIteration;
  }
  /*
   * pick a card from deck
   * @return -> Card
   */


  _createClass(Deck, [{
    key: "update",
    value: function update(id, choice) {
      //find card with id
      var card = this.cards.find(function (_ref) {
        var _id = _ref._id;
        return _id == id;
      });
      card.update(choice);
    }
    /*
     * pick a card from deck
     * @return -> Card
     */

  }, {
    key: "pick",
    value: function pick() {
      var _this2 = this;

      //find all the buckets for this day and concat them into a single list
      var dayWords = this.cards.filter(function (_ref2) {
        var bucket = _ref2.bucket;
        return bucket == 0 || _this2.day % bucket == 0;
      });
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

  }, {
    key: "countType",
    value: function countType(type) {
      return this.cards.filter(function (_ref3) {
        var status = _ref3.status;
        return status == type;
      }).length;
    }
    /*
     * @return Count all Card in word with given status
     */

  }, {
    key: "dump",
    value: function dump() {
      return JSON.parse(JSON.stringify(this));
    }
    /*
     * reset the Test
     */

  }, {
    key: "resetTest",
    value: function resetTest() {
      this.TestRight = 0;
      this.TestRight = 0;
      this._testIndex = 0; //this.cards = _.shuffle(this.cards);
    }
    /*
     * pick new Card for test mode
     * @return -> Next Card of false if no Cards left
     */

  }, {
    key: "pickTest",
    value: function pickTest() {
      if (this._testIndex == this.cards.length) return false;
      return this.cards[this._testIndex++];
    }
    /* reset the deck
     * @return null
     */

  }, {
    key: "reset",
    value: function reset() {
      this.cards.forEach(function (card) {
        card.reset();
      });
      this.day = 0;
    }
  }]);

  return Deck;
}();

module.exports = Deck;