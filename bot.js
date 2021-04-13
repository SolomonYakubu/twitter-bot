const Twit = require("twit");

const jokes = require("./data");
const {
  access_token,
  access_token_secret,
  consumer_key,
  consumer_secret,
} = require("./config");

const T = new Twit({
  access_token,
  access_token_secret,
  consumer_key,
  consumer_secret,
});

const bot = () => {
  //Post a random joke
  const joke = jokes.getRandomJoke();
  T.post(
    "statuses/update",
    {
      status: `${joke}
#100DaysOfCode #javascript #codeNewbie`,
    },
    (err, data, res) => {
      console.log(data);
    }
  );
  //Search tweets with specific tags
  T.get(
    "search/tweets",
    { q: "#100DaysOfCode OR #javascript OR #coding OR codeNewbie", count: 10 },
    (err, data, res) => {
      let tweets = data.statuses;
      if (!err) {
        const tweetIds = tweets.map((item) => item.id_str);
        const idSet = new Set(tweetIds);

        const uniqueTweetIds = [...idSet];

        uniqueTweetIds.map((id) => {
          //Retweet tweets with those ids
          T.post("statuses/retweet/:id", { id }, (err, data, res) => {
            if (!err) {
              console.log(`Retweeted ${id} successfully`);
            } else {
              console.log(err);
            }
          });
        });
      }
    }
  );
};

setInterval(bot, 60000);
