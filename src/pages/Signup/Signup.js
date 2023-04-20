import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.png";
import lockIcon from "../../assets/icons/lock_icon.png";
import whiteKing from "../../assets/images/white_king.png";
import blackPawn from "../../assets/images/black_pawn.png";
import confirmPasswordIcon from "../../assets/icons/confirm-password-icon.png";
import Navbar from "../Navbar/Navbar";
import "./Signup.scss";

function Signup() {
  // State variables for form data.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [elo, setElo] = useState("");

  // State variables for form errors.
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [eloError, setEloError] = useState(false);

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

  //   Gets confirm password.
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);

    // Checks to see if confirm password isn't valid, if not applies error if so removes error.
    if (isConfirmPasswordValid(event.target.value)) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  };

  //   Gets name.
  const handleName = (event) => {
    setName(event.target.value);

    // Checks to see if name is valid, if not applies error if so removes error.
    if (event.target.value) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  //   Gets elo.
  const handleElo = (event) => {
    setElo(event.target.value);

    // Checks to see if elo is valid, if not applies error if so removes error.
    if (isEloValid(event.target.value)) {
      setEloError(false);
    } else {
      setEloError(true);
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

  // Confirm password validation, makes sure password and confirm password match.
  function isConfirmPasswordValid(confirmPassword) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  // Confirm password validation, makes sure password and confirm password match.
  function isEloValid(elo) {
    if (!/^\d+$/.test(elo) || elo.length > 4) {
      return false;
    }
    return true;
  }

  // Checks to see if the form information is valid.
  const isFormValid = () => {
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      nameError ||
      eloError
    ) {
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
      name: name,
      elo: elo,
    };

    // Post if no errors
    if (isFormValid() === true) {
      axios
        .post("https://game-site-server.onrender.com/users/register", loginData)
        .then((response) => {
          localStorage.authToken = response.data.token;
          window.location.href = "/chess";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <article className="signup">
        <h1 className="signup__header">Sign Up</h1>
        <form className="signup__form">
          <h2 className="signup__form-header">Login Information</h2>
          <section className="signup__form-field-container">
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

            <span
              className={
                emailError ? "signup__form-error" : "signup__form-error--hidden"
              }
            >
              Please enter a valid email address.
            </span>
          </section>

          <section className="signup__form-field-container">
            <div className="signup__form-field">
              <img src={lockIcon} />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                autoComplete="off"
                onChange={(event) => handlePassword(event)}
                className="signup__form-input"
              />
            </div>

            <span
              className={
                passwordError
                  ? "signup__form-error"
                  : "signup__form-error--hidden"
              }
            >
              Please enter a valid password.
            </span>
          </section>

          <section className="signup__form-field-container">
            <div className="signup__form-field">
              <img src={confirmPasswordIcon} />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="confirm password"
                autoComplete="off"
                onChange={(event) => handleConfirmPassword(event)}
                className="signup__form-input"
              />
            </div>

            <span
              className={
                confirmPasswordError
                  ? "signup__form-error"
                  : "signup__form-error--hidden"
              }
            >
              Please make sure passwords match.
            </span>
          </section>

          <h2 className="signup__form-header">Account Info</h2>

          <section className="signup__form-field-container">
            <div className="signup__form-field">
              <img src={whiteKing} />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="display name"
                autoComplete="off"
                onChange={(event) => handleName(event)}
                className="signup__form-input"
              />
            </div>

            <span
              className={
                nameError ? "signup__form-error" : "signup__form-error--hidden"
              }
            >
              Please enter a display name.
            </span>
          </section>

          <section className="signup__form-field-container">
            <div className="signup__form-field">
              <img src={blackPawn} />
              <input
                type="text"
                name="elo"
                id="elo"
                placeholder="estimated starting elo"
                autoComplete="off"
                onChange={(event) => handleElo(event)}
                className="signup__form-input"
              />
            </div>

            <span
              className={
                eloError ? "signup__form-error" : "signup__form-error--hidden"
              }
            >
              Please enter a number with less than 5 digits.
            </span>
          </section>

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
    </>
  );
}

export default Signup;
