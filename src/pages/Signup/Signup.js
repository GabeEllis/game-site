import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.png";
import lockIcon from "../../assets/icons/lock_icon.png";
import confirmPasswordIcon from "../../assets/icons/confirm-password-icon.png";
import "./Signup.scss";

function Signup() {
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
        .post("http://localhost:8080/users/register", loginData)
        .then((response) => {
          console.log(response.data);
          setSubmitted(true);
          setSuccessMessage("Successfully signed up!");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <article className="signup">
      <h1 className="signup__header">Sign Up</h1>
      <form className="signup__form">
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
