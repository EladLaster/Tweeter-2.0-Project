import { NavLink } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}
