import { useNavigate } from "react-router-dom";
import CreateGameForm from "../components/CreateGameForm";
function Home() {
  const navigate = useNavigate();

  const handleCreateGame = (
    nomJoueur: string,
    nombreJoueurs: number
  ) => {
    const gameId = crypto.randomUUID();

    navigate(`/parties/${gameId}`, {
      state: {
        playerName: nomJoueur,
        numberOfPlayers: nombreJoueurs,
      },
    });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Accueil UNO</h1>

       <div className="card-container">
        <h2>Créer une nouvelle partie</h2>

        <CreateGameForm onSubmit={handleCreateGame} />
      </div>
    </div>
  );
}

export default Home;