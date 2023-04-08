import "./Chess.scss";
// import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
// import Footer from "./components/Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Chess() {
  return (
    <>
      <main className="chess">
        <Navbar />
        <Board />
      </main>
    </>
  );
}

export default Chess;
