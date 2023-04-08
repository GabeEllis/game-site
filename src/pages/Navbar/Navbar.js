import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
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
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
      {/* <Outlet /> */}
    </>
  );
}

export default Navbar;
