import { InputTweet } from "../components/inputTweet";
import { TweetList } from "../components/tweetList";
import "./Home.css"

export function Home() {
  return (
    <div className="home-container">
      <InputTweet />
      <TweetList />
    </div>
  );
}

