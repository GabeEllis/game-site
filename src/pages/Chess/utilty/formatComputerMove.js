import { movePiece } from "../components/Board/Board";

export function formatComputerMove(object, board) {
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
  const startingIndex = board.findIndex((tile) => tile.id === formatString[0]);
  const finalIndex = board.findIndex((tile) => tile.id === formatString[1]);

  const finalBoard = JSON.parse(JSON.stringify(board));

  // console.log(startingIndex, finalIndex, boardAfterMove);
  // return [boardAfterMove[0], boardAfterMove[1]];
  return [startingIndex, finalIndex];
}
