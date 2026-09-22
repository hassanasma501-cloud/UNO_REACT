
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CardContainer from "../components/CardContainer";

function Home() {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");

  const handleCreateGame = () => {
    if (playerName.trim() === "") {
      return;
    }
  const gameId = crypto.randomUUID();
    navigate(`/parties/${gameId}`, {
  state: {
    playerName: playerName
  }
});
  };

  return (
    <div>
      <h1>Accueil UNO</h1>

      <CardContainer>
        <h2>Bienvenue dans UNO Online</h2>

        <label htmlFor="playerName">
          Nom du joueur :
        </label>

        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          placeholder="Entre ton nom"
        />

        <Button onClick={handleCreateGame}>
          Créer une partie
        </Button>
      </CardContainer>
    </div>
  );
}

export default Home;
