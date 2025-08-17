import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import { Tweet } from "./tweet";
import "./tweetList.css";

export function TweetList() {
  const { tweets, loading } = useContext(TweetContext);

  if (loading && tweets.length === 0) return <p>Loading tweets...</p>;
  if (!tweets || tweets.length === 0) return <p>No tweets yet</p>;

  return (
    <div className="posts">
      <ul>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id || tweet.date} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
}
