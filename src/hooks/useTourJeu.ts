import type { Card, Player } from "../types/game";
import { usePartie } from "../context/GameContext";
import { useValidationCarte } from "./useValidationCarte";

export function useTourJeu() {
  const { etat, dispatch } = usePartie();
  const { peutJouerCarte } = useValidationCarte();

  const definirJoueurs = (joueurs: Player[]) => {
    dispatch({
      type: "DEFINIR_JOUEURS",
      joueurs,
    });
  };

  const definirPioche = (pioche: Card[]) => {
    dispatch({
      type: "DEFINIR_PIOCHE",
      pioche,
    });
  };

  const demarrerPartie = () => {
    dispatch({ type: "DEMARRER_PARTIE" });
  };

  const passerAuTourSuivant = () => {
    dispatch({
      type: "TOUR_SUIVANT",
      nombreJoueurs: etat.joueurs.length,
    });
  };

  const inverserSens = () => {
    dispatch({ type: "INVERSER_SENS" });
  };

  const piocherCarte = (joueurId: string) => {
    dispatch({
      type: "PIOCHER_CARTE",
      joueurId,
    });
  };

  const jouerCarte = (joueurId: string, carte: Card): boolean => {
    if (!peutJouerCarte(carte)) {
      return false;
    }

    dispatch({
      type: "JOUER_CARTE",
      joueurId,
      carte,
    });

    return true;
  };

  const terminerPartie = () => {
    dispatch({ type: "TERMINER_PARTIE" });
  };

  const reinitialiserPartie = () => {
    dispatch({ type: "REINITIALISER_PARTIE" });
  };

  return {
    etat,
    definirJoueurs,
    definirPioche,
    demarrerPartie,
    passerAuTourSuivant,
    inverserSens,
    piocherCarte,
    jouerCarte,
    terminerPartie,
    reinitialiserPartie,
  };
}