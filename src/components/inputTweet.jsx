import { useContext, useState } from "react";
import { TweetContext } from "../context/tweetContext";
import { UserContext } from "../context/userContext";
import "./inputTweet.css";

export function InputTweet() {
  const [text, setText] = useState("");
  const { addTweet, loading, error } = useContext(TweetContext);
  const { user, username } = useContext(UserContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || text.length > 140 || loading || !user || !username) return;

    await addTweet(text, username); // שולח תמיד את השם המעודכן
    setText("");
  };

  const keydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isDisabled = !text.trim() || text.length > 140 || loading || !user || !username;

  if (!user) return <p>Please log in to create a tweet.</p>;

  return (
    <div className="tweet-container">
      <h3 className="tweet-title">Create a Tweet</h3>
      <div className="tweet-input-group">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={keydown}
          placeholder="What's on your mind?"
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={isDisabled}>
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>
      {!username && <div className="error">Set your username first!</div>}
      <div className={`char-counter ${text.length > 140 ? "over-limit" : ""}`}>
        {text.length} / 140
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
