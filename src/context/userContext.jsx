import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved || "";
  });

  const saveUsername = (name) => {
    if (!name.trim()) return;
    setUsername(name);
    localStorage.setItem("username", name);
    };


  return (
    <UserContext.Provider value={{ username, setUsername: saveUsername }}>
      {children}
    </UserContext.Provider>
  );
}
