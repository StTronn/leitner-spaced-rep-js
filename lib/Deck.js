"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require("lodash");

var Deck = /*#__PURE__*/function () {
  /*----properties---*/

  /*----properties---*/
  function Deck(cards) {
    var dayIteration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, Deck);

    _defineProperty(this, "day", 0);

    _defineProperty(this, "cardsInday", 0);

    _defineProperty(this, "dayIteration", void 0);

    _defineProperty(this, "cards", void 0);

    this.cards = cards;
    this.dayIteration = dayIteration;
  }
  /*
   * pick a card from deck
   * @return -> Card
   */


  _createClass(Deck, [{
    key: "pick",
    value: function pick() {
      var _this = this;

      //find all the buckets for this day and concat them into a single list
      var dayWords = this.cards.filter(function (_ref) {
        var bucket = _ref.bucket;
        return bucket == 0 || _this.day % bucket == 0;
      });
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

  }, {
    key: "countType",
    value: function countType(type) {
      return this.cards.filter(function (_ref2) {
        var status = _ref2.status;
        return status == type;
      }).length;
    }
  }]);

  return Deck;
}();

module.exports = Deck;