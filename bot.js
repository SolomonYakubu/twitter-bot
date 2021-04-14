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

const bot = async () => {
  //Post a random joke and qoute
  const joke = jokes.getRandomJoke();
  const quote = jokes.getRandomQuote();
  T.post(
    "statuses/update",
    {
      status: `${joke}
#100DaysOfCode #code #codeNewbie`,
    },
    async (err, data, res) => {
      await console.log(data);
    }
  );
  T.post(
    "statuses/update",
    {
      status: `${quote}
#100DaysOfCode #code #motivation`,
    },
    async (err, data, res) => {
      await console.log(data);
    }
  );
  //Search tweets with specific tags
  T.get(
    "search/tweets",
    { q: "#100DaysOfCode OR #javascript OR #coding OR #codeNewbie", count: 10 },
    async (err, data, res) => {
      let tweets = await data.statuses;
      if (!err) {
        const tweetIds = tweets.map((item) => item.id_str);
        const idSet = new Set(tweetIds);

        const uniqueTweetIds = [...idSet];

        uniqueTweetIds.map((id) => {
          //Retweet tweets with those ids
          T.post("statuses/retweet/:id", { id }, async (err, data, res) => {
            if (!err) {
              await console.log(`Retweeted ${id} successfully`);
            } else {
              await console.log(err);
            }
          });
        });
      }
    }
  );
};

setInterval(bot, 60000);
