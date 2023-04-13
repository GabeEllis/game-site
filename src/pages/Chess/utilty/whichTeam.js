// Returns which team the input piece is.
export function whichTeam(pieceType) {
  const whitePieces = ["R", "N", "B", "Q", "K", "P"];
  const blackPieces = ["r", "n", "b", "q", "k", "p"];
  if (whitePieces.includes(pieceType)) {
    return "white";
  } else if (blackPieces.includes(pieceType)) {
    return "black";
  }
}
