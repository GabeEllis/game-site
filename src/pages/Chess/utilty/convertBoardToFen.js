import { logDOM } from "@testing-library/react";

export function convertBoardToFen(board, whoseTurn, castlingRules) {
  let boardFen = "";
  let zeroInARow = 0;

  const {
    hasWhiteKingRookMoved,
    hasWhiteQueenRookMoved,
    hasBlackKingRookMoved,
    hasBlackQueenRookMoved,
  } = castlingRules;

  for (let i = 0; i < board.length; i++) {
    if (board[i].value === "0" && zeroInARow < 8) {
      zeroInARow++;
      if (zeroInARow === 8) {
        boardFen += zeroInARow;
        zeroInARow = 0;
      }
    } else if (board[i].value !== "0" && zeroInARow > 0) {
      boardFen += zeroInARow;
      zeroInARow = 0;
    } else {
      boardFen += board[i].value;
      zeroInARow = 0;
    }
    if ((i + 1) % 8 === 0 && i + 1 !== board.length) {
      boardFen += "/";
    }
  }

  let fenEndFormat = "";

  if (whoseTurn === "white") {
    fenEndFormat += " w ";
  } else {
    fenEndFormat += " b ";
  }

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

  boardFen += fenEndFormat;

  return boardFen;
}
