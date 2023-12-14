import "./global.css";
import styles from "./App.module.css";

// function refresh() {
//   window.location.reload();
// }
const refresh = () => window.location.reload();

const createNewGame = () => {
  console.log("new game");

  const ws = new WebSocket("ws://127.0.0.1:8080");

  ws.addEventListener("message", (event) => {
    console.log("message recieved", event.data);
  });

  ws.addEventListener("open", (/* event */) => {
    ws.send("oh, hi there!");
  });
};

const App = () => (
  <>
    <header>
      <nav className={styles.nav}>
        <div />
        <img
          id="logo"
          src="/public/nerdle.svg"
          alt="nerdle"
          height={70}
          width={211}
        />
        <button type="submit" onClick={refresh}>
          New word!
        </button>
        <button id="btnCreate" onClick={createNewGame}>
          New Game
        </button>
        <button disabled id="btnJoin">
          Join Game
        </button>
        <input type="text" id="txtGameId" />
      </nav>
    </header>

    <div id="divPlayers" />
    <div id="drawBox" />
  </>
);

export default App;
