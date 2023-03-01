import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Home from "./pages/Home/Home";
import Sudoku from "./pages/Sudoku/Sudoku";
import Chess from "./pages/Chess/Chess";
import NoPage from "./pages/NoPage/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<Home />} />
      <Route path="sudoku" element={<Sudoku />}></Route>
      <Route path="chess" element={<Chess />}></Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
