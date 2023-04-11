import "./Home.scss";

function Home() {
  return (
    <article>
      <h1>Welcome to Game Site</h1>
      <h2>What's Game Site?</h2>
      <p>
        Game Site is a website where you can play chess. At the moment you can
        play your friend on the same device against each other or against the
        computer.
      </p>
      <h2>New to Chess?</h2>
      <p>
        Don't know how to play chess, no problem. Chess is a 2 player game where
        the object is to checkmate the enemy king. This is achieved by attacking
        the enemy king, known as putting them in check, and no matter what move
        your opponent plays they can't get out of check.
      </p>
      <p>
        There are still some more things you need to know about in order to play
        the game, such as how the pieces all move, what is castling, and what
        promoting a pawn is. No need to fear, wikipedia is here
        <a href="https://www.wikihow.com/Play-Chess"> How to Play</a>.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any suggestions of any new features or games you want to
        beat your friends at feel free to reach out to me.
      </p>
      <ul>
        <li>
          <p>name: Gabe Ellis</p>
        </li>
        <li>
          <p>
            email:
            <a href="mailto:gabeellis830@gmail.com?">gabeellis830@gmail.com</a>
          </p>
        </li>
        <li>
          <p>
            LinkedIn:
            <a href="https://www.linkedin.com/in/gabe-ellis1">
              https://www.linkedin.com/in/gabe-ellis1
            </a>
          </p>
        </li>
        <li>
          <p>
            GitHub:
            <a href="https://github.com/GabeEllis">
              https://github.com/GabeEllis
            </a>
          </p>
        </li>
      </ul>
    </article>
  );
}

export default Home;
