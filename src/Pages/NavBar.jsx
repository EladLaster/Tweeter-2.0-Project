import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./navbar.css";

export function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Profile
        </NavLink>
      </div>
      <div className="nav-right user-actions">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login"><button>Login</button></NavLink>
        )}
      </div>
    </nav>
  );
}
