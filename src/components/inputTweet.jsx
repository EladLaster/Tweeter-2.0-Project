import { useContext, useState } from "react";
import { TweetContext } from "../context/tweetContext";
import { UserContext } from "../context/userContext";
import "./inputTweet.css";

export function InputTweet() {
  const [text, setText] = useState("");
  const { addTweet, loading, error } = useContext(TweetContext);
  const { user } = useContext(UserContext); // השתנה מ-username ל-user

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || text.length > 140 || loading || !user) return;

    // שולח את המייל של המשתמש כ-userName
    await addTweet(text, user.email); 
    setText("");
  };

  const keydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isDisabled = !text.trim() || text.length > 140 || loading || !user;

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
          disabled={loading || !user}
        />
        <button onClick={handleSubmit} disabled={isDisabled}>
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>
      {!user && <div className="error">Set your username first!</div>}
      <div className={`char-counter ${text.length > 140 ? "over-limit" : ""}`}>
        {text.length} / 140
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
