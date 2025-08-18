import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "./profile.css";

export function Profile() {
  const { user } = useContext(UserContext); // משתמשים ב-user במקום username
  const [nameInput, setNameInput] = useState(user?.email || ""); // או user_metadata.full_name אם שמרת שם

  const handleChange = (e) => setNameInput(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    // כאן אפשר לעדכן את user_metadata ב-Supabase אם רוצים לשמור שם
    alert("Profile updated (not yet saved to Supabase)");
  };

  const isDisabled = !nameInput.trim();

  if (!user) return <p>Please log in to see your profile.</p>;

  return (
    <form className="profile-form">
      <h2>Profile</h2>
      <label>
        Email:
        <input 
          type="text" 
          value={nameInput} 
          onChange={handleChange} 
          placeholder="Enter your name" 
        />
      </label>
      <button 
        onClick={handleSave} 
        disabled={isDisabled}
      >
        Save
      </button>
      <p>Current user: <strong>{user.email}</strong></p>
    </form>
  );
}
