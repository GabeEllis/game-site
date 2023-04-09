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

function Tile({
  id,
  value,
  squareColor,
  SelectPiece,
  isValidMove,
  isPromoted,
  promotionColor,
  PromotionOptions,
}) {
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

  return (
    <tile
      className={
        squareColor % 2 === 0
          ? "tile tile__light-square"
          : "tile tile__dark-square"
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
    </tile>
  );
}

export default Tile;
