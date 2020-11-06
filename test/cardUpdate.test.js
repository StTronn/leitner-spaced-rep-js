/* Test for Card.update */

const { Card, Deck, createCards } = require("../src/Card");

const dummyCards = [
  { front: "a", back: "alphabet", reviewCount: 0, status: "new", bucket: 0 },
  { front: "b", back: "alphabet", reviewCount: 0, status: "new", bucket: 0 },
  { front: "d", back: "alphabet", reviewCount: 0, status: "new", bucket: 0 },
];

const wrongCard = {
  front: "a",
  back: "alphabet",
  reviewCount: 0,
  status: "wrong",
  bucket: 0,
};

const reviewCard = {
  front: "a",
  back: "alphabet",
  reviewCount: 0,
  status: "reviewing",
  bucket: 0,
};

test("testing test", () => {
  const l = 1;
  expect(l).toBe(1);
});

//new word
test("new word right is mastered", () => {
  const card = new Card(dummyCards[0]);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.NEW);
  card.update(1);
  expect(card.bucket).toBe(2);
  expect(card.status).toBe(card.statEn.MASTERED);
});

test("new word wrong is wrong", () => {
  const card = new Card(dummyCards[0]);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.NEW);
  card.update(0);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.WRONG);
});

//review
test("review word with count 0 increases count", () => {
  const card = new Card(reviewCard);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.REVIEW);
  card.update(1);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.REVIEW);
});

test("review word with count 1 becomes mastered", () => {
  const card = new Card(reviewCard);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.REVIEW);
  card.update(1);
  card.update(1);
  expect(card.bucket).toBe(2);
  expect(card.status).toBe(card.statEn.MASTERED);
});

test("review word wrong is wrong", () => {
  const card = new Card(reviewCard);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.REVIEW);
  card.update(0);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.WRONG);
});

//wrong
test("wrong word wrong is wrong", () => {
  const card = new Card(wrongCard);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.WRONG);
  card.update(0);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.WRONG);
});

test("wrong word right is reviewed", () => {
  const card = new Card(wrongCard);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe("wrong");
  card.update(1);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe("reviewing");
  expect(card.reviewCount).toBe(0);
});
