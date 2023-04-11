import "./Chess.scss";
// import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
// import Footer from "./components/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

function Chess() {
  const [name, setName] = useState("Player 1");
  const [elo, setElo] = useState("1000");
  const [theme, setTheme] = useState("option1");

  const authToken = localStorage.authToken;

  useEffect(() => {
    axios
      .get("http://localhost:8080/preferences", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setName(response.data[0].name);
        setElo(response.data[0].elo);
        setTheme(response.data[0].theme);
      })
      .catch((error) => {});
  }, [authToken]);

  return (
    <main>
      <Navbar />
      <Board name={name} elo={elo} theme={theme} />
    </main>
  );
}

export default Chess;
