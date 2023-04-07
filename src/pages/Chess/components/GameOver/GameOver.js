import "./GameOver.scss";

function GameOver({ gameStatus, whoseTurn }) {
  let gameOverMessage;

  if (gameStatus) {
    if (whoseTurn === "white") {
      gameOverMessage = "Black wins by checkmate";
    } else if (whoseTurn === "black") {
      gameOverMessage = "White wins by checkmate";
    }
  }

  return <h1>{gameOverMessage}</h1>;
}

export default GameOver;
