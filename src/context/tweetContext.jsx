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
      } catch (err) {
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
        .insert([{ content, userName }])
        .select();

      if (error) throw error;
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
