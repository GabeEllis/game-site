import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.scss";

function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          window.location.href = "/";
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
          <label className="login__form-label">email</label>
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
          <label className="login__form-label">password</label>
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
      <Link className="login__signup" to="/signup">
        <p>Don't have an account?</p>
      </Link>
    </article>
  );
}

export default Signup;
