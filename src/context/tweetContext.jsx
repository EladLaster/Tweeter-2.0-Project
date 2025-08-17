import { createContext, useState, useEffect } from "react";

export const TweetContext = createContext(null);

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState(() => {
    const saved = localStorage.getItem("tweets");
    return saved ? JSON.parse(saved) : [];
  });

  // עדכון localStorage בכל שינוי
  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
}
