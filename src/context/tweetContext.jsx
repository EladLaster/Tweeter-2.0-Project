import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const TweetContext = createContext(null);

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const { data, error } = await supabase
          .from('tweetTable')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setTweets(data);
      } catch {
        setError("Failed to fetch tweets");
      }
    };

    fetchTweets();
    const interval = setInterval(fetchTweets, 10000);
    return () => clearInterval(interval);
  }, []);

  const addTweet = async (content, userName) => {
    if (!content || !userName) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('tweetTable')
        .insert([{ content, userName, created_at: new Date().toISOString() }])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setTweets(prev => [data[0], ...prev]);
      } else {
        setTweets(prev => [{ content, userName, created_at: new Date().toISOString() }, ...prev]);
      }
    } catch (err) {
      setError(err.message || "Failed to add tweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TweetContext.Provider value={{ tweets, addTweet, loading, error }}>
      {children}
    </TweetContext.Provider>
  );
}
