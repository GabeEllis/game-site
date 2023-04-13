import "./Tile.scss";
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
import { useEffect, useState } from "react";
import axios from "axios";

function Tile({
  id,
  value,
  squareColor,
  SelectPiece,
  isValidMove,
  isPromoted,
  promotionColor,
  PromotionOptions,
  theme,
}) {
  // Intializes the state variables for dark and light color squares.
  const [lightColor, setLightColor] = useState("white");
  const [darkColor, setDarkColor] = useState("grey");

  // Converts a board array value into a nice looking image of its corresponding chess piece.
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

  // Finds the information for the light and dark square color values based on the theme name.
  useEffect(() => {
    axios.get("http://localhost:8080/themes").then((response) => {
      const themeList = response.data;
      const filteredTheme = themeList.filter((themeItem) => {
        return themeItem.name === theme;
      });

      if (filteredTheme[0] && filteredTheme[0].light && filteredTheme[0].dark) {
        // Sets the light and dark square color to match the applied theme.
        setLightColor(filteredTheme[0].light);
        setDarkColor(filteredTheme[0].dark);
      }
    });
  }, [theme]);

  return (
    <div
      className="tile"
      style={
        squareColor % 2 === 0
          ? { backgroundColor: lightColor }
          : { backgroundColor: darkColor }
      }
    >
      <section
        className={
          isPromoted ? "tile__piece-image--hidden" : "tile__piece-image"
        }
        style={{ backgroundImage: `url(${getPieceImage(value)})` }}
        onClick={() => SelectPiece(id)}
      >
        <div
          className={
            isValidMove ? "tile__valid-moves" : "tile__valid-moves--hidden"
          }
        ></div>
      </section>
      <section
        className={
          isPromoted
            ? "tile__promotion-options"
            : "tile__promotion-options--hidden"
        }
      >
        <img
          src={promotionColor === "white" ? WhiteQueen : BlackQueen}
          onClick={
            promotionColor === "white"
              ? () => PromotionOptions("Q")
              : () => PromotionOptions("q")
          }
        />
        <img
          src={promotionColor === "white" ? WhiteKnight : BlackKnight}
          onClick={
            promotionColor === "white"
              ? () => PromotionOptions("N")
              : () => PromotionOptions("n")
          }
        />
        <img
          src={promotionColor === "white" ? WhiteRook : BlackRook}
          onClick={
            promotionColor === "white"
              ? () => PromotionOptions("R")
              : () => PromotionOptions("r")
          }
        />
        <img
          src={promotionColor === "white" ? WhiteBishop : BlackBishop}
          onClick={
            promotionColor === "white"
              ? () => PromotionOptions("B")
              : () => PromotionOptions("b")
          }
        />
      </section>
    </div>
  );
}

export default Tile;
