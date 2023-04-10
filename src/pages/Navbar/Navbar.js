import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  const authToken = localStorage.authToken;

  if (authToken) {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/sudoku">Sudoku</NavLink>
          </li>
          <li>
            <NavLink to="/chess">Chess</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/sudoku">Sudoku</NavLink>
        </li>
        <li>
          <NavLink to="/chess">Chess</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
