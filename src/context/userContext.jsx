import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);
        setUsername(data.user.user_metadata?.full_name || data.user.email.split("@")[0]);
      }
      setLoadingUser(false);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        setUsername(currentUser.user_metadata?.full_name || currentUser.email.split("@")[0]);
      }
      setLoadingUser(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    setUser(data.user);
    setUsername(data.user.user_metadata?.full_name || data.user.email.split("@")[0]);
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername("");
  };

  const saveUsername = async (name) => {
    if (!name.trim()) return;

    setUsername(name.trim());

    if (user) {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() }
      });
      if (error) console.error("Error updating username in Supabase:", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, username, login, logout, setUsername: saveUsername, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}
