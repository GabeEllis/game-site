import { movePiece } from "../components/Board/Board";

export function formatComputerMove(object, board) {
  // Converts the AI move output into a useable form so that game logic can be applied to it.
  let stringMove = JSON.stringify(object);
  const formatString = stringMove
    .replace("{", "")
    .replace("}", "")
    .replace(`"`, "")
    .replace(`"`, "")
    .replace(`"`, "")
    .replace(`"`, "")
    .toLowerCase()
    .split(":");

  // Gets the index where the id of the starting location of the piece for the AI move.
  const startingIndex = board.findIndex((tile) => tile.id === formatString[0]);
  // Gets the index where the id of the location after the piece moves for the AI move.
  const finalIndex = board.findIndex((tile) => tile.id === formatString[1]);

  // const finalBoard = JSON.parse(JSON.stringify(board));

  return [startingIndex, finalIndex];
}
