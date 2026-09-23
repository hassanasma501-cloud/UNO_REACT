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
  const joueurActif = etat.joueurs[etat.indexJoueurActif];

  // Seul le joueur dont c'est le tour peut jouer
  if (!joueurActif || joueurActif.id !== joueurId) {
    return false;
  }

  // Vérifie si la carte respecte les règles UNO
  if (!peutJouerCarte(carte)) {
    return false;
  }

  // Vérifie si cette carte est la dernière du joueur
  const derniereCarte = joueurActif.cards.length === 1;

  dispatch({
    type: "JOUER_CARTE",
    joueurId,
    carte,
  });

  // Si le joueur vient de poser sa dernière carte,
  // la partie est terminée : on ne change plus de tour.
  if (derniereCarte) {
    return true;
  }

  const nombreJoueurs = etat.joueurs.length;

  if (nombreJoueurs === 0) {
    return true;
  }

  const indexJoueurSuivant =
    (etat.indexJoueurActif + etat.sensJeu + nombreJoueurs) %
    nombreJoueurs;

  const joueurSuivant = etat.joueurs[indexJoueurSuivant];

  switch (carte.type) {
    case "reverse":
      dispatch({ type: "INVERSER_SENS" });

      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });
      break;

    case "skip":
      // Premier changement : joueur suivant
      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });

      // Deuxième changement : on saute ce joueur
      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });
      break;

    case "draw2":
      if (joueurSuivant) {
        dispatch({
          type: "PIOCHER_CARTE",
          joueurId: joueurSuivant.id,
        });

        dispatch({
          type: "PIOCHER_CARTE",
          joueurId: joueurSuivant.id,
        });
      }

      // Le joueur qui pioche perd son tour
      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });

      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });
      break;

    case "wildDraw4":
      if (joueurSuivant) {
        for (let i = 0; i < 4; i++) {
          dispatch({
            type: "PIOCHER_CARTE",
            joueurId: joueurSuivant.id,
          });
        }
      }

      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });

      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });
      break;

    default:
      // Carte normale ou joker simple
      dispatch({
        type: "TOUR_SUIVANT",
        nombreJoueurs,
      });
  }

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