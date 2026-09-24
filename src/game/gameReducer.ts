import type { Card, Player, GameStatus } from "../types/game";

export interface EtatPartie {
  joueurs: Player[];
  pioche: Card[];
  carteDessus: Card | null;
  indexJoueurActif: number;
  sensJeu: 1 | -1;
  statut: GameStatus;
}

export type ActionPartie =
  | { type: "DEFINIR_JOUEURS"; joueurs: Player[] }
  | { type: "DEFINIR_PIOCHE"; pioche: Card[] }
  | { type: "DEMARRER_PARTIE" }
  | { type: "TOUR_SUIVANT"; nombreJoueurs: number }
  | { type: "INVERSER_SENS" }
  | { type: "PIOCHER_CARTE"; joueurId: string }
  | { type: "JOUER_CARTE"; joueurId: string; carte: Card }
  | { type: "TERMINER_PARTIE" }
  | { type: "REINITIALISER_PARTIE" };

export const etatInitialPartie: EtatPartie = {
  joueurs: [],
  pioche: [],
  carteDessus: null,
  indexJoueurActif: 0,
  sensJeu: 1,
  statut: "waiting",
};

export function reducerPartie(
  etat: EtatPartie,
  action: ActionPartie
): EtatPartie {
  switch (action.type) {
    case "DEFINIR_JOUEURS":
      return {
        ...etat,
        joueurs: action.joueurs,
      };

    case "DEFINIR_PIOCHE": {
  const [premiereCarte, ...restePioche] = action.pioche;

  return {
    ...etat,
    pioche: restePioche,
    carteDessus: premiereCarte ?? null,
  };
}

      

    case "DEMARRER_PARTIE":
      return {
        ...etat,
        statut: "playing",
        indexJoueurActif: 0,
      };

    case "TOUR_SUIVANT": {
      if (etat.statut !== "playing" || action.nombreJoueurs <= 0) {
        return etat;
      }

      const nouvelIndex =
        (etat.indexJoueurActif + etat.sensJeu + action.nombreJoueurs) %
        action.nombreJoueurs;

      return {
        ...etat,
        indexJoueurActif: nouvelIndex,
      };
    }

    case "INVERSER_SENS":
      return {
        ...etat,
        sensJeu: etat.sensJeu === 1 ? -1 : 1,
      };

    case "PIOCHER_CARTE": {
      if (etat.pioche.length === 0) {
        return etat;
      }

      const [cartePiochee, ...nouvellePioche] = etat.pioche;

      if (!cartePiochee) {
        return etat;
      }

      const nouveauxJoueurs = etat.joueurs.map((joueur) =>
        joueur.id === action.joueurId
          ? {
              ...joueur,
              cards: [...joueur.cards, cartePiochee],
            }
          : joueur
      );

      return {
        ...etat,
        joueurs: nouveauxJoueurs,
        pioche: nouvellePioche,
      };
    }

    case "JOUER_CARTE": {
      const joueur = etat.joueurs.find(
        (joueur) => joueur.id === action.joueurId
      );

      if (!joueur) {
        return etat;
      }

      const possedeCarte = joueur.cards.some(
        (carte) => carte.id === action.carte.id
      );

      if (!possedeCarte) {
        return etat;
      }

      const nouvellesCartes = joueur.cards.filter(
        (carte) => carte.id !== action.carte.id
      );

      const nouveauxJoueurs = etat.joueurs.map((joueurCourant) =>
        joueurCourant.id === action.joueurId
          ? {
              ...joueurCourant,
              cards: nouvellesCartes,
            }
          : joueurCourant
      );

      return {
        ...etat,
        joueurs: nouveauxJoueurs,
        carteDessus: action.carte,
        statut:
          nouvellesCartes.length === 0
            ? "finished"
            : etat.statut,
      };
    }

    case "TERMINER_PARTIE":
      return {
        ...etat,
        statut: "finished",
      };

    case "REINITIALISER_PARTIE":
      return etatInitialPartie;

    default:
      return etat;
  }
}