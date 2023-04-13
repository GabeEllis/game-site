import "./GameOver.scss";

function GameOver({
  gameStatus,
  whoseTurn,
  stalemateStatus,
  copponentHandler,
}) {
  // Intialize game over message.
  let gameOverMessage;

  // If the game is over.
  if (gameStatus) {
    // If the game is over and it always was a stalemate.
    if (stalemateStatus) {
      gameOverMessage = "Draw by Stalemate";
      // If the game ended and the next turn is white, black won.
    } else if (whoseTurn === "white") {
      gameOverMessage = "Black won by checkmate";
      // If the game ended and the next turn is black, white won.
    } else if (whoseTurn === "black") {
      gameOverMessage = "White won by checkmate";
    }
  }

  // If the game is still going, return nothing.
  if (!gameStatus) {
    return;
  }

  return (
    <article className="gameover-container">
      <section className="gameover">
        <h2 className="gameover__result">{gameOverMessage}</h2>
        <h3 className="gameover__message">Play again?</h3>
        <div className="gameover__button-container">
          <button
            className="gameover__button"
            onClick={() => copponentHandler(false)}
          >
            Play opponent
          </button>
          <button
            className="gameover__button"
            onClick={() => copponentHandler(true)}
          >
            Play computer
          </button>
        </div>
      </section>
    </article>
  );
}

export default GameOver;
