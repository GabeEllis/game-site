import "./Board.scss";
import Tile from "../Tile/Tile";
import GameOver from "../GameOver/GameOver";
import Player from "../Player/Player";
import startingBoard from "../../utilty/startingBoard.json";
import { getComputerMove } from "../../utilty/getComputerMove";
import { convertBoardToFen } from "../../utilty/convertBoardToFen";
import { formatComputerMove } from "../../utilty/formatComputerMove";
import { useState, useEffect, useRef } from "react";
import { move, status, moves, aiMove, getFen } from "js-chess-engine";

// Moves a piece, and when it does replace its original location with a 0.
export function movePiece(board, startIndex, finalIndex) {
  const boardAfterMove = JSON.parse(JSON.stringify(board));
  const capturedPiece = boardAfterMove[finalIndex].value;

  boardAfterMove[finalIndex].value = boardAfterMove[startIndex].value;
  boardAfterMove[startIndex].value = "0";

  return [boardAfterMove, capturedPiece];
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
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a bishop.
  } else if (pieceType === "b" || pieceType === "B") {
    const bishopMovesArray = bishopMoves(board, startIndex);
    bishopMovesArray.forEach((move) => {
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a knight.
  } else if (pieceType === "n" || pieceType === "N") {
    const knightMovesArray = knightMoves(board, startIndex);
    knightMovesArray.forEach((move) => {
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
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
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a king.
  } else if (pieceType === "k" || pieceType === "K") {
    const kingMovesArray = kingMoves(board, startIndex, castlingRules);
    kingMovesArray.forEach((move) => {
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
      if (!inCheck(testBoard, whoseTurn)) {
        validMoveArray.push(move);
      }
    });
    // If piece is a pawn.
  } else if (pieceType === "p" || pieceType === "P") {
    const pawnMovesArray = pawnMoves(board, startIndex);
    pawnMovesArray.forEach((move) => {
      const boardAfterMove = movePiece(board, startIndex, move);
      const testBoard = boardAfterMove[0];
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
      let validMoveArray = validMoves(board, i, castlingRules, whoseTurn);
      if (validMoveArray.length !== 0) {
        totalValidMovesArray.push(validMoveArray);
      }
    }
  }

  if (totalValidMovesArray.length === 0) {
    return true;
  } else {
    return false;
  }
}

function Board({ name, elo, theme }) {
  // Intializes gameStatus.
  let gameStatus;
  let stalemateStatus;
  let selectedValidMoves = [];
  let capturedPiece;
  let isComputer = true;
  let boardAfterMove = [];
  // Intializes state variables.
  const [currentBoard, setCurrentBoard] = useState(startingBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [promotionChoice, setPromotionChoice] = useState(null);

  // Gets previously selected piece.
  const prevPiece = useRef("");
  let lastSelectedPiece = prevPiece.current;

  useEffect(() => {
    prevPiece.current = selectedPiece;
  }, [selectedPiece]);

  // Gets previously selected turn.
  const prevTurn = useRef("white");
  let whoseTurn = prevTurn.current;

  // Gets previously selected capturedPiece.
  const prevCapture = useRef([]);
  let capturedPiecesArray = prevCapture.current;

  // Gets castling rules values.
  const prevCastlingRules = useRef({
    hasWhiteKingRookMoved: false,
    hasWhiteQueenRookMoved: false,
    hasBlackKingRookMoved: false,
    hasBlackQueenRookMoved: false,
  });
  let castlingRules = prevCastlingRules.current;

  // Finds the piece the users clicks on and sets selected piece equal to it.
  const SelectPiece = (id) => {
    const foundPiece = currentBoard.find((tile) => tile.id === id);
    setSelectedPiece(foundPiece);
  };

  // Finds the piece the users clicks on and sets selected piece equal to it.
  const PromotionOptions = (piece) => {
    setPromotionChoice(piece);
  };

  // Start of the turn.
  // If a piece has been selected or a pawn is in the process of being promoted.
  if (!isComputer || whoseTurn === "white") {
    if (selectedPiece || promotionChoice) {
      // Gets the index of the selected piece.
      const foundPieceIndex = currentBoard.findIndex(
        (tile) => tile.id === selectedPiece.id
      );
      // Gets the validMoves array for the selected piece.
      selectedValidMoves = validMoves(
        currentBoard,
        foundPieceIndex,
        castlingRules,
        whoseTurn
      );

      // If a piece has been selected last turn or a pawn is in the process of being promoted.
      if (lastSelectedPiece || promotionChoice) {
        // If last selected piece is the same color as whose turn.
        if (
          whichTeam(lastSelectedPiece.value) === whoseTurn ||
          promotionChoice
        ) {
          // Gets the index of the previously selected piece.
          const lastFoundPieceIndex = currentBoard.findIndex(
            (tile) => tile.id === lastSelectedPiece.id
          );
          let lastValidMoves = validMoves(
            currentBoard,
            lastFoundPieceIndex,
            castlingRules,
            whoseTurn
          );

          // If the selected piece is included in the last selected piece's valid moves array.
          if (lastValidMoves.includes(foundPieceIndex) || promotionChoice) {
            boardAfterMove = movePiece(
              currentBoard,
              lastFoundPieceIndex,
              foundPieceIndex
            );

            // Checks for white king side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteKingRookMoved &&
              foundPieceIndex === 62
            ) {
              castlingRules.hasWhiteKingRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 63, 61);
            }
            // Checks for white queen side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteQueenRookMoved &&
              foundPieceIndex === 58
            ) {
              castlingRules.hasWhiteQueenRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 56, 59);
            }
            // Checks for black king side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "k" &&
              !castlingRules.hasBlackKingRookMoved &&
              foundPieceIndex === 6
            ) {
              castlingRules.hasBlackKingRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 7, 5);
            }
            // Checks for black queen side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "k" &&
              !castlingRules.hasBlackQueenRookMoved &&
              foundPieceIndex === 2
            ) {
              castlingRules.hasBlackQueenRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 0, 3);
            }

            // If white king moves, set hasWhiteKingMoved to true.
            if (currentBoard[lastFoundPieceIndex].value === "K") {
              castlingRules.hasWhiteKingRookMoved = true;
              castlingRules.hasWhiteQueenRookMoved = true;
              // If white king rook moves, set hasWhiteKingRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 63
            ) {
              castlingRules.hasWhiteKingRookMoved = true;
              // If white queen rook moves, set hasWhiteQueenRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 56
            ) {
              castlingRules.hasWhiteQueenRookMoved = true;
              // If black king moves, set hasBlackKingMoved to true.
            } else if (currentBoard[lastFoundPieceIndex].value === "k") {
              castlingRules.hasBlackKingRookMoved = true;
              castlingRules.hasBlackQueenRookMoved = true;
              // If black king rook moves, set hasBlackKingRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 7
            ) {
              castlingRules.hasBlackKingRookMoved = true;
              // If black queen rook moves, set hasBlackQueenRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 0
            ) {
              castlingRules.hasBlackQueenRookMoved = true;
            }

            // If a white pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (
              currentBoard[foundPieceIndex].value === "P" &&
              foundPieceIndex <= 7
            ) {
              currentBoard[foundPieceIndex].isPromoted = true;
              currentBoard[foundPieceIndex].promotionColor = "white";
            }
            // If a black pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (
              currentBoard[foundPieceIndex].value === "p" &&
              foundPieceIndex >= 56
            ) {
              currentBoard[foundPieceIndex].isPromoted = true;
              currentBoard[foundPieceIndex].promotionColor = "black";
            }

            if (
              (promotionChoice && foundPieceIndex <= 7) ||
              (promotionChoice && foundPieceIndex >= 56)
            ) {
              currentBoard[foundPieceIndex].value = promotionChoice;
              currentBoard[foundPieceIndex].isPromoted = false;
              setPromotionChoice(null);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (whoseTurn === "black" && isComputer) {
      const currentBoardFen = convertBoardToFen(
        currentBoard,
        whoseTurn,
        castlingRules
      );

      const difficulty = 1;

      const rawComputerMove = getComputerMove(currentBoardFen, difficulty);
      const [startingIndex, computerMove] = formatComputerMove(
        rawComputerMove,
        currentBoard
      );

      let [computerBoard, computerCapturedPiece] = movePiece(
        currentBoard,
        startingIndex,
        computerMove
      );

      // Checks for black king side castle and then moves the rook.
      if (
        computerBoard[computerMove].value === "k" &&
        !castlingRules.hasBlackKingRookMoved &&
        computerMove === 6
      ) {
        castlingRules.hasBlackKingRookMoved = true;
        [computerBoard, computerCapturedPiece] = movePiece(computerBoard, 7, 5);
      }
      // Checks for black queen side castle and then moves the rook.
      if (
        computerBoard[computerMove].value === "k" &&
        !castlingRules.hasBlackQueenRookMoved &&
        computerMove === 2
      ) {
        castlingRules.hasBlackQueenRookMoved = true;
        [computerBoard, computerCapturedPiece] = movePiece(computerBoard, 0, 3);
      }

      // If black king moves, set hasBlackKingMoved to true.
      if (computerBoard[computerMove].value === "k") {
        castlingRules.hasBlackKingRookMoved = true;
        castlingRules.hasBlackQueenRookMoved = true;
        // If black king rook moves, set hasBlackKingRookMoved to true.
      } else if (
        computerBoard[computerMove].value === "r" &&
        startingIndex === 7
      ) {
        castlingRules.hasBlackKingRookMoved = true;
        // If black queen rook moves, set hasBlackQueenRookMoved to true.
      } else if (
        computerBoard[computerMove].value === "r" &&
        startingIndex === 0
      ) {
        castlingRules.hasBlackQueenRookMoved = true;
      }

      prevCastlingRules.current = castlingRules;

      // If a piece was captured, add it to the capturedPiecesArray.
      if (computerCapturedPiece) {
        capturedPiecesArray.push(computerCapturedPiece);
      }

      // Changes the next turn to be white.
      whoseTurn = "white";
      prevTurn.current = whoseTurn;

      // Updates the board state based on computer's move.
      setCurrentBoard(computerBoard);
      // If a user move was made.
    } else if (boardAfterMove.length !== 0) {
      // After a move is made, it changes the turn to the opposite team.
      if (whoseTurn === "white") {
        prevTurn.current = "black";
      } else if (whoseTurn === "black") {
        prevTurn.current = "white";
      }

      // If a piece was captured, add it to the capturedPiecesArray.
      if (boardAfterMove[1]) {
        capturedPiecesArray.push(boardAfterMove[1]);
      }

      prevCastlingRules.current = castlingRules;

      // Updates the board state based on player's move.
      setCurrentBoard(boardAfterMove[0]);
    }
  });

  // Checks to see if the game is over.
  gameStatus = isGameOver(currentBoard, whoseTurn, castlingRules);
  if (gameStatus) {
    // When the game has ended, decides if it was stalemate of checkmate.
    stalemateStatus = !inCheck(currentBoard, whoseTurn);
  }

  return (
    <article className="board-container">
      <Player
        name={"Player 2"}
        elo={"1000"}
        team={"black"}
        capturedPiecesArray={capturedPiecesArray}
      />
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
              theme={theme}
            />
          );
        })}
      </section>
      <Player
        name={name}
        elo={elo}
        team={"white"}
        capturedPiecesArray={capturedPiecesArray}
      />
      <GameOver
        gameStatus={gameStatus}
        whoseTurn={whoseTurn}
        stalemateStatus={stalemateStatus}
      />
    </article>
  );
}

export default Board;
