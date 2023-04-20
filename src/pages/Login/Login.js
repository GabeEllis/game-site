import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.png";
import lockIcon from "../../assets/icons/lock_icon.png";
import Navbar from "../Navbar/Navbar";
import "./Login.scss";

function Signup() {
  // State variables for form data.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for form errors.
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //   Gets email.
  const handleEmail = (event) => {
    setEmail(event.target.value);

    // Checks to see if email isn't valid, if not applies error if so removes error.
    if (isEmailValid(event.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  //   Gets password.
  const handlePassword = (event) => {
    setPassword(event.target.value);

    // Checks to see if password isn't valid, if not applies error if so removes error.
    if (isPasswordValid(event.target.value)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // Email validation
  function isEmailValid(email) {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return false;
    }
    return true;
  }

  // Password validation, makes sure the password has at least one special character, one number, and is between 6-16 characters.
  function isPasswordValid(password) {
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      return false;
    }
    return true;
  }

  // Checks to see if the form information is valid.
  const isFormValid = () => {
    if (emailError || passwordError) {
      return false;
    }

    return true;
  };

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    // Post if no errors
    if (isFormValid() === true) {
      axios
        .post("https://game-site-server.onrender.com/users/login", loginData)
        .then((response) => {
          localStorage.authToken = response.data.token;
          window.location.href = "/chess";
        })
        .catch((error) => {});
    }
  };

  const authToken = localStorage.authToken;

  return (
    <>
      <Navbar />
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

          <span
            className={emailError ? "profile__error" : "profile__error--hidden"}
          >
            Please enter a valid email address.
          </span>

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

          <span
            className={
              passwordError ? "profile__error" : "profile__error--hidden"
            }
          >
            Please enter a valid password.
          </span>

          <Link className="login__button-container" to="/chess">
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
    </>
  );
}

export default Signup;
