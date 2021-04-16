const config = require("./config");
const Twit = require("twit");
const jokes = require("./data");

const T = new Twit(config);

let stream = T.stream("statuses/filter", {
  track: [
    "#King__Solo",
    "#Nandeey1",
    "#100DaysOfCode",
    "#Nodejs",
    "#codeNewbie",
    "#javascript",
    "#reactjs",
    "#Vue",
    "#vuejs",
  ],
});
const isReply = (tweet) => {
  if (
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return true;
};
const isSpam = (twitter_text) => {
  const hashtags = twitter_text.split("#");
  const spam_hashtags = [
    "shit",
    "drug",
    "drugs",
    "weed",
    "homework",
    "essay",
    "essays",
    "essaypay",
    "essaydue",
    "essayhelp",
    "essay pay",
    "essay due",
    "essay write",
    "essay help",
    "paper pay",
    "homeworkslave",
    "cocaine",
    "drogue",
  ];
  const spam = hashtags.filter((item) =>
    spam_hashtags.includes(item.trim().toLowerCase())
  );
  return spam.length > 0;
};
stream.on("tweet", (tweet) => {
  if (!isReply(tweet)) {
    const tweet_text = !!tweet?.extended_tweet?.full_text
      ? tweet.extended_tweet.full_text
      : tweet.text;
    if (!isSpam(tweet_text)) {
      T.post("favorites/create", { id: tweet.id_str }, (err, data, res) => {
        if (!err) {
          console.log("Liked!!! " + tweet.id_str);
        }
      });
      T.post("statuses/retweet/:id", { id: tweet.id_str }, (err, data, res) => {
        if (!err) {
          console.log("Retweeted!!! " + tweet.id_str);
        }
      });
    }
  }
});
const post = () => {
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
};

setInterval(post, 60 * 60 * 60);
