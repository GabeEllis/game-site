import {
  rookMoves,
  bishopMoves,
  knightMoves,
  pawnMoves,
} from "../utilty/pieceMoveLogic";

// Checks to see if the king is in check.
export function inCheck(board, whoseTurn) {
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

// Finds the index of the king based on whose turn it is.
export function findKingIndex(board, whoseTurn) {
  let kingIndex;
  if (whoseTurn === "white") {
    kingIndex = board.findIndex((tile) => tile.value === "K");
  } else if (whoseTurn === "black") {
    kingIndex = board.findIndex((tile) => tile.value === "k");
  }
  return kingIndex;
}
