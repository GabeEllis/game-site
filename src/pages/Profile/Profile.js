import "./Profile.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Tile from "../Chess/components/Tile/Tile";
import startingBoard from "../Chess/utilty/startingBoard.json";

function Profile() {
  // State variables created for profile pref data.
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [elo, setElo] = useState("");
  const [theme, setTheme] = useState("");
  const [themeArray, setThemeArray] = useState([]);

  // State variables for user created custom theme.
  const [newThemeName, setNewThemeName] = useState("");
  const [newThemeLight, setNewThemeLight] = useState("");
  const [newThemeDark, setNewThemeDark] = useState("");

  // Gets the data for the theme optons from the database.
  useEffect(() => {
    axios.get("http://localhost:8080/themes").then((response) => {
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
      .get("http://localhost:8080/preferences", {
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
      })
      .catch((error) => {});
  }, [authToken]);

  //   Changes the value of name when the user types.
  const handleName = (e) => {
    setName(e.target.value);
  };
  //   Changes the value of theme when the user types.
  const handleTheme = (e) => {
    setTheme(e.target.value);
  };
  //   Changes the value of new theme name when the user types.
  const handleNewThemeName = (e) => {
    setNewThemeName(e.target.value);
  };
  //   Changes the value of new theme light square color when the user types.
  const handleNewThemeLight = (e) => {
    setNewThemeLight(e.target.value);
  };
  //   Changes the value of new theme dark square color when the user types.
  const handleNewThemeDark = (e) => {
    setNewThemeDark(e.target.value);
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
      .put(`http://localhost:8080/preferences/${id}`, prefData)
      .then((response) => {
        // Takes the user back to chess after they update their profile.
        window.location.href = "/chess";
        if (newThemeName) {
          axios
            .post("http://localhost:8080/themes", newThemeData)
            .then((response) => {
              // Get the updated list of themes after a new one is made. Then sorts so that new is last.
              setThemeArray(sortThemeArray(response.data));
            });
        }
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

          <section className="board">
            {startingBoard.map((tile, index) => {
              return (
                <Tile
                  key={tile.id}
                  id={tile.id}
                  value={tile.value}
                  squareColor={tile.squareColor}
                  theme={theme}
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
