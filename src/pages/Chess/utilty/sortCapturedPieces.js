// Sorts the array based on the value from greatest to least.
function sortArray(array) {
  array.sort((a, b) => {
    return b.value - a.value;
  });
}

// Finds the total number of points that have been captured.
export function findTotalPoints(array) {
  // Intializes the total points at 0.
  let totalPoints = 0;
  // Loops through the list of captured pieces and converts the piece values into a number.
  array.forEach((piece) => {
    if (piece === "Q" || piece === "q") {
      totalPoints += 9;
    } else if (piece === "R" || piece === "r") {
      totalPoints += 5;
    } else if (piece === "B" || piece === "b") {
      totalPoints += 3;
    } else if (piece === "N" || piece === "n") {
      totalPoints += 3;
    } else if (piece === "P" || piece === "p") {
      totalPoints += 1;
    }
  });
  return totalPoints;
}

// Sorts the captured pieces.
export function sortCapturedPieces(capturedPiecesArray) {
  // Intializes the sortedArray.
  let sortedArray = [];
  // Loops through the list of captured pieces and assigns a value for each captured piece so that it can be sorted by value.
  capturedPiecesArray.forEach((piece) => {
    if (piece === "Q" || piece === "q") {
      sortedArray.push({ piece: piece, value: 9 });
    } else if (piece === "R" || piece === "r") {
      sortedArray.push({ piece: piece, value: 5 });
    } else if (piece === "B" || piece === "b") {
      sortedArray.push({ piece: piece, value: 3 });
    } else if (piece === "N" || piece === "n") {
      sortedArray.push({ piece: piece, value: 3 });
    } else if (piece === "P" || piece === "p") {
      sortedArray.push({ piece: piece, value: 1 });
    }
  });
  // Calls the sort function to reorder the array based on piece value.
  sortArray(sortedArray);

  return sortedArray;
}
