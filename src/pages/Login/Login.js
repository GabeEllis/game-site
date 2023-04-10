import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.png";
import lockIcon from "../../assets/icons/lock_icon.png";
import "./Login.scss";

function Signup() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Gets email.
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  //   Gets password.
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    //Validate no empty fields
    if (!email || !password) {
      setError(
        <div className="error-message">
          Missing one or more required fields.
        </div>
      );
    }

    // Email validation
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError(
        <div className="error-message">
          "Please enter a valid email address."
        </div>
      );
    }

    // Password validation
    // Makes sure the password has at least one special character, one number, and is between 6-16 characters.
    else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      setError(
        <div className="error-message">"Please enter a valid password."</div>
      );
    } else {
      setError("");
    }

    const loginData = {
      email: email,
      password: password,
    };

    // Post if no errors
    if (!error) {
      axios
        .post("http://localhost:8080/users/login", loginData)
        .then((response) => {
          localStorage.authToken = response.data.token;
          window.location.href = "/chess";
        })
        .catch((error) => {});
    }
  };

  const authToken = localStorage.authToken;

  return (
    <article className="login">
      <h1 className="login__header">Login</h1>
      <form className="login__form">
        <div className="login__form-field">
          <img src={userIcon} />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(event) => handleEmail(event)}
            className="login__form-input"
          />
        </div>

        <div className="login__form-field">
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

        <Link className="login__button-container" to="/home">
          <button
            className="login__button"
            type="submit"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </Link>
      </form>
      <p className="login__signup-header">Don't have an account?</p>
      <Link className="login__signup" to="/signup">
        <p> Sign up </p>
      </Link>
    </article>
  );
}

export default Signup;
