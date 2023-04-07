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
            <NavLink to="/Sudoku">Sudoku</NavLink>
          </li>
          <li>
            <NavLink to="/Chess">Chess</NavLink>
          </li>
        </ul>
      </nav>
      {/* <Outlet /> */}
    </>
  );
}

export default Navbar;
