import { ifSquareCheck } from "./validMoves";
import { whichTeam } from "./whichTeam";

// Finds valid moves for a rook.
export function rookMoves(board, startIndex) {
  let validMoveArray = [];
  // Left
  let counter = startIndex - 1;
  while (counter >= 0 && (counter + 1) % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter--;
  }
  // Right
  counter = startIndex + 1;
  while (counter % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter++;
  }
  // Up
  counter = startIndex + 8;
  while (counter <= 63) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter += 8;
  }
  // Down
  counter = startIndex - 8;
  while (counter >= 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 8;
  }
  return validMoveArray;
}

// Finds valid moves for a bishop.
export function bishopMoves(board, startIndex) {
  let validMoveArray = [];
  // Top-Left
  let counter = startIndex - 9;
  while (counter >= 0 && (counter + 1) % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 9;
  }
  // Top-Right
  counter = startIndex - 7;
  while (counter >= 0 && counter % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 7;
  }
  // Bottom-Left
  counter = startIndex + 7;
  while (counter <= 62 && (counter + 1) % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter += 7;
  }
  // Bottom-Right
  counter = startIndex + 9;
  while (counter <= 63 && counter % 8 !== 0) {
    if (board[counter].value === "0") {
      validMoveArray.push(counter);
    } else if (
      whichTeam(board[startIndex].value) === whichTeam(board[counter].value)
    ) {
      break;
    } else if (
      whichTeam(board[startIndex].value) !== whichTeam(board[counter].value)
    ) {
      validMoveArray.push(counter);
      break;
    }
    counter += 9;
  }
  return validMoveArray;
}

// Finds valid moves for a knight.
export function knightMoves(board, startIndex) {
  let validMoveArray = [];
  // Left-Left-Down
  if (startIndex % 8 >= 2 && startIndex < 56) {
    const finalIndex = startIndex + 6;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Left-Left-Up
  if (startIndex % 8 >= 2 && startIndex > 7) {
    const finalIndex = startIndex - 10;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Up-Up-Left
  if (startIndex % 8 >= 1 && startIndex > 15) {
    const finalIndex = startIndex - 17;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Up-Up-Right
  if (startIndex % 8 <= 6 && startIndex > 15) {
    const finalIndex = startIndex - 15;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Right-Right-Up
  if (startIndex % 8 <= 5 && startIndex > 7) {
    const finalIndex = startIndex - 6;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Right-Right-Down
  if (startIndex % 8 <= 5 && startIndex < 56) {
    const finalIndex = startIndex + 10;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Down-Down-Right
  if (startIndex % 8 <= 6 && startIndex < 48) {
    const finalIndex = startIndex + 17;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Down-Down-Left
  if (startIndex % 8 >= 1 && startIndex < 48) {
    const finalIndex = startIndex + 15;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  return validMoveArray;
}

// Finds valid moves for a king.
export function kingMoves(board, startIndex, castlingRules) {
  // Gets castling rules values from object.
  const {
    hasWhiteKingRookMoved,
    hasWhiteQueenRookMoved,
    hasBlackKingRookMoved,
    hasBlackQueenRookMoved,
  } = castlingRules;

  let validMoveArray = [];

  // Left
  if (startIndex % 8 > 0) {
    const finalIndex = startIndex - 1;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Left-Up
  if (startIndex % 8 > 0 && startIndex > 7) {
    const finalIndex = startIndex - 9;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Up
  if (startIndex > 7) {
    const finalIndex = startIndex - 8;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Up-Right
  if (startIndex % 8 < 7 && startIndex > 7) {
    const finalIndex = startIndex - 7;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Right
  if (startIndex % 8 < 7) {
    const finalIndex = startIndex + 1;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Right-Down
  if (startIndex % 8 < 7 && startIndex < 56) {
    const finalIndex = startIndex + 9;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Down
  if (startIndex < 56) {
    const finalIndex = startIndex + 8;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }
  // Down-Left
  if (startIndex % 8 > 0 && startIndex < 56) {
    const finalIndex = startIndex + 7;
    validMoveArray = ifSquareCheck(
      board,
      startIndex,
      finalIndex,
      validMoveArray
    );
  }

  // If the king is white and they haven't castled yet.
  if (whichTeam(board[startIndex].value) === "white") {
    // Checks for king side castling.
    if (!hasWhiteKingRookMoved) {
      let counter = startIndex + 1;
      for (let i = 0; i < 2; i++) {
        if (board[counter + i].value !== "0") {
          break;
        } else if ((i = 1)) {
          validMoveArray.push(62);
        }
      }
    }
    // Checks for queen side castling.
    if (!hasWhiteQueenRookMoved) {
      let counter = startIndex - 1;
      for (let i = 0; i > -3; i--) {
        if (board[counter + i].value !== "0") {
          break;
        } else if ((i = -2)) {
          validMoveArray.push(58);
        }
      }
    }

    // If the king is black and they haven't castled yet.
  } else if (whichTeam(board[startIndex].value) === "black") {
    // Checks for king side castling.
    if (!hasBlackKingRookMoved) {
      let counter = startIndex + 1;
      for (let i = 0; i < 2; i++) {
        if (board[counter + i].value !== "0") {
          break;
        } else if ((i = 1)) {
          validMoveArray.push(6);
        }
      }
    }
    // Checks for queen side castling.
    if (!hasBlackQueenRookMoved) {
      let counter = startIndex - 1;
      for (let i = 0; i > -3; i--) {
        if (board[counter + i].value !== "0") {
          break;
        } else if ((i = -2)) {
          validMoveArray.push(2);
        }
      }
    }
  }
  return validMoveArray;
}

// Finds valid moves for a pawn.
export function pawnMoves(board, startIndex) {
  let validMoveArray = [];
  // If the the pawn is white.
  if (whichTeam(board[startIndex].value) === "white") {
    if (startIndex > 47) {
      const finalIndex = startIndex - 16;
      if (
        board[finalIndex].value === "0" &&
        board[finalIndex + 8].value === "0"
      ) {
        validMoveArray.push(finalIndex);
      }
    }
    if (startIndex > 7) {
      const finalIndex = startIndex - 8;
      if (board[finalIndex].value === "0") {
        validMoveArray.push(finalIndex);
      }
      if (whichTeam(board[finalIndex + 1].value) === "black") {
        validMoveArray.push(finalIndex + 1);
      }
      if (whichTeam(board[finalIndex - 1].value) === "black") {
        validMoveArray.push(finalIndex - 1);
      }
    }
  }
  // If the pawn is black.
  if (whichTeam(board[startIndex].value) === "black") {
    if (startIndex < 16) {
      const finalIndex = startIndex + 16;
      if (
        board[finalIndex].value === "0" &&
        board[finalIndex - 8].value === "0"
      ) {
        validMoveArray.push(finalIndex);
      }
    }
    if (startIndex < 56) {
      const finalIndex = startIndex + 8;
      if (board[finalIndex].value === "0") {
        validMoveArray.push(finalIndex);
      }
      if (whichTeam(board[finalIndex + 1].value) === "white") {
        validMoveArray.push(finalIndex + 1);
      }
      if (whichTeam(board[finalIndex - 1].value) === "white") {
        validMoveArray.push(finalIndex - 1);
      }
    }
  }
  return validMoveArray;
}
