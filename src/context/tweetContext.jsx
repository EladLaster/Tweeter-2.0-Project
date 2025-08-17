import { createContext, useState, useEffect } from "react";

export const TweetContext = createContext(null);


const API_URL = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

export function TweetProvider({ children }) {

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    setLoading(true);
    fetch(`${API_URL}?apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setTweets(data.sort((a,b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch tweets");
        setLoading(false);
      });
  }, []);

  const addTweet = async (content, userName) => {
    setLoading(true);
    setError(null);
    const newTweet = {
      content,
      userName,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_URL}?apikey=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(newTweet)
      });

      if (!res.ok) throw new Error("Failed to post tweet");

      const data = await res.json();
      setTweets(prev => [data[0], ...prev]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <TweetContext.Provider value={{ tweets, addTweet, loading, error }}>
      {children}
    </TweetContext.Provider>
  );
}
