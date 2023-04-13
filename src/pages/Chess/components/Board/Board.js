import "./Board.scss";
import Tile from "../Tile/Tile";
import GameOver from "../GameOver/GameOver";
import Player from "../Player/Player";
import startingBoard from "../../data/startingBoard.json";
import { convertBoardToFen } from "../../utilty/convertBoardToFen";
import { getComputerMove } from "../../utilty/getComputerMove";
import { formatComputerMove } from "../../utilty/formatComputerMove";
import { movePiece } from "../../utilty/movePiece";
import { validMoves } from "../../utilty/validMoves";
import { whichTeam } from "../../utilty/whichTeam";
import { inCheck } from "../../utilty/inCheck";
import { isGameOver } from "../../utilty/isGameOver";
import { useState, useEffect, useRef } from "react";

function Board({ name, elo, theme }) {
  // Intializes state variables.
  const [gameStarted, setGameStarted] = useState(true);
  const [currentBoard, setCurrentBoard] = useState(startingBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [promotionChoice, setPromotionChoice] = useState(null);
  const [isComputer, setIsComputer] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  // Intializes gameStatus.
  let gameStatus = false;
  let stalemateStatus = false;
  let selectedValidMoves = [];

  // Gets information for player 2.
  let player2Name = "Player 2";
  let player2Elo = "1000";
  if (isComputer) {
    player2Name = "Computer";
    if (difficulty === 0) {
      player2Elo = "Beginner";
    } else if (difficulty === 1) {
      player2Elo = "Easy";
    } else if (difficulty === 2) {
      player2Elo = "Medium";
    } else if (difficulty === 3) {
      player2Elo = "Hard";
    }
  }
  let boardAfterMove = [];

  // Gets previously selected piece.
  const prevPiece = useRef("");
  let lastSelectedPiece = prevPiece.current;

  useEffect(() => {
    prevPiece.current = selectedPiece;
  }, [selectedPiece]);

  // Gets previously selected turn.
  const prevTurn = useRef("white");
  let whoseTurn = prevTurn.current;

  // Gets previously selected capturedPiece.
  const prevCapture = useRef([]);
  let capturedPiecesArray = prevCapture.current;

  // Gets castling rules values.
  const prevCastlingRules = useRef({
    hasWhiteKingRookMoved: false,
    hasWhiteQueenRookMoved: false,
    hasBlackKingRookMoved: false,
    hasBlackQueenRookMoved: false,
  });
  let castlingRules = prevCastlingRules.current;

  // Finds the piece the users clicks on and sets selected piece equal to it.
  const SelectPiece = (id) => {
    const foundPiece = currentBoard.find((tile) => tile.id === id);
    setSelectedPiece(foundPiece);
  };

  // Finds the piece the users clicks on and sets selected piece equal to it.
  const PromotionOptions = (piece) => {
    setPromotionChoice(piece);
  };

  // Start of the turn.
  // If a piece has been selected or a pawn is in the process of being promoted.
  if (!isComputer || whoseTurn === "white") {
    if (selectedPiece || promotionChoice) {
      // Gets the index of the selected piece.
      const foundPieceIndex = currentBoard.findIndex(
        (tile) => tile.id === selectedPiece.id
      );
      // Gets the validMoves array for the selected piece.
      selectedValidMoves = validMoves(
        currentBoard,
        foundPieceIndex,
        castlingRules,
        whoseTurn
      );

      // If a piece has been selected last turn or a pawn is in the process of being promoted.
      if (lastSelectedPiece || promotionChoice) {
        // If last selected piece is the same color as whose turn.
        if (
          whichTeam(lastSelectedPiece.value) === whoseTurn ||
          promotionChoice
        ) {
          // Gets the index of the previously selected piece.
          const lastFoundPieceIndex = currentBoard.findIndex(
            (tile) => tile.id === lastSelectedPiece.id
          );
          let lastValidMoves = validMoves(
            currentBoard,
            lastFoundPieceIndex,
            castlingRules,
            whoseTurn
          );

          // If the selected piece is included in the last selected piece's valid moves array.
          if (lastValidMoves.includes(foundPieceIndex) || promotionChoice) {
            boardAfterMove = movePiece(
              currentBoard,
              lastFoundPieceIndex,
              foundPieceIndex
            );

            // Checks for white king side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteKingRookMoved &&
              foundPieceIndex === 62
            ) {
              castlingRules.hasWhiteKingRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 63, 61);
            }
            // Checks for white queen side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "K" &&
              !castlingRules.hasWhiteQueenRookMoved &&
              foundPieceIndex === 58
            ) {
              castlingRules.hasWhiteQueenRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 56, 59);
            }
            // Checks for black king side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "k" &&
              !castlingRules.hasBlackKingRookMoved &&
              foundPieceIndex === 6
            ) {
              castlingRules.hasBlackKingRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 7, 5);
            }
            // Checks for black queen side castle and then moves the rook.
            if (
              currentBoard[lastFoundPieceIndex].value === "k" &&
              !castlingRules.hasBlackQueenRookMoved &&
              foundPieceIndex === 2
            ) {
              castlingRules.hasBlackQueenRookMoved = true;
              boardAfterMove = movePiece(boardAfterMove[0], 0, 3);
            }

            // If white king moves, set hasWhiteKingMoved to true.
            if (currentBoard[lastFoundPieceIndex].value === "K") {
              castlingRules.hasWhiteKingRookMoved = true;
              castlingRules.hasWhiteQueenRookMoved = true;
              // If white king rook moves, set hasWhiteKingRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 63
            ) {
              castlingRules.hasWhiteKingRookMoved = true;
              // If white queen rook moves, set hasWhiteQueenRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "R" &&
              lastFoundPieceIndex === 56
            ) {
              castlingRules.hasWhiteQueenRookMoved = true;
              // If black king moves, set hasBlackKingMoved to true.
            } else if (currentBoard[lastFoundPieceIndex].value === "k") {
              castlingRules.hasBlackKingRookMoved = true;
              castlingRules.hasBlackQueenRookMoved = true;
              // If black king rook moves, set hasBlackKingRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 7
            ) {
              castlingRules.hasBlackKingRookMoved = true;
              // If black queen rook moves, set hasBlackQueenRookMoved to true.
            } else if (
              currentBoard[lastFoundPieceIndex].value === "r" &&
              lastFoundPieceIndex === 0
            ) {
              castlingRules.hasBlackQueenRookMoved = true;
            }

            // If a white pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (
              boardAfterMove[0][foundPieceIndex].value === "P" &&
              foundPieceIndex <= 7 &&
              whoseTurn === "white"
            ) {
              boardAfterMove[0][foundPieceIndex].isPromoted = true;
              boardAfterMove[0][foundPieceIndex].promotionColor = "white";
            }
            // If a black pawn gets to the end of the board, give the user the ability to promote it to another piece.
            if (
              currentBoard[lastFoundPieceIndex].value === "p" &&
              foundPieceIndex >= 56 &&
              whoseTurn === "black"
            ) {
              boardAfterMove[0][foundPieceIndex].isPromoted = true;
              boardAfterMove[0][foundPieceIndex].promotionColor = "black";
            }

            if (promotionChoice && foundPieceIndex <= 7) {
              currentBoard[foundPieceIndex].value = promotionChoice;
              currentBoard[foundPieceIndex].isPromoted = false;
              setPromotionChoice(null);
            }
            if (promotionChoice && foundPieceIndex >= 56) {
              currentBoard[foundPieceIndex].value = promotionChoice;
              currentBoard[foundPieceIndex].isPromoted = false;
              setPromotionChoice(null);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (whoseTurn === "black" && isComputer && !gameStatus) {
      const currentBoardFen = convertBoardToFen(
        currentBoard,
        whoseTurn,
        castlingRules
      );

      const rawComputerMove = getComputerMove(currentBoardFen, difficulty);
      const [startingIndex, computerMove] = formatComputerMove(
        rawComputerMove,
        currentBoard
      );

      let [computerBoard, computerCapturedPiece] = movePiece(
        currentBoard,
        startingIndex,
        computerMove
      );

      // Checks for black king side castle and then moves the rook.
      if (
        computerBoard[computerMove].value === "k" &&
        !castlingRules.hasBlackKingRookMoved &&
        computerMove === 6
      ) {
        castlingRules.hasBlackKingRookMoved = true;
        [computerBoard, computerCapturedPiece] = movePiece(computerBoard, 7, 5);
      }
      // Checks for black queen side castle and then moves the rook.
      if (
        computerBoard[computerMove].value === "k" &&
        !castlingRules.hasBlackQueenRookMoved &&
        computerMove === 2
      ) {
        castlingRules.hasBlackQueenRookMoved = true;
        [computerBoard, computerCapturedPiece] = movePiece(computerBoard, 0, 3);
      }

      // If black king moves, set hasBlackKingMoved to true.
      if (computerBoard[computerMove].value === "k") {
        castlingRules.hasBlackKingRookMoved = true;
        castlingRules.hasBlackQueenRookMoved = true;
        // If black king rook moves, set hasBlackKingRookMoved to true.
      } else if (
        computerBoard[computerMove].value === "r" &&
        startingIndex === 7
      ) {
        castlingRules.hasBlackKingRookMoved = true;
        // If black queen rook moves, set hasBlackQueenRookMoved to true.
      } else if (
        computerBoard[computerMove].value === "r" &&
        startingIndex === 0
      ) {
        castlingRules.hasBlackQueenRookMoved = true;
      }

      // If the computers gets a pawn to the end of the board.
      if (computerBoard[computerMove].value === "p" && computerMove >= 56) {
        computerBoard[computerMove].value = "q";
      }

      prevCastlingRules.current = castlingRules;

      // If a piece was captured, add it to the capturedPiecesArray.
      if (computerCapturedPiece) {
        capturedPiecesArray.push(computerCapturedPiece);
      }

      // Changes the next turn to be white.
      whoseTurn = "white";
      prevTurn.current = whoseTurn;

      // Updates the board state based on computer's move.
      setCurrentBoard(computerBoard);
      // If a user move was made.
    } else if (boardAfterMove.length !== 0) {
      // After a move is made, it changes the turn to the opposite team.
      if (whoseTurn === "white") {
        prevTurn.current = "black";
      } else if (whoseTurn === "black") {
        prevTurn.current = "white";
      }

      // If a piece was captured, add it to the capturedPiecesArray.
      if (boardAfterMove[1]) {
        capturedPiecesArray.push(boardAfterMove[1]);
      }

      prevCastlingRules.current = castlingRules;

      // Updates the board state based on player's move.
      setCurrentBoard(boardAfterMove[0]);
      setGameStarted(false);
    }
  });

  // Resets the game if the user clicks a button.
  const opponentHandler = (option, difficulty) => {
    gameStatus = null;
    prevCapture.current = [];
    castlingRules = {
      hasWhiteKingRookMoved: false,
      hasWhiteQueenRookMoved: false,
      hasBlackKingRookMoved: false,
      hasBlackQueenRookMoved: false,
    };
    lastSelectedPiece = null;
    prevTurn.current = "white";
    setGameStarted(false);
    setSelectedPiece(null);
    setCurrentBoard(startingBoard);
    setIsComputer(option);
    setDifficulty(difficulty);
  };

  // Checks to see if the game is over.
  gameStatus = isGameOver(currentBoard, whoseTurn, castlingRules);
  if (gameStatus) {
    // When the game has ended, decides if it was stalemate of checkmate.
    stalemateStatus = !inCheck(currentBoard, whoseTurn);
  }

  return (
    <article className="board-container">
      <Player
        name={player2Name}
        elo={player2Elo}
        team={"black"}
        capturedPiecesArray={capturedPiecesArray}
      />
      <section className="board">
        {currentBoard.map((tile, index) => {
          return (
            <Tile
              key={tile.id}
              id={tile.id}
              value={tile.value}
              squareColor={tile.squareColor}
              SelectPiece={SelectPiece}
              isValidMove={selectedValidMoves.includes(index)}
              isPromoted={tile.isPromoted}
              promotionColor={tile.promotionColor}
              PromotionOptions={PromotionOptions}
              theme={theme}
            />
          );
        })}
        <GameOver
          gameStarted={gameStarted}
          gameStatus={gameStatus}
          whoseTurn={whoseTurn}
          stalemateStatus={stalemateStatus}
          opponentHandler={opponentHandler}
        />
      </section>
      <Player
        name={name}
        elo={elo}
        team={"white"}
        capturedPiecesArray={capturedPiecesArray}
      />
    </article>
  );
}

export default Board;
