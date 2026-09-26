import { useNavigate } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import CreateGameForm from "../components/CreateGameForm";

/**
 * Page d'accueil avec le formulaire de création de partie.
 * Utilise le composant CreateGameForm pour la validation.
 * Navigation programmatique avec useNavigate.
 */
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
    <div>
      <h1>Accueil UNO</h1>

      <CardContainer>
        <h2>Créer une nouvelle partie</h2>
        <CreateGameForm onSubmit={handleCreateGame} />
      </CardContainer>
    </div>
  );
}

export default Home;
