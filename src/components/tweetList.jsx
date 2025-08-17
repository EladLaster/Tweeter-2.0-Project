import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import { Tweet } from "./tweet";
import "./tweetList.css";

export function TweetList() {

    const {tweets,setTweets} = useContext(TweetContext);

      if (!tweets || tweets.length === 0) return null;

    function deleteTweet(id){
    const filtered = tweets.filter(tweet => tweet.id !== id);
    setTweets(filtered);
  }
  return (
    <>
      {tweets.length > 0 && (
        <div className="posts">
          <ul>
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} onDelete={() => deleteTweet(tweet.id)}/>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
