import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import { Tweet } from "./tweet";
import "./tweetList.css";

export function TweetList() {
  const { tweets, loading, error } = useContext(TweetContext);

  if (error) return <p className="error">{error}</p>;
  if (loading && (!tweets || tweets.length === 0)) return <p>Loading tweets...</p>;
  if (!tweets || tweets.length === 0) return <p>No tweets yet</p>;

  return (
    <div className="posts">
      <ul>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} /> 
        ))}
      </ul>
    </div>
  );
}
