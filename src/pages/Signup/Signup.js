import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.png";
import lockIcon from "../../assets/icons/lock_icon.png";
import whiteKing from "../../assets/images/white_king.png";
import blackPawn from "../../assets/images/black_pawn.png";
import confirmPasswordIcon from "../../assets/icons/confirm-password-icon.png";
import "./Signup.scss";

function Signup() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [elo, setElo] = useState("");

  //   Gets email.
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  //   Gets password.
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  //   Gets confirm password.
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  //   Gets name.
  const handleName = (event) => {
    setName(event.target.value);
  };
  //   Gets elo.
  const handleElo = (event) => {
    setElo(event.target.value);
  };

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();

    //Validate no empty fields
    if (!email || !password || !confirmPassword || !name || !elo) {
      return;
    }

    // Email validation
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return;
    }

    // Password validation
    // Makes sure the password has at least one special character, one number, and is between 6-16 characters.
    else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      return;
    } else if (password !== confirmPassword) {
      return;
    }

    const loginData = {
      email: email,
      password: password,
      name: name,
      elo: elo,
    };

    // Post if no errors
    if (!error) {
      axios
        .post("http://localhost:8080/users/register", loginData)
        .then((response) => {
          localStorage.authToken = response.data.token;
          window.location.href = "/chess";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const authToken = localStorage.authToken;

  return (
    <article className="signup">
      <h1 className="signup__header">Sign Up</h1>
      <form className="signup__form">
        <h2 className="signup__form-header">Login Information</h2>
        <div className="signup__form-field">
          <img src={userIcon} />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(event) => handleEmail(event)}
            className="signup__form-input"
          />
        </div>

        <div className="signup__form-field">
          <img src={lockIcon} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="off"
            onChange={(event) => handlePassword(event)}
            className="login__form-input"
          />
        </div>

        <div className="signup__form-field">
          <img src={confirmPasswordIcon} />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
            autoComplete="off"
            onChange={(event) => handleConfirmPassword(event)}
            className="login__form-input"
          />
        </div>

        <h2 className="signup__form-header">Account Info</h2>

        <div className="signup__form-field">
          <img src={whiteKing} />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="display name"
            autoComplete="off"
            onChange={(event) => handleName(event)}
            className="login__form-input"
          />
        </div>

        <div className="signup__form-field">
          <img src={blackPawn} />
          <input
            type="text"
            name="elo"
            id="elo"
            placeholder="estimated starting elo"
            autoComplete="off"
            onChange={(event) => handleElo(event)}
            className="login__form-input"
          />
        </div>

        <Link className="signup__button-container" to="/home">
          <button
            className="signup__button"
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </Link>
      </form>
    </article>
  );
}

export default Signup;
