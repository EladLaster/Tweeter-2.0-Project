import { useContext, useState } from "react";
import { TweetContext } from "../context/tweetContext";
import { UserContext } from "../context/userContext";
import "./inputTweet.css";

export function InputTweet() {
  const [text, setText] = useState("");
  const { addTweet, loading, error } = useContext(TweetContext);
  const { username } = useContext(UserContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || text.length > 140 || loading || !username) return;
    await addTweet(text, username);
    setText("");
  };

  const keydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="new-post">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={keydown}
        placeholder="What's on your mind?"
        disabled={loading || !username}
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim() || text.length > 140 || loading || !username}
      >
        {loading ? "Posting..." : "Tweet"}
      </button>
      {!username && <div className="error">Set your username first!</div>}
      <div className={`char-counter ${text.length > 140 ? "over-limit" : ""}`}>
        {text.length} / 140
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
