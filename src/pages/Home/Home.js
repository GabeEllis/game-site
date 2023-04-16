import "./Home.scss";
import whiteKing from "../../assets/images/3D_white_king.jpg";
import blackKing from "../../assets/images/3D_black_king.jpg";
import whiteQueen from "../../assets/images/3D_white_queen.jpg";
import blackQueen from "../../assets/images/3D_black_queen.jpg";
import whiteRook from "../../assets/images/3D_white_rook.jpg";
import blackRook from "../../assets/images/3D_black_rook.jpg";
import whiteBishop from "../../assets/images/3D_white_bishop.jpg";
import blackBishop from "../../assets/images/3D_black_bishop.jpg";
import whiteKnight from "../../assets/images/3D_white_knight.jpg";
import blackKnight from "../../assets/images/3D_black_knight.jpg";
import whitePawn from "../../assets/images/3D_white_pawn.jpg";
import blackPawn from "../../assets/images/3D_black_pawn.jpg";

function Home() {
  return (
    <article className="home">
      <h1 className="home__header">Welcome to Game Site</h1>

      <h2 className="home__section-header">What's Game Site?</h2>
      <p className="home__text">
        Game Site is a website where you can play chess. At the moment you can
        play your friend on the same device against each other or against the
        computer.
      </p>

      <section className="new">
        <h2 className="new__header">New to Chess?</h2>
        <p className="new__description">
          Don't know how to play chess, no problem. Chess is a two player
          turn-based game where the objective is to checkmate the enemy king.
          This is achieved by attacking the enemy king, known as putting them in
          check, and no matter what move your opponent plays they can't get
          themself out of check.
        </p>

        <h2 className="new__header">Chess Pieces</h2>
        <p className="new__text">
          In chess there are 6 pieces that each move in unique ways.
        </p>
        <ul>
          <li>
            <h2 className="new__section-header">King</h2>
            <div className="new__image-container">
              <img className="new__image" src={whiteKing} alt="white king" />
              <img className="new__image" src={blackKing} alt="black king" />
            </div>
            <p className="new__description">
              The king is arguably the weakest piece because it must be kept
              safe above all else. The king can move one square in any direction
              - horizontally, vertically, diagonally, or move through castling.
            </p>
          </li>
          <li>
            <h2 className="new__section-header">Queen</h2>
            <div className="new__image-container">
              <img className="new__image" src={whiteQueen} alt="white queen" />
              <img className="new__image" src={blackQueen} alt="black queen" />
            </div>
            <p className="new__description">
              The queen is the most powerful piece on the board and can move in
              any direction - horizontally, vertically, or diagonally - any
              number of squares. It is essentially a rook and a bishop combined.
            </p>
          </li>
          <li>
            <h2 className="new__section-header">Rook</h2>
            <div className="new__image-container">
              <img className="new__image" src={whiteRook} alt="white rook" />
              <img className="new__image" src={blackRook} alt="black rook" />
            </div>
            <p className="new__description">
              The rook is the 2nd most valuable chess piece. It can move any
              number of squares horizontally or vertically in a straight line.
            </p>
          </li>
          <li>
            <h2 className="new__section-header">Bishop</h2>
            <div className="new__image-container">
              <img
                className="new__image"
                src={whiteBishop}
                alt="white bishop"
              />
              <img
                className="new__image"
                src={blackBishop}
                alt="black bishop"
              />
            </div>
            <p className="new__description">
              The bishop can move any number of squares diagonally. Since a
              bishop will always be on the same square color it started on,
              bishops are also commonly referred to by their starting sqaure
              color, such as light and dark sqaure bishop.
            </p>
          </li>
          <li>
            <h2 className="new__section-header">Knight</h2>
            <div className="new__image-container">
              <img
                className="new__image"
                src={whiteKnight}
                alt="white knight"
              />
              <img
                className="new__image"
                src={blackKnight}
                alt="black knight"
              />
            </div>
            <p className="new__description">
              The knight moves in an L-shaped pattern, two squares in one
              direction and then one square perpendicular to that direction. It
              is the only piece that can "jump" over other pieces.
            </p>
          </li>
          <li>
            <h2 className="new__section-header">Pawn</h2>
            <div className="new__image-container">
              <img className="new__image" src={whitePawn} alt="white pawn" />
              <img className="new__image" src={blackPawn} alt="black pawn" />
            </div>
            <p className="new__description">
              The pawn is the least valuable piece on the board, but also the
              most unique. Pawns can only move forware one square at a time,
              except on their first move when they can move two squares. Pawns
              capture diagonally one square ahead of them. When a pawn reachs
              the end of the board it can be promoted, meaning the player can
              turn it into a different piece.
            </p>
          </li>
        </ul>

        <h2 className="new__section-header">Castling</h2>
        <p className="new__description">
          Castling is a special move in chess, it allows the King and one of the
          rooks to both move at the same time. To castle the king moves two
          tiles towards the rook it is castling with, then the rook moves onto
          the opposite side of the king. There are two types of castling:
          kingside and queenside. Kingside castling involves rook that starts
          closest to the king, and queenside involves the rook that starts
          closest to the queen.
        </p>
        <p className="new__description">
          There are several rules and conditions that must be met for a player
          to castle. For a player to castle the king and the rook it is trying
          to castle must have not moved this game. Castling also counts as the
          king moving, so each player can only castle once per game. There must
          be no pieces in-between the king and the rook. The player also can't
          castle if one of the squares it is attempting to castle through is
          under attack by an opponent's piece.
        </p>

        <p className="new__description">
          If you still have any questions or want to learn more about chess,
          Wikipedia is a great resource.
          <a href="https://www.wikihow.com/Play-Chess"> How to Play</a>.
        </p>
      </section>

      <h2 className="home__section-header">Contact Us</h2>
      <p className="home__text">
        If you have any suggestions of any new features or games you want to
        beat your friends at feel free to reach out to me.
      </p>
      <ul className="home__list">
        <li className="home__list-item">My name is Gabe Ellis</li>
        <li className="home__list-item">
          email:
          <a href="mailto:gabeellis830@gmail.com?">gabeellis830@gmail.com</a>
        </li>
        <li className="home__list-item">
          LinkedIn:
          <a href="https://www.linkedin.com/in/gabe-ellis1">
            https://www.linkedin.com/in/gabe-ellis1
          </a>
        </li>
        <li className="home__list-item">
          GitHub:
          <a href="https://github.com/GabeEllis">
            https://github.com/GabeEllis
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Home;
