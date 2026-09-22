import { useLocation } from "react-router-dom";
import type { Player} from "../types/game";

function Game() {

  const location = useLocation();

  const playerName = location.state?.playerName;

  const player: Player = {
    id: "1",
    name: playerName || "Joueur",
    cards: []
  };

  return (
    <div>
      <h1>Partie UNO</h1>

      <p>Joueur : {player.name}</p>

    </div>
  );
}

export default Game;





