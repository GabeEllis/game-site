import "./Chess.scss";
// import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
// import Footer from "./components/Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Chess() {
  return (
    <main>
      <Navbar />
      <Board name={"Player 1"} elo={"1000"} />
    </main>
  );
}

export default Chess;
