function sortArray(array) {
  array.sort((a, b) => {
    return b.value - a.value;
  });
}

export function findTotalPoints(array) {
  let totalPoints = 0;
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

export function sortCapturedPieces(capturedPiecesArray) {
  let sortedArray = [];

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
  sortArray(sortedArray);

  return sortedArray;
}
