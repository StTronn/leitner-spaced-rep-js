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

test("testing test", () => {
  const l = 1;
  expect(l).toBe(1);
});

test("new word right is mastered", () => {
  const card = new Card(dummyCards[0]);
  expect(card.bucket).toBe(0);
  expect(card.status).toBe(card.statEn.NEW);
  card.update(1);
  expect(card.bucket).toBe(2);
  expect(card.status).toBe(card.statEn.MASTERED);
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
