import { move, status, moves, aiMove, getFen } from "js-chess-engine";

// Gets the AI move based on the board state.
export function getComputerMove(boardFen, difficulty) {
  const aiNextMove = aiMove(boardFen, difficulty);
  return aiNextMove;
}
