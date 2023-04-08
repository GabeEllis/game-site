import "./Board.scss";
import Tile from "../Tile/Tile";
import GameOver from "../GameOver/GameOver";
import { useState, useEffect, useRef } from "react";

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
function kingMoves(board, startIndex, castlingRules) {
  // Gets castling rules values from object.
  const {
    hasWhiteKingMoved,
    hasWhiteKingRookMoved,
    hasWhiteQueenRookMoved,
    hasBlackKingMoved,
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
  if (!hasWhiteKingMoved && whichTeam(board[startIndex].value) === "white") {
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
  } else if (
    !hasBlackKingMoved &&
    whichTeam(board[startIndex].value) === "black"
  ) {
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
function pawnMoves(board, startIndex) {
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

// Creates an array of all of the valid moves for the selected piece.
function validMoves(board, startIndex, castlingRules, whoseTurn) {
  const pieceType = board[startIndex].value;
  let validMoveArray = [];
  // If piece is a rook.
  if (pieceType === "r" || pieceType === "R") {
    const rookMovesArray = rookMoves(board, startIndex);
    rookMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a bishop.
  } else if (pieceType === "b" || pieceType === "B") {
    const bishopMovesArray = bishopMoves(board, startIndex);
    bishopMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a knight.
  } else if (pieceType === "n" || pieceType === "N") {
    const knightMovesArray = knightMoves(board, startIndex);
    knightMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a queen.
  } else if (pieceType === "q" || pieceType === "Q") {
    // Queen is basically a rook and bishop combined, so don't need to make a new function.
    const queenMovesArray = rookMoves(board, startIndex).concat(
      bishopMoves(board, startIndex)
    );
    queenMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a king.
  } else if (pieceType === "k" || pieceType === "K") {
    const kingMovesArray = kingMoves(board, startIndex, castlingRules);
    kingMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a pawn.
  } else if (pieceType === "p" || pieceType === "P") {
    const pawnMovesArray = pawnMoves(board, startIndex);
    pawnMovesArray.forEach((move) => {
      const testBoard = JSON.parse(JSON.stringify(board));
      movePiece(testBoard, startIndex, move);
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // Picked a blank tile.
  } else {
    validMoveArray = [];
  }
  return validMoveArray;
}

// Checks to see if the king is in check.
function inCheck(board, whoseTurn) {
  const kingIndex = findKingIndex(board, whoseTurn);
  let inCheckFlag = false;
  if (whoseTurn === "white" && kingIndex !== -1) {
    const rookAttackArray = rookMoves(board, kingIndex);
    rookAttackArray.forEach((tile) => {
      if (board[tile].value === "r" || board[tile].value === "q") {
        inCheckFlag = true;
      }
    });
    const bishopAttackArray = bishopMoves(board, kingIndex);
    bishopAttackArray.forEach((tile) => {
      if (board[tile].value === "b" || board[tile].value === "q") {
        inCheckFlag = true;
      }
    });
    const knightAttackArray = knightMoves(board, kingIndex);
    knightAttackArray.forEach((tile) => {
      if (board[tile].value === "n") {
        inCheckFlag = true;
      }
    });
    const pawnAttackArray = pawnMoves(board, kingIndex);
    pawnAttackArray.forEach((tile) => {
      if (board[tile].value === "p") {
        inCheckFlag = true;
      }
    });
  }
  if (whoseTurn === "black" && kingIndex !== -1) {
    const rookAttackArray = rookMoves(board, kingIndex);
    rookAttackArray.forEach((tile) => {
      if (board[tile].value === "R" || board[tile].value === "Q") {
        inCheckFlag = true;
      }
    });
    const bishopAttackArray = bishopMoves(board, kingIndex);
    bishopAttackArray.forEach((tile) => {
      if (board[tile].value === "B" || board[tile].value === "Q") {
        inCheckFlag = true;
      }
    });
    const knightAttackArray = knightMoves(board, kingIndex);
    knightAttackArray.forEach((tile) => {
      if (board[tile].value === "N") {
        inCheckFlag = true;
      }
    });
    const pawnAttackArray = pawnMoves(board, kingIndex);
    pawnAttackArray.forEach((tile) => {
      if (board[tile].value === "P") {
        inCheckFlag = true;
      }
    });
  }
  return inCheckFlag;
}

function findKingIndex(board, whoseTurn) {
  let kingIndex;
  if (whoseTurn === "white") {
    kingIndex = board.findIndex((tile) => tile.value === "K");
  } else if (whoseTurn === "black") {
    kingIndex = board.findIndex((tile) => tile.value === "k");
  }
  return kingIndex;
}

function isGameOver(board, whoseTurn, castlingRules) {
  let totalValidMovesArray = [];
  for (let i = 0; i < board.length; i++) {
    if (whichTeam(board[i].value) === whoseTurn) {
      console.log(i, whoseTurn);
      let validMoveArray = validMoves(board, i, castlingRules, whoseTurn);
      if (validMoveArray.length !== 0) {
        totalValidMovesArray.push(validMoveArray);
      }
    }
  }
  console.log(totalValidMovesArray);
  if (totalValidMovesArray.length === 0) {
    return true;
  } else {
    return false;
  }
}

function Board() {
  // Intializes gameStatus.
  let gameStatus;
  let stalemateStatus;
  // Intializes the starting board.
  const startingBoard = [];
  // Intializes state variables.
  const [currentBoard, setCurrentBoard] = useState(startingBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [promotionChoice, setPromotionChoice] = useState(null);
  // Used to creates the id values for the chess tiles.
  const horizontalLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalLabels = ["8", "7", "6", "5", "4", "3", "2", "1"];
  // const [whoseTurn, useWhoseTurn] = useState("white");
  let selectedValidMoves = [];

  // Gets previously selected piece.
  const prevPiece = useRef("");
  let lastSelectedPiece = prevPiece.current;

  useEffect(() => {
    prevPiece.current = selectedPiece;
    // console.log("useEffect Piece", prevPiece.current);
  }, [selectedPiece]);

  // Gets previously selected turn.
  const prevTurn = useRef("white");
  let whoseTurn = prevTurn.current;

  // Gets castling rules values.
  const prevCastlingRules = useRef({
    hasWhiteKingMoved: false,
    hasWhiteKingRookMoved: false,
    hasWhiteQueenRookMoved: false,
    hasBlackKingMoved: false,
    hasBlackKingRookMoved: false,
    hasBlackQueenRookMoved: false,
  });
  let castlingRules = prevCastlingRules.current;

  useEffect(() => {
    prevTurn.current = whoseTurn;
    prevCastlingRules.current = castlingRules;
    // console.log("useEffect Turn", prevTurn.current);
  });

  // Creates the intial board.
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      startingBoard.push({
        id: `${horizontalLabels[j]}${verticalLabels[i]}`,
        value: chessBoard[8 * i + j],
        squareColor: j + i,
        isPromoted: false,
        promotionColor: "white",
      });
    }
  }

  // Finds the piece the users clicks on and sets selected piece equal to it.
  const SelectPiece = (id) => {
    const foundPiece = currentBoard.find((tile) => tile.id === id);
    setSelectedPiece(foundPiece);
  };

  // Finds the piece the users clicks on and sets selected piece equal to it.
  // Change name.
  const PromotionOptions = (piece) => {
    setPromotionChoice(piece);
    console.log("promotionChoice", piece);
  };

  function ChessGame(board) {
    if (selectedPiece || promotionChoice) {
      // Gets the index of the selected piece.
      const foundPieceIndex = board.findIndex(
        (tile) => tile.id === selectedPiece.id
      );
      // Gets the validMoves array for the selected piece.
      selectedValidMoves = validMoves(
        board,
        foundPieceIndex,
        castlingRules,
        whoseTurn
      );

      if (lastSelectedPiece || promotionChoice) {
        // If last selected piece is the same color as whose turn.
        if (
          whichTeam(lastSelectedPiece.value) === whoseTurn ||
          promotionChoice
        ) {
          // Gets the index of the previously selected piece.
          const lastFoundPieceIndex = board.findIndex(
            (tile) => tile.id === lastSelectedPiece.id
          );
          let lastValidMoves = validMoves(
            board,
            lastFoundPieceIndex,
            castlingRules,
            whoseTurn
          );

          // If the selected piece is included in the last selected piece's valid moves array.
          if (lastValidMoves.includes(foundPieceIndex) || promotionChoice) {
            movePiece(board, lastFoundPieceIndex, foundPieceIndex);

            // Checks for white king side castle and then moves the rook.
            if (
              board[foundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteKingMoved &&
              !castlingRules.hasWhiteKingRookMoved &&
              foundPieceIndex === 62
            ) {
              castlingRules.hasWhiteKingMoved = true;
              castlingRules.hasWhiteKingRookMoved = true;
              movePiece(board, 63, 61);
            }
            // Checks for white queen side castle and then moves the rook.
            if (
              board[foundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteKingMoved &&
              !castlingRules.hasWhiteQueenRookMoved &&
              foundPieceIndex === 58
            ) {
              castlingRules.hasWhiteKingMoved = true;
              castlingRules.hasWhiteQueenRookMoved = true;
              movePiece(board, 56, 59);
            }
            // Checks for black king side castle and then moves the rook.
            if (
              board[foundPieceIndex].value === "k" &&
              !castlingRules.hasBlackKingMoved &&
              !castlingRules.hasBlackKingRookMoved &&
              foundPieceIndex === 6
            ) {
              castlingRules.hasBlackKingMoved = true;
              castlingRules.hasBlackKingRookMoved = true;
              movePiece(board, 7, 5);
            }
            // Checks for black queen side castle and then moves the rook.
            if (
              board[foundPieceIndex].value === "k" &&
              !castlingRules.hasBlackKingMoved &&
              !castlingRules.hasBlackQueenRookMoved &&
              foundPieceIndex === 2
            ) {
              castlingRules.hasBlackKingMoved = true;
              castlingRules.hasBlackQueenRookMoved = true;
              movePiece(board, 0, 3);
            }

            // If white king moves, set hasWhiteKingMoved to true.
            if (board[foundPieceIndex].value === "K") {
              castlingRules.hasWhiteKingMoved = true;
              // If white king rook moves, set hasWhiteKingRookMoved to true.
            } else if (
              board[foundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 63
            ) {
              castlingRules.hasWhiteKingRookMoved = true;
              // If white queen rook moves, set hasWhiteQueenRookMoved to true.
            } else if (
              board[foundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 56
            ) {
              castlingRules.hasWhiteQueenRookMoved = true;
              // If black king moves, set hasBlackKingMoved to true.
            } else if (board[foundPieceIndex].value === "k") {
              castlingRules.hasBlackKingMoved = true;
              // If black king rook moves, set hasBlackKingRookMoved to true.
            } else if (
              board[foundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 7
            ) {
              castlingRules.hasBlackKingRookMoved = true;
              // If black queen rook moves, set hasBlackQueenRookMoved to true.
            } else if (
              board[foundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 0
            ) {
              castlingRules.hasBlackQueenRookMoved = true;
            }

            // If a white pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (board[foundPieceIndex].value === "P" && foundPieceIndex <= 7) {
              board[foundPieceIndex].isPromoted = true;
              board[foundPieceIndex].promotionColor = "white";
            }
            // If a black pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (board[foundPieceIndex].value === "p" && foundPieceIndex >= 56) {
              board[foundPieceIndex].isPromoted = true;
              board[foundPieceIndex].promotionColor = "black";
            }

            if (
              (promotionChoice && foundPieceIndex <= 7) ||
              (promotionChoice && foundPieceIndex >= 56)
            ) {
              board[foundPieceIndex].value = promotionChoice;
              board[foundPieceIndex].isPromoted = false;
              setPromotionChoice(null);
            }
            console.log("whoseTurn", whoseTurn);
            if (whoseTurn === "white") {
              whoseTurn = "black";
            } else if (whoseTurn === "black") {
              whoseTurn = "white";
            }
          }
        }
      }
    }
  }

  console.log(
    "selectedPiece:",
    selectedPiece,
    "selectedValidMoves:",
    selectedValidMoves,
    "lastSelectedPiece:",
    lastSelectedPiece,
    "whoseTurn:",
    whoseTurn,
    "promotionChoice:",
    promotionChoice
  );

  ChessGame(currentBoard);

  gameStatus = isGameOver(currentBoard, whoseTurn, castlingRules);

  if (gameStatus) {
    stalemateStatus = !inCheck(currentBoard, whoseTurn);
    console.log(stalemateStatus);
  }
  console.log(gameStatus);

  return (
    <article className="board-container">
      <section className="board">
        {currentBoard.map((tile, index) => {
          return (
            <Tile
              key={tile.id}
              id={tile.id}
              value={tile.value}
              squareColor={tile.squareColor}
              SelectPiece={SelectPiece}
              isValidMove={selectedValidMoves.includes(index)}
              isPromoted={tile.isPromoted}
              promotionColor={tile.promotionColor}
              PromotionOptions={PromotionOptions}
            />
          );
        })}
        <GameOver
          gameStatus={gameStatus}
          whoseTurn={whoseTurn}
          stalemateStatus={stalemateStatus}
        />
      </section>
    </article>
  );
}

export default Board;
