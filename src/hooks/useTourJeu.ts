import { usePartie } from "../context/GameContext";

export function useTourJeu(nombreJoueurs: number) {
  const { etat, dispatch } = usePartie();

  const demarrerPartie = () => {
    dispatch({ type: "DEMARRER_PARTIE" });
  };

  const passerAuTourSuivant = () => {
    dispatch({
      type: "TOUR_SUIVANT",
      nombreJoueurs,
    });
  };

  const inverserSens = () => {
    dispatch({ type: "INVERSER_SENS" });
  };

  const terminerPartie = () => {
    dispatch({ type: "TERMINER_PARTIE" });
  };

  const reinitialiserPartie = () => {
    dispatch({ type: "REINITIALISER_PARTIE" });
  };

  return {
    etat,
    demarrerPartie,
    passerAuTourSuivant,
    inverserSens,
    terminerPartie,
    reinitialiserPartie,
  };
}