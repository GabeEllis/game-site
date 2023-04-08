import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Home from "./pages/Home/Home";
// import Sudoku from "./pages/Sudoku/Sudoku";
import Chess from "./pages/Chess/Chess";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import NoPage from "./pages/NoPage/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/sudoku" element={<Sudoku />}></Route> */}
      <Route path="/chess" element={<Chess />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
