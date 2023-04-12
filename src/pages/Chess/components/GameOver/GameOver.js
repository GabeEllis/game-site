import "./GameOver.scss";

function GameOver({
  gameStatus,
  whoseTurn,
  stalemateStatus,
  copponentHandler,
}) {
  let gameOverMessage = "Message";

  if (gameStatus) {
    if (stalemateStatus) {
      gameOverMessage = "Draw by Stalemate";
    } else if (whoseTurn === "white") {
      gameOverMessage = "Black won by checkmate";
    } else if (whoseTurn === "black") {
      gameOverMessage = "White won by checkmate";
    } else {
      gameOverMessage = stalemateStatus;
    }
  }

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
