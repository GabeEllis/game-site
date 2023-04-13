import { logDOM } from "@testing-library/react";

// Converts the game board into FEN format so that it can be easily used with the chess ai.
export function convertBoardToFen(board, whoseTurn, castlingRules) {
  // Intialize starting values.
  let boardFen = "";
  let zeroInARow = 0;

  // Destructors the castlingRules.
  const {
    hasWhiteKingRookMoved,
    hasWhiteQueenRookMoved,
    hasBlackKingRookMoved,
    hasBlackQueenRookMoved,
  } = castlingRules;

  // Loops through the game board to convert it into a FEN board.
  for (let i = 0; i < board.length; i++) {
    // If the value is 0, increment the number of zerosInARow.
    if (board[i].value === "0") {
      zeroInARow++;
      // If the number of zerosInARow reaches 8, reset the value and write an 8.
      if ((i + 1) % 8 === 0) {
        boardFen += zeroInARow;
        zeroInARow = 0;
      }
      // If the value is not a 0 and the zeroInARow is greater than 0, add the number of zeroInARow and the current value.
    } else if (board[i].value !== "0" && zeroInARow > 0) {
      boardFen += zeroInARow + board[i].value;
      zeroInARow = 0;
      // Otherwise, add the current value.
    } else {
      boardFen += board[i].value;
      zeroInARow = 0;
    }
    // Every 8 tiles read add a "/" to seperate.
    if ((i + 1) % 8 === 0 && i + 1 !== board.length) {
      boardFen += "/";
    }
  }

  // Intialize End FEN formatting.
  let fenEndFormat = "";

  // Gets the turn component of the FEN, if white add a w and black a b.
  if (whoseTurn === "white") {
    fenEndFormat += " w ";
  } else {
    fenEndFormat += " b ";
  }

  // Gets the castling rules information into FEN format.
  if (!hasWhiteKingRookMoved) {
    fenEndFormat += "K";
  }
  if (!hasWhiteQueenRookMoved) {
    fenEndFormat += "Q";
  }
  if (!hasBlackKingRookMoved) {
    fenEndFormat += "k";
  }
  if (!hasBlackQueenRookMoved) {
    fenEndFormat += "q";
  }
  if (
    !hasWhiteKingRookMoved ||
    !hasWhiteQueenRookMoved ||
    !hasBlackKingRookMoved ||
    !hasBlackQueenRookMoved
  ) {
    fenEndFormat += " ";
  }
  fenEndFormat += "- 0 0";

  // Adds the End FEN formatting to the end of the FEN board.
  boardFen += fenEndFormat;

  return boardFen;
}
