import "./NoPage.scss";
import sadKnight from "../../assets/images/404_sad_knight.png";
import Navbar from "../Navbar/Navbar";

function NoPage() {
  return (
    <>
      <Navbar />
      <article className="no-page">
        <h1 className="no-page__header">404 Page Not Found</h1>
        <img className="no-page__image" src={sadKnight} />
      </article>
    </>
  );
}

export default NoPage;
