// Moves a piece, and when it does replace its original location with a 0.
export function movePiece(board, startIndex, finalIndex) {
  const boardAfterMove = JSON.parse(JSON.stringify(board));
  const capturedPiece = boardAfterMove[finalIndex].value;

  boardAfterMove[finalIndex].value = boardAfterMove[startIndex].value;
  boardAfterMove[startIndex].value = "0";

  return [boardAfterMove, capturedPiece];
}
