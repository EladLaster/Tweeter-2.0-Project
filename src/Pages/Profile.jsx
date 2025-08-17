import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "./profile.css";

export function Profile() {
  const { username, setUsername } = useContext(UserContext);
  const [nameInput, setNameInput] = useState(username);

  const handleChange = (e) => setNameInput(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUsername(nameInput);
  };

  return (
    <form className="profile-form">
      <h2>Profile</h2>
      <label>
        User Name:
        <input 
          type="text" 
          value={nameInput} 
          onChange={handleChange} 
          placeholder="Enter your name" 
        />
      </label>
      <button onClick={handleSave}>Save</button>
      {username && <p>Current user: <strong>{username}</strong></p>}
    </form>
  );
}
