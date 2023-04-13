import "./GameOver.scss";
import { useState } from "react";

function GameOver({
  gameStarted,
  gameStatus,
  whoseTurn,
  stalemateStatus,
  opponentHandler,
}) {
  // Intializes the status of if the user chose to play against a computer.
  const [pickedComputer, setPickedComputer] = useState(false);

  // Intialize game over message.
  let gameResult;
  let gameOverMessage = "Play again?";

  if (!gameStarted) {
    // If the game is over.
    if (gameStatus) {
      // If the game is over and it always was a stalemate.
      if (stalemateStatus) {
        gameResult = "Draw by Stalemate";
        // If the game ended and the next turn is white, black won.
      } else if (whoseTurn === "white") {
        gameResult = "Black won by checkmate";
        // If the game ended and the next turn is black, white won.
      } else if (whoseTurn === "black") {
        gameResult = "White won by checkmate";
      }
    }
  } else {
    gameResult = "Start New Game";
    gameOverMessage = "Choose your opponent";
  }

  //   Changes the value of picked computer to true.
  function handlePickedComputer() {
    setPickedComputer(true);
  }

  // If the game is still going, return nothing.
  if (!gameStatus && !gameStarted) {
    return;
  }

  if (pickedComputer) {
    return (
      <article className="gameover-container">
        <section className="gameover">
          <h2 className="gameover__difficulty-header">Choose Difficulty</h2>
          <div className="gameover__difficulty-button-container">
            <button
              className="gameover__difficulty-button"
              onClick={() => opponentHandler(true, 0)}
            >
              Beginner
            </button>
            <button
              className="gameover__difficulty-button"
              onClick={() => opponentHandler(true, 1)}
            >
              Easy
            </button>
            <button
              className="gameover__difficulty-button"
              onClick={() => opponentHandler(true, 2)}
            >
              Medium
            </button>
            <button
              className="gameover__difficulty-button"
              onClick={() => opponentHandler(true, 3)}
            >
              Hard
            </button>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="gameover-container">
      <section className="gameover">
        <h2 className="gameover__result">{gameResult}</h2>
        <h3 className="gameover__message">{gameOverMessage}</h3>
        <div className="gameover__button-container">
          <button
            className="gameover__button"
            onClick={() => opponentHandler(false)}
          >
            Play opponent
          </button>
          <button
            className="gameover__button"
            onClick={() => handlePickedComputer()}
          >
            Play computer
          </button>
        </div>
      </section>
    </article>
  );
}

export default GameOver;
