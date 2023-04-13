import { validMoves } from "./validMoves";
import { whichTeam } from "./whichTeam";

// Checks to see if the game is over. Returns true if it is and false if not.
export function isGameOver(board, whoseTurn, castlingRules) {
  // Intializes the total number of valid moves a player has.
  let totalValidMovesArray = [];
  // Loops through every piece a player has.
  for (let i = 0; i < board.length; i++) {
    if (whichTeam(board[i].value) === whoseTurn) {
      let validMoveArray = validMoves(board, i, castlingRules, whoseTurn);
      // If the piece has a valid move add it to the total valid moves array.
      if (validMoveArray.length !== 0) {
        totalValidMovesArray.push(validMoveArray);
      }
    }
  }

  // If the user has no valid moves, return true.
  if (totalValidMovesArray.length === 0) {
    return true;
    // If the user has at least one valid move, return false.
  } else {
    return false;
  }
}
