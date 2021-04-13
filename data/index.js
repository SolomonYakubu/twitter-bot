const arr1 = require("./jokes/jokes1.json");
const arr2 = require("./jokes/jokes2.json");

const truthy = Math.round(Math.random());
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.getRandomJoke = function () {
  if (truthy == 1) {
    var i = randomNumber(0, arr1.length - 1);
    return arr1[i].joke;
  } else {
    var i = randomNumber(0, arr2.length - 1);
    return arr2[i].setup + "\n" + arr2[i].punchline;
  }
};
