import "./Home.scss";

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
      <h2 className="home__section-header">New to Chess?</h2>
      <p>
        Don't know how to play chess, no problem. Chess is a 2 player game where
        the object is to checkmate the enemy king. This is achieved by attacking
        the enemy king, known as putting them in check, and no matter what move
        your opponent plays they can't get out of check.
      </p>
      <p className="home__text">
        There are still some more things you need to know about in order to play
        the game, such as how the pieces all move, what is castling, and what
        promoting a pawn is. No need to fear, wikipedia is here
        <a href="https://www.wikihow.com/Play-Chess"> How to Play</a>.
      </p>
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
