import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="./pages/Home/Home">Home</NavLink>
          </li>
          <li>
            <NavLink to="./pages/Sudoku/Sudoku">Sudoku</NavLink>
          </li>
          <li>
            <NavLink to="./pages/Chess/Chess">Chess</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
