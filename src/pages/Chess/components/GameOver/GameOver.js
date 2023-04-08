import "./GameOver.scss";

function GameOver({ gameStatus, whoseTurn, stalemateStatus }) {
  let gameOverMessage;

  if (gameStatus) {
    if (stalemateStatus) {
      gameOverMessage = "Draw by Stalemate";
    } else if (whoseTurn === "white") {
      gameOverMessage = "Black won by checkmate";
    } else if (whoseTurn === "black") {
      gameOverMessage = "White won by checkmate";
    }
  }

  return <h1>{gameOverMessage}</h1>;
}

export default GameOver;
