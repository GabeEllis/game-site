import "./Board.scss";
import Tile from "../Tile/Tile";
import { useState, useEffect, useRef, usePrevious } from "react";

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

// Moves a piece, and when it does replace its original location with a 0.
function movePiece(board, startIndex, finalIndex) {
  board[finalIndex].value = board[startIndex].value;
  board[startIndex].value = "0";
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
  if (board[finalIndex].value === "0") {
    validMoveArray.push(finalIndex);
  } else if (
    whichTeam(board[startIndex].value) !== whichTeam(board[finalIndex].value)
  ) {
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
function bishopMoves(board, startIndex) {
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
  if (whichTeam(board[startIndex].value) === "white") {
    if (startIndex > 47) {
      const finalIndex = startIndex - 16;
      if (board[finalIndex].value === "0") {
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
      if (board[finalIndex].value === "0") {
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

// Creates an array of all of the valid moves for the selected piece.
function validMoves(board, startIndex) {
  const pieceType = board[startIndex].value;
  let validMoveArray = [];
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
    validMoveArray = [];
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

function Board() {
  // Intializes selected piece and the selected piece's valid moves.
  const [selectedPiece, useSelectedPiece] = useState(null);
  // const [whoseTurn, useWhoseTurn] = useState("white");
  let selectedValidMoves = [];

  // Gets previously selected piece.
  const prevPiece = useRef("null");
  let lastSelectedPiece = prevPiece.current;

  useEffect(() => {
    prevPiece.current = selectedPiece;
    console.log("useEffect Piece", prevPiece.current);
  }, [selectedPiece]);

  // Gets previously selected turn.
  const prevTurn = useRef("white");
  let whoseTurn = prevTurn.current;
  let changeTurn = whoseTurn;

  useEffect(() => {
    prevTurn.current = whoseTurn;
    console.log("useEffect Turn", prevTurn.current);
  });

  console.log("last click", lastSelectedPiece, whoseTurn);

  // Intializes the starting board.
  const startingBoard = [];
  // Sets the currentBoard as startingBoard.
  const [currentBoard, useCurrentBoard] = useState(startingBoard);
  // Used to creates the id values for the chess tiles.
  const horizontalLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalLabels = ["8", "7", "6", "5", "4", "3", "2", "1"];

  // Creates the intial board.
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      startingBoard.push({
        id: `${horizontalLabels[j]}${verticalLabels[i]}`,
        value: chessBoard[8 * i + j],
        squareColor: j + i,
      });
    }
  }

  console.log(chessBoard);
  // Finds the piece the users clicks on and sets selected piece equal to it.
  const SelectPiece = (id) => {
    const foundPiece = currentBoard.find((tile) => tile.id === id);
    useSelectedPiece(foundPiece);
  };

  function ChessGame(board) {
    // let moveCounter = 0;
    if (selectedPiece) {
      // If selected piece is the same color as whose turn or it is an empty tile.
      if (
        whichTeam(selectedPiece.value) === whoseTurn ||
        selectedPiece.value === "0"
      ) {
        // Gets the index of the selected piece.
        const foundPieceIndex = board.findIndex(
          (tile) => tile.id === selectedPiece.id
        );
        let selectedValidMoves = validMoves(board, foundPieceIndex);
        console.log(selectedValidMoves);

        if (lastSelectedPiece) {
          // If last selected piece is the same color as whose turn.
          if (whichTeam(lastSelectedPiece.value) === whoseTurn) {
            // Gets the index of the previously selected piece.
            const lastFoundPieceIndex = board.findIndex(
              (tile) => tile.id === lastSelectedPiece.id
            );
            let lastValidMoves = validMoves(board, lastFoundPieceIndex);

            // If the selected piece is included in the last selected piece's valid moves array.
            if (lastValidMoves.includes(foundPieceIndex)) {
              // console.log(foundPieceIndex, lastFoundPieceIndex);
              movePiece(board, lastFoundPieceIndex, foundPieceIndex);
              console.log("whoseTurn", whoseTurn);
              if (whoseTurn === "white") {
                whoseTurn = "black";
              } else if (whoseTurn === "black") {
                whoseTurn = "white";
              }
              console.log("whoseTurn after", whoseTurn);
            }
          }
        }
      }
    }
  }

  console.log("ran", lastSelectedPiece, whoseTurn);
  console.log(selectedPiece, selectedValidMoves);
  ChessGame(currentBoard);

  return (
    <main className="board">
      {currentBoard.map((tile, index) => {
        return (
          <Tile
            key={tile.id}
            id={tile.id}
            value={tile.value}
            squareColor={tile.squareColor}
            SelectPiece={SelectPiece}
            isValidMove={selectedValidMoves.includes(index)}
          />
        );
      })}
    </main>
  );
}

export default Board;

// const testRow = [
//   "R",
//   "0",
//   "0",
//   "K",
//   "0",
//   "0",
//   "0",
//   "0",
//   "p",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
//   "P",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
//   "0",
// ];
// console.log(testRow);
// console.log(selectPiece(testRow, 8, "black"));
// console.log(testRow);
// chessGame(testRow);
