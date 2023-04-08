import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  //   When the user clicks submit, run this function.
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    //Validate no empty fields
    if (!email || !password || !confirmPassword) {
      console.log("One or more required fields are missing");
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
      console.log("Please enter a valid password.");
      setError(
        <div className="error-message">"Please enter a valid password."</div>
      );
    } else if (password !== confirmPassword) {
      console.log("Please make sure your passwords match.");
      setError(
        <div className="error-message">
          "Please make sure your passwords match."
        </div>
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
          console.log(response.data);
          setSubmitted(true);
          setSuccessMessage("Successfully logged in!");
          //   window.location.href = "/chess";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <article className="login">
      <h1 className="login__header">Login Page</h1>
      <form className="login__form">
        <div className="login__form-field">
          <label className="login__form-label">
            email
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              onChange={(event) => handleEmail(event)}
              className="login__form-input"
            />
          </label>
        </div>

        <div className="login__form-field">
          <label className="login__form-label">
            password
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              onChange={(event) => handlePassword(event)}
              className="login__form-input"
            />
          </label>
        </div>

        <div className="login__form-field">
          <label className="login__form-label">
            confirm password
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm password"
              onChange={(event) => handleConfirmPassword(event)}
              className="login__form-input"
            />
          </label>
        </div>

        <div className="login__button-container">
          <Link to="/warehouses">
            <button
              className="login__button"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </article>
  );
}

export default Login;
