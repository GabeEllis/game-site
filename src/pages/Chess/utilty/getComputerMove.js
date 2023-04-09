import { move, status, moves, aiMove, getFen } from "js-chess-engine";

export function getComputerMove(boardFen, difficulty) {
  const aiNextMove = aiMove(boardFen, difficulty);
  return aiNextMove;
}
