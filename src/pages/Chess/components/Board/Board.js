import "./Board.scss";
import Tile from "../Tile/Tile";

const chessBoard = [
  "r",
  "n",
  "b",
  "q",
  "k",
  "b",
  "n",
  "r",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "R",
  "N",
  "B",
  "Q",
  "K",
  "B",
  "N",
  "R",
];

function Board() {
  let startingBoard = [];
  const horizontalLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalLabels = ["1", "2", "3", "4", "5", "6", "7", "8"];

  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      startingBoard.push({
        id: `${horizontalLabels[j]}${verticalLabels[i]}`,
        value: chessBoard[8 * i + j],
        squareColor: j + i,
      });
    }
  }
  return (
    <main className="board">
      {startingBoard.map((tile) => {
        return (
          <Tile
            key={tile.id}
            id={tile.id}
            value={tile.value}
            squareColor={tile.squareColor}
          />
        );
      })}
    </main>
  );
}

export default Board;

// Moves a piece, and when it does replace its original location with a 0.
function movePiece(board, startIndex, finalIndex) {
  board[finalIndex] = board[startIndex];
  board[startIndex] = "0";
  return board;
}

// Returns which team the input piece is.
function whichTeam(pieceType) {
  const whitePieces = ["R", "N", "B", "Q", "K", "P"];
  const blackPieces = ["r", "n", "b", "q", "k", "p"];
  if (whitePieces.includes(pieceType)) {
    return "white";
  } else if (blackPieces.includes(pieceType)) {
    return "black";
  }
}

// For the single move pieces, checks if the square if valid.
function ifSquareCheck(board, startIndex, finalIndex, validMoveArray) {
  if (board[finalIndex] === "0") {
    validMoveArray.push(finalIndex);
  } else if (whichTeam(board[startIndex]) !== whichTeam(board[finalIndex])) {
    validMoveArray.push(finalIndex);
  }
  return validMoveArray;
}

// Finds valid moves for a rook.
function rookMoves(board, startIndex) {
  let validMoveArray = [];
  // Left
  let counter = startIndex - 1;
  while (counter >= 0 && (counter + 1) % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter--;
  }
  // Right
  counter = startIndex + 1;
  while (counter % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter++;
  }
  // Up
  counter = startIndex + 8;
  while (counter <= 63) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter += 8;
  }
  // Down
  counter = startIndex - 8;
  while (counter >= 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 8;
  }
  return validMoveArray;
}

// Finds valid moves for a bishop.
function bishopMoves(board, startIndex) {
  let validMoveArray = [];
  // Top-Left
  let counter = startIndex - 9;
  while (counter >= 0 && (counter + 1) % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 9;
  }
  // Top-Right
  counter = startIndex - 7;
  while (counter >= 0 && counter % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter -= 7;
  }
  // Bottom-Left
  counter = startIndex + 7;
  while (counter <= 62 && (counter + 1) % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter += 7;
  }
  // Bottom-Right
  counter = startIndex + 9;
  while (counter <= 63 && counter % 8 !== 0) {
    if (board[counter] === "0") {
      validMoveArray.push(counter);
    } else if (whichTeam(board[startIndex]) === whichTeam(board[counter])) {
      break;
    } else if (whichTeam(board[startIndex]) !== whichTeam(board[counter])) {
      validMoveArray.push(counter);
      break;
    }
    counter += 9;
  }
  return validMoveArray;
}

// Finds valid moves for a knight.
function knightMoves(board, startIndex) {
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
function kingMoves(board, startIndex) {
  let validMoveArray = [];
  // Left
  if (startIndex % 8 > 0) {
    const finalIndex = startIndex + 1;
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
  return validMoveArray;
}

// Finds valid moves for a pawn.
function pawnMoves(board, startIndex) {
  let validMoveArray = [];
  // If the the pawn is white.
  if (whichTeam(board[startIndex]) === "white") {
    if (startIndex > 49) {
      const finalIndex = startIndex - 16;
      if (board[finalIndex] === "0") {
        validMoveArray.push(finalIndex);
      }
    }
    if (startIndex > 7) {
      const finalIndex = startIndex - 8;
      if (board[finalIndex] === "0") {
        validMoveArray.push(finalIndex);
      }
      if (whichTeam(board[finalIndex + 1]) === "black") {
        validMoveArray.push(finalIndex + 1);
      }
      if (whichTeam(board[finalIndex - 1]) === "black") {
        validMoveArray.push(finalIndex - 1);
      }
    }
  }
  // If the pawn is black.
  if (whichTeam(board[startIndex]) === "black") {
    if (startIndex < 16) {
      const finalIndex = startIndex + 16;
      if (board[finalIndex] === "0") {
        validMoveArray.push(finalIndex);
      }
    }
    if (startIndex < 56) {
      const finalIndex = startIndex + 8;
      if (board[finalIndex] === "0") {
        validMoveArray.push(finalIndex);
      }
      if (whichTeam(board[finalIndex + 1]) === "white") {
        validMoveArray.push(finalIndex + 1);
      }
      if (whichTeam(board[finalIndex - 1]) === "white") {
        validMoveArray.push(finalIndex - 1);
      }
    }
  }
  return validMoveArray;
}

// Creates an array of all of the valid moves for the selected piece.
function validMoves(board, startIndex) {
  const pieceType = board[startIndex];
  let validMoveArray = [];
  console.log(pieceType);
  // If piece is a rook.
  if (pieceType === "r" || pieceType === "R") {
    validMoveArray = rookMoves(board, startIndex);
    // If piece is a bishop.
  } else if (pieceType === "b" || pieceType === "B") {
    validMoveArray = bishopMoves(board, startIndex);
    // If piece is a knight.
  } else if (pieceType === "n" || pieceType === "N") {
    validMoveArray = knightMoves(board, startIndex);
    // If piece is a queen.
  } else if (pieceType === "q" || pieceType === "Q") {
    // Queen is basically a rook and bishop combined, so don't need to make a new function.
    validMoveArray = rookMoves(board, startIndex);
    validMoveArray = validMoveArray.concat(bishopMoves(board, startIndex));
    // If piece is a king.
  } else if (pieceType === "k" || pieceType === "K") {
    validMoveArray = kingMoves(board, startIndex);
    // If piece is a pawn.
  } else if (pieceType === "p" || pieceType === "P") {
    validMoveArray = pawnMoves(board, startIndex);
    // Picked a blank tile.
  } else {
    validMoveArray = "Empty Square";
  }
  return validMoveArray;
}

// Checks to see if the king is in check.
function inCheck(board, kingIndex) {
  let inCheckFlag = false;
  if (whichTeam(board[kingIndex]) === "white") {
    const rookAttackArray = rookMoves(board, kingIndex);
    rookAttackArray.forEach((tile) => {
      if (board[tile] === "r" || board[tile] === "q") {
        console.log("rook");
        inCheckFlag = true;
      }
    });
    const bishopAttackArray = bishopMoves(board, kingIndex);
    bishopAttackArray.forEach((tile) => {
      if (board[tile] === "b" || board[tile] === "q") {
        inCheckFlag = true;
      }
    });
    const knightAttackArray = knightMoves(board, kingIndex);
    knightAttackArray.forEach((tile) => {
      if (board[tile] === "n") {
        inCheckFlag = true;
      }
    });
    const pawnAttackArray = pawnMoves(board, kingIndex);
    pawnAttackArray.forEach((tile) => {
      if (board[tile] === "p") {
        inCheckFlag = true;
      }
    });
  }
  if (whichTeam(board[kingIndex]) === "black") {
    const rookAttackArray = rookMoves(board, kingIndex);
    rookAttackArray.forEach((tile) => {
      if (board[tile] === "R" || board[tile] === "Q") {
        inCheckFlag = true;
      }
    });
    const bishopAttackArray = bishopMoves(board, kingIndex);
    bishopAttackArray.forEach((tile) => {
      if (board[tile] === "B" || board[tile] === "Q") {
        inCheckFlag = true;
      }
    });
    const knightAttackArray = knightMoves(board, kingIndex);
    knightAttackArray.forEach((tile) => {
      if (board[tile] === "N") {
        inCheckFlag = true;
      }
    });
    const pawnAttackArray = pawnMoves(board, kingIndex);
    pawnAttackArray.forEach((tile) => {
      if (board[tile] === "P") {
        inCheckFlag = true;
      }
    });
  }
  return inCheckFlag;
}

// Returns valid moves of a piece if they pick one of their pieces.
const selectPiece = (board, index, playerTeam) => {
  if (whichTeam(board[index]) === playerTeam) {
    return [validMoves(board, index), index];
  }
};

function chessGame(board) {
  let whoseTurn = "white";
  let gameOver = false;
  while (gameOver === false) {
    let selectedPiece = selectPiece(board, 0, whoseTurn);
    if (whoseTurn === "white") {
      whoseTurn = "black";
    } else if (whoseTurn === "black") {
      whoseTurn = "white";
    }
    if (selectedPiece !== undefined) {
      console.log(selectedPiece);
      movePiece(board, selectedPiece[1], selectedPiece[0][0]);
      console.log(board);
      gameOver = true;
    }
  }
}

const testRow = [
  "R",
  "0",
  "0",
  "K",
  "0",
  "0",
  "0",
  "0",
  "p",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "P",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
];

// console.log(testRow);
// console.log(selectPiece(testRow, 8, "black"));
// console.log(testRow);
// chessGame(testRow);
