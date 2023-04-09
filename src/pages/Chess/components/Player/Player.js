import "./Player.scss";
import CapturedPieces from "../CapturedPieces/CapturedPieces";
import WhitePawn from "../../../../assets/images/white_pawn.png";
import BlackPawn from "../../../../assets/images/black_pawn.png";

function Player({ name, elo, team, capturedPiecesArray }) {
  console.log(typeof number);
  return (
    <section className="player">
      <img
        src={team === "white" ? WhitePawn : BlackPawn}
        style={
          team === "white"
            ? { backgroundColor: "lightblue" }
            : { backgroundColor: "lightcoral" }
        }
      />
      <div>
        <div className="player__data-container">
          <p className="player__name">{name}&nbsp;</p>
          <p className="player__elo">({elo})</p>
        </div>
        <CapturedPieces capturedPiecesArray={capturedPiecesArray} team={team} />
      </div>
    </section>
  );
}

export default Player;
