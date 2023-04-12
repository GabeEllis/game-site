import "./Profile.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Tile from "../Chess/components/Tile/Tile";
import startingBoard from "../Chess/utilty/startingBoard.json";

function Profile() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [elo, setElo] = useState("");
  const [theme, setTheme] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [themeArray, setThemeArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/themes").then((response) => {
      setThemeArray(response.data);
    });
  }, []);

  const authToken = localStorage.authToken;

  useEffect(() => {
    axios
      .get("http://localhost:8080/preferences", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
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
  //   Changes the value of new theme when the user types.
  const handleNewTheme = (e) => {
    setNewTheme(e.target.value);
  };

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();

    //Validate no empty fields
    if (!name || !theme) {
      return;
    }

    let prefData = {
      name: name,
      elo: elo,
      theme: theme,
    };

    let newThemeData;

    if (newTheme) {
      prefData = {
        name: name,
        elo: elo,
        theme: newTheme,
      };
      newThemeData = {
        name: newTheme,
      };
    }

    // Put if no errors
    axios
      .put(`http://localhost:8080/preferences/${id}`, prefData)
      .then((response) => {
        window.location.href = "/chess";
        if (newTheme) {
          axios
            .post("http://localhost:8080/themes", newThemeData)
            .then((response) => {
              setThemeArray(response.data);
            });
        }
      })
      .catch((error) => {});
  };

  console.log(themeArray);

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
            <label className="profile__label">Theme Name:&nbsp;</label>
            <input
              className="profile__input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="new theme name"
              onChange={(e) => handleNewTheme(e)}
            ></input>
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
