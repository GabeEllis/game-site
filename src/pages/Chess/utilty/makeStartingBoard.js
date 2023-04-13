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

// Creates the starting chess board.
export function makeStartingBoard() {
  // Intialize the startingBoard.
  let startingBoard = [];
  // Used to creates the id values for the chess tiles.
  const horizontalLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const verticalLabels = ["8", "7", "6", "5", "4", "3", "2", "1"];

  // Loops through an 8 by 8 to generate the startingBoard with several key-value pairs for each tile.
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

  return startingBoard;
}
