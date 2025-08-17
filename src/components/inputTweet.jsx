import { useContext, useState } from "react";
import "./inputTweet.css"
import { TweetContext } from "../context/tweetContext";

const USERNAME = "Elad";

export function InputTweet() {
  const [text, setText] = useState("");
  const {tweets,setTweets} = useContext(TweetContext);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    if (!text.trim() || text.length > 140) 
        return;
    const newTweet = { 
        id: Date.now(), 
        text, 
        username: USERNAME,
        time: new Date().toLocaleString()
    };
    setTweets([newTweet, ...tweets]);
    setText("");
  }
  function keydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmit();
  }
}

  return (
    <>
    <div className="new-post">
        <input
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={keydown}
            placeholder="What's on your mind?"
            />
            <button 
            onClick={handleSubmit}
            disabled={text.length === 0 || text.length > 140}
        >Tweet</button>
        <div className={`char-counter ${text.length > 140 ? "over-limit" : ""}`}>
            {text.length} / 140
        </div>

    </div>
    </>
  );
}
