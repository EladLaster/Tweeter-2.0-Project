import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const TweetContext = createContext(null);

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial tweets
  const fetchTweets = async () => {
    try {
      const { data, error } = await supabase
        .from("tweetTable")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTweets(data);
    } catch (err) {
      setError("Failed to fetch tweets");
    }
  };

  useEffect(() => {
  fetchTweets();

  // יצירת channel חדש ל-realtime
  const channel = supabase
    .channel('tweetTable')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tweetTable' }, (payload) => {
      setTweets((prev) => [payload.new, ...prev]);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel); // הסרה נקייה כשקמפו יוצא מה-DOM
  };
}, []);


  const addTweet = async (content, userName) => {
    if (!content || !userName) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("tweetTable")
        .insert([{ content, userName, created_at: new Date().toISOString() }])
        .select();

      if (error) throw error;

      // Optional: add immediately to state (optimistic update)
      if (data && data.length > 0) {
        setTweets((prev) => [data[0], ...prev]);
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