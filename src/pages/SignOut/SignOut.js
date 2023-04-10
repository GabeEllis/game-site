import Navbar from "../Navbar/Navbar";
import signOut from "../../assets/icons/signout.png";
import "./SignOut.scss";

function SignOut() {
  // Logs the user out.
  localStorage.setItem("authToken", "");

  return (
    <>
      <Navbar />
      <article className="sign-out">
        <h1 className="sign-out__message">
          You have been successfully signed out!
        </h1>
        <img className="sign-out__icon" src={signOut} alt={signOut} />
      </article>
    </>
  );
}

export default SignOut;
