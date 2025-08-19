import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export function Profile() {
  const { user, username, setUsername } = useContext(UserContext);
  const [nameInput, setNameInput] = useState(username);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setNameInput(username);
  }, [username]);

  const handleChange = (e) => setNameInput(e.target.value);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    await setUsername(nameInput.trim());
    setMessage("Profile updated!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const isDisabled = !nameInput.trim();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <form className="profile-form">
      <h2>Profile</h2>
      <label>
        Name:
        <input
          type="text"
          value={nameInput}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </label>
      <button onClick={handleSave} disabled={isDisabled}>
        Save
      </button>
      {message && <p className="success">{message}</p>}
      <p>Current user: <strong>{username}</strong></p>
    </form>
  );
}
