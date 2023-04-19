import "./Chess.scss";
// import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
// import Footer from "./components/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

function Chess() {
  // State variables created for profile pref data.
  const [name, setName] = useState("Player 1");
  const [elo, setElo] = useState("1000");
  const [theme, setTheme] = useState("option1");

  // Intializes the state variables for dark and light color squares.
  const [lightColor, setLightColor] = useState("white");
  const [darkColor, setDarkColor] = useState("grey");

  const authToken = localStorage.authToken;

  // Gets the users pref data using their authToken.
  useEffect(() => {
    axios
      .get("https://game-site-server.onrender.com/preferences", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // Sets the user profile pref data from the user's stored values in the database.
        setName(response.data[0].name);
        setElo(response.data[0].elo);
        setTheme(response.data[0].theme);

        axios
          .get("https://game-site-server.onrender.com/themes")
          .then((res) => {
            // Gets a list of all themes and filters based on the matching theme name.
            const themeList = res.data;
            const filteredTheme = themeList.filter((themeItem) => {
              return themeItem.name === response.data[0].theme;
            });

            // Sets the light and dark square color to match the applied theme.
            setLightColor(filteredTheme[0].light);
            setDarkColor(filteredTheme[0].dark);
          });
      })
      .catch((error) => {});
  }, [authToken]);

  return (
    <main className="chess">
      <Navbar />
      <Board
        name={name}
        elo={elo}
        theme={theme}
        lightColor={lightColor}
        darkColor={darkColor}
      />
    </main>
  );
}

export default Chess;
