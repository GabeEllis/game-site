import "./Profile.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Tile from "../Chess/components/Tile/Tile";
import startingBoard from "../Chess/data/startingBoard.json";

function Profile() {
  // State variables created for profile pref data.
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [elo, setElo] = useState("");
  const [theme, setTheme] = useState("");
  const [themeArray, setThemeArray] = useState([]);

  // Intializes the state variables for dark and light color squares.
  const [lightColor, setLightColor] = useState("white");
  const [darkColor, setDarkColor] = useState("grey");

  // State variables for user created custom theme.
  const [newThemeName, setNewThemeName] = useState("");
  const [newThemeLight, setNewThemeLight] = useState("white");
  const [newThemeDark, setNewThemeDark] = useState("grey");

  // Gets the data for the theme optons from the database.
  useEffect(() => {
    axios
      .get("https://game-site-server.onrender.com/themes")
      .then((response) => {
        // Gets the intialized list of themes, then sorts so that new is last.
        setThemeArray(sortThemeArray(response.data));
      });
  }, []);

  // Sorts the theme array so that the new theme option is always at the bottom.
  function sortThemeArray(themeOptions) {
    const sortedThemeArray = themeOptions.sort((a, b) => {
      if (b.name === "new") {
        return -1;
      }
    });
    return sortedThemeArray;
  }

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
        setId(response.data[0].user_id);
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

  //   Changes the value of name when the user types.
  const handleName = (e) => {
    setName(e.target.value);
  };
  //   Changes the value of theme when the user selects a new.
  const handleTheme = (e) => {
    setTheme(e.target.value);

    if (e.target.value !== "new") {
      axios
        .get("https://game-site-server.onrender.com/themes")
        .then((response) => {
          // Gets a list of all themes and filters based on the matching theme name.
          const themeList = response.data;
          const filteredTheme = themeList.filter((themeItem) => {
            return themeItem.name === e.target.value;
          });

          // Sets the light and dark square color to match the applied theme.
          setLightColor(filteredTheme[0].light);
          setDarkColor(filteredTheme[0].dark);
        });
    }
  };
  //   Changes the value of new theme name when the user types the name.
  const handleNewThemeName = (e) => {
    setNewThemeName(e.target.value);
  };
  //   Changes the value of new theme light square color when the user changes the color.
  const handleNewThemeLight = (e) => {
    setNewThemeLight(e.target.value);

    // Sets the light square color to match the new theme if a value has been selected.
    if (e.target.value) {
      setLightColor(e.target.value);
    }
  };
  //   Changes the value of new theme dark square color when the user changes the color.
  const handleNewThemeDark = (e) => {
    setNewThemeDark(e.target.value);

    // Sets the dark square color to match the new theme if a value has been selected.
    if (e.target.value) {
      setDarkColor(e.target.value);
    }
  };

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();

    //Validate no empty fields
    if (!name || !theme) {
      return;
    }

    // Intializes the body data for changing user pref data.
    let prefData = {
      name: name,
      elo: elo,
      theme: theme,
    };

    // Intializes the body data for custom theme data.
    let newThemeData;

    // If the user tried to create a new custom theme, change the data in the requests.
    if (newThemeName) {
      prefData = {
        name: name,
        elo: elo,
        theme: newThemeName,
      };
      newThemeData = {
        name: newThemeName,
        light: newThemeLight,
        dark: newThemeDark,
      };
    }

    // Put if no errors
    axios
      .put(`https://game-site-server.onrender.com/preferences/${id}`, prefData)
      .then((response) => {
        // Takes the user back to chess after they update their profile.
        if (newThemeName) {
          axios
            .post("https://game-site-server.onrender.com/themes", newThemeData)
            .then((response) => {
              // Get the updated list of themes after a new one is made. Then sorts so that new is last.
              setThemeArray(sortThemeArray(response.data));
            });
        }
        window.location.href = "/chess";
      })
      .catch((error) => {});
  };

  return (
    <>
      <Navbar />
      <article className="profile">
        <h1 className="profile__header">Profile</h1>
        <form className="profile__form">
          <section className="profile__input-container">
            <label className="profile__label">Name:&nbsp;</label>
            <input
              className="profile__input"
              autoComplete="off"
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleName(e)}
            ></input>
            <span
              className={!name ? "profile__error" : "profile__error--hidden"}
            >
              This field is required
            </span>
          </section>

          <section className="profile__elo-container">
            <p>Elo: {elo}</p>
          </section>

          <section className="profile__input-container">
            <label className="profile__label">Theme:&nbsp;</label>
            <select
              type="text"
              name="theme"
              id="theme"
              value={theme}
              onChange={(event) => handleTheme(event)}
              className="profile__input-dropdown"
            >
              {themeArray.map((theme) => {
                return (
                  <option value={theme.name} key={theme.id} id={theme.id}>
                    {theme.name}
                  </option>
                );
              })}
            </select>
          </section>

          <section
            className={
              theme === "new"
                ? "profile__new-theme"
                : "profile__new-theme--hidden"
            }
          >
            <div className="profile__new-theme-data">
              <label className="profile__label">Theme Name:&nbsp;</label>
              <input
                className="profile__input"
                autoComplete="off"
                type="text"
                name="name"
                placeholder="new theme name"
                onChange={(e) => handleNewThemeName(e)}
              ></input>
            </div>

            <div className="profile__new-theme-data">
              <label className="profile__label">Light Square:&nbsp;</label>
              <input
                className="profile__input"
                autoComplete="off"
                type="color"
                name="name"
                placeholder="new theme name"
                onChange={(e) => handleNewThemeLight(e)}
              ></input>
            </div>

            <div className="profile__new-theme-data">
              <label className="profile__label">Dark Square:&nbsp;</label>
              <input
                className="profile__input"
                autoComplete="off"
                type="color"
                name="name"
                placeholder="new theme name"
                onChange={(e) => handleNewThemeDark(e)}
              ></input>
            </div>
          </section>

          <section className="profile__board">
            {startingBoard.map((tile, index) => {
              return (
                <Tile
                  key={tile.id}
                  id={tile.id}
                  value={tile.value}
                  squareColor={tile.squareColor}
                  lightColor={lightColor}
                  darkColor={darkColor}
                />
              );
            })}
          </section>

          <Link className="profile__button-container" to="/chess">
            <button
              className="profile__button"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </Link>
        </form>
      </article>
    </>
  );
}

export default Profile;
