import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); // שם זמני שניתן לשנות

  useEffect(() => {
    // קבלת המשתמש הנוכחי
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);
        // אם אין שם זמני, נשתמש בחלק מהאימייל כברירת מחדל
        setUsername(data.user.email.split("@")[0]);
      }
    };
    fetchUser();

    // מאזין לשינויי התחברות
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser && !username) {
        setUsername(currentUser.email.split("@")[0]);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    setUsername(data.user.email.split("@")[0]); // שם זמני ברירת מחדל
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername("");
  };

  const saveUsername = (name) => {
    if (!name.trim()) return;
    setUsername(name.trim());
  };

  return (
    <UserContext.Provider value={{ user, username, login, logout, setUsername: saveUsername }}>
      {children}
    </UserContext.Provider>
  );
}
