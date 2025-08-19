import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const TweetContext = createContext(null);

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // פונקציה למשיכת כל הציוצים הקיימים מה-DB
    const fetchTweets = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("tweetTable")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTweets(data);
      } catch (err) {
        setError("Failed to fetch tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();

    // Subscription ל-INSERTים חדשים בזמן אמת
    const subscription = supabase
      .channel("public:tweetTable")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tweetTable" },
        (payload) => {
          setTweets((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // פונקציה להוספת ציוץ חדש
  const addTweet = async (content, userName) => {
    if (!content || !userName) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("tweetTable")
        .insert([{ content, userName, created_at: new Date().toISOString() }])
        .select(); // מחזיר את הנתונים שנוספו

      if (error) throw error;

      // מעדכן state מיידית (לצורך UI responsiveness)
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
