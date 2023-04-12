import "./CapturedPieces.scss";
import { useState } from "react";
import {
  sortCapturedPieces,
  findTotalPoints,
} from "../../utilty/sortCapturedPieces";
import WhiteRook from "../../../../assets/images/white_rook.png";
import WhiteKnight from "../../../../assets/images/white_knight.png";
import WhiteBishop from "../../../../assets/images/white_bishop.png";
import WhiteQueen from "../../../../assets/images/white_queen.png";
import WhiteKing from "../../../../assets/images/white_king.png";
import WhitePawn from "../../../../assets/images/white_pawn.png";
import BlackRook from "../../../../assets/images/black_rook.png";
import BlackKnight from "../../../../assets/images/black_knight.png";
import BlackBishop from "../../../../assets/images/black_bishop.png";
import BlackQueen from "../../../../assets/images/black_queen.png";
import BlackKing from "../../../../assets/images/black_king.png";
import BlackPawn from "../../../../assets/images/black_pawn.png";

function CapturedPieces({ capturedPiecesArray, team }) {
  let filtedCapturedPieceArray = [];

  function getPieceImage(value) {
    if (value === "R") {
      return WhiteRook;
    } else if (value === "N") {
      return WhiteKnight;
    } else if (value === "B") {
      return WhiteBishop;
    } else if (value === "Q") {
      return WhiteQueen;
    } else if (value === "K") {
      return WhiteKing;
    } else if (value === "P") {
      return WhitePawn;
    } else if (value === "r") {
      return BlackRook;
    } else if (value === "n") {
      return BlackKnight;
    } else if (value === "b") {
      return BlackBishop;
    } else if (value === "q") {
      return BlackQueen;
    } else if (value === "k") {
      return BlackKing;
    } else if (value === "p") {
      return BlackPawn;
    } else if (value === "0") {
      return "";
    }
  }

  if (!capturedPiecesArray) {
    return;
  }

  capturedPiecesArray.forEach((piece) => {
    if (team === "black" && /^[A-Z]+$/.test(piece)) {
      filtedCapturedPieceArray.push(piece);
    } else if (team === "white" && /^[a-z]+$/.test(piece)) {
      filtedCapturedPieceArray.push(piece);
    }
  });

  const sortedCapturedPieceArray = sortCapturedPieces(filtedCapturedPieceArray);

  return (
    <ul className="captured-pieces">
      {sortedCapturedPieceArray.map((piece) => {
        return (
          <img
            src={getPieceImage(piece.piece)}
            alt={piece.piece}
            className="captured-pieces__piece"
          />
        );
      })}
    </ul>
  );
}

export default CapturedPieces;
