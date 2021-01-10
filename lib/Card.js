"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Implementation of leitner algo with modification
 */
var statEn = {
  NEW: "new",
  MASTERED: "mastered",
  REVIEW: "reviewing",
  WRONG: "wrong"
};

var Deck = require("./Deck");

var Card = /*#__PURE__*/function () {
  /*----properties---*/
  //reviewing,learning,mastered
  //enum

  /*----properties---*/
  function Card(obj) {
    var _this = this;

    _classCallCheck(this, Card);

    _defineProperty(this, "front", void 0);

    _defineProperty(this, "back", void 0);

    _defineProperty(this, "status", statEn.NEW);

    _defineProperty(this, "reviewCount", 0);

    _defineProperty(this, "bucket", 0);

    _defineProperty(this, "statEn", {
      NEW: "new",
      MASTERED: "mastered",
      REVIEW: "reviewing",
      WRONG: "wrong"
    });

    Object.keys(obj).map(function (e) {
      _this[e] = obj[e];
    });
  }

  _createClass(Card, [{
    key: "update",
    value: function update(choice) {
      //know this word
      if (choice) {
        //new
        if (this.status == this.statEn.NEW) {
          this.bucket = 2;
          this.status = this.statEn.MASTERED;
        } // wrong
        else if (this.status == this.statEn.WRONG) {
            this.bucket = 0;
            this.status = this.statEn.REVIEW;
          } // review
          else if (this.status == this.statEn.REVIEW) {
              //move to mastered if progress>1
              if (this.reviewCount != 0) {
                this.reviewCount = 0;
                this.status = this.statEn.MASTERED;
                this.bucket = 2;
              } //increase review progress
              else this.reviewCount = 1;
            }
      } //wrong ans
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

  }, {
    key: "reset",
    value: function reset() {
      this.status = statEn.NEW;
      this.reviewCount = 0;
      this.bucket = 0;
    }
  }]);

  return Card;
}(); //factory method


var createCards = function createCards(cards) {
  return cards.map(function (card) {
    return new Card(card);
  });
};

var createDeck = function createDeck(cards) {
  return Deck(createCards(cards));
};

exports.Card = Card;
exports.createCards = createCards;
exports.statEn = statEn;