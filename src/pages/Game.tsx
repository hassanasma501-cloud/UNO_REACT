import type { Player, GameStatus } from "../types/game";

function Game() {
  const player: Player = {
    id: "1",
    name: "Alex",
    cards: []
  };

  const status: GameStatus = "playing";

  return (
    <div>
      <h1>Partie UNO</h1>
      <p>Joueur : {player.name}</p>
      <p>État : {status}</p>
    </div>
  );
}

export default Game;







