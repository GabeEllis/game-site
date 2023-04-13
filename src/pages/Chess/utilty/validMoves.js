import {
  rookMoves,
  bishopMoves,
  knightMoves,
  kingMoves,
  pawnMoves,
} from "../utilty/pieceMoveLogic";
import { whichTeam } from "./whichTeam";
import { inCheck } from "./inCheck";
import { movePiece } from "./movePiece";

// For the single move pieces, checks if the square if valid.
export function ifSquareCheck(board, startIndex, finalIndex, validMoveArray) {
  if (board[finalIndex].value === "0") {
    validMoveArray.push(finalIndex);
  } else if (
    whichTeam(board[startIndex].value) !== whichTeam(board[finalIndex].value)
  ) {
    validMoveArray.push(finalIndex);
  }
  return validMoveArray;
}

// Creates an array of all of the valid moves for the selected piece.
export function validMoves(board, startIndex, castlingRules, whoseTurn) {
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
