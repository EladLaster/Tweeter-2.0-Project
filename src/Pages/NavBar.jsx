import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./NavBar.css";

export function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        {user && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Profile
            </NavLink>
          </>
        )}
      </div>
      <div className="nav-right user-actions">
        {!user && (
          <>
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </>
        )}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
