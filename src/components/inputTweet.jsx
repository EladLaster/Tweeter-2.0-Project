import { useContext, useState } from "react";
import { TweetContext } from "../context/tweetContext";
import "./inputTweet.css";

const USERNAME = "Elad";

export function InputTweet() {
  const [text, setText] = useState("");
  const { addTweet, loading, error } = useContext(TweetContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || text.length > 140 || loading) return;
    await addTweet(text, USERNAME);
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
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim() || text.length > 140 || loading}
      >
        {loading ? "Posting..." : "Tweet"}
      </button>
      <div className={`char-counter ${text.length > 140 ? "over-limit" : ""}`}>
        {text.length} / 140
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
