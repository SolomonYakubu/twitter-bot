// const arr1 = require("./jokes/jokes1.json");
const arr2 = require("./jokes/jokes2.json");
const arr3 = require("./jokes/jokes3.json");
const quote = require("./quotes/quotes.json");

const opt = Math.floor(Math.random() * 2);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let i;
exports.getRandomJoke = function () {
  switch (opt) {
    case 1:
      i = randomNumber(0, arr2.length - 1);
      return arr2[i].setup + "\n" + arr2[i].punchline;
      break;
    default:
      i = randomNumber(0, arr3.length - 1);
      return arr3[i];
  }
};
exports.getRandomQuote = function () {
  i = randomNumber(0, quote.length - 1);
  return quote[i].text + "\n" + "-" + quote[i].author;
};
