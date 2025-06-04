import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ClipboardList } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <Home size={18} /> Home
      </NavLink>
      <NavLink
        to="/notes"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <ClipboardList size={18} /> Notes
      </NavLink>
    </div>
  );
};

export default Navbar;
