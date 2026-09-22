export type StatutPartie = "en_attente" | "en_cours" | "terminee";

export interface EtatPartie {
  indexJoueurActif: number;
  sensJeu: 1 | -1;
  statut: StatutPartie;
}

export type ActionPartie =
  | { type: "DEMARRER_PARTIE" }
  | { type: "TOUR_SUIVANT"; nombreJoueurs: number }
  | { type: "INVERSER_SENS" }
  | { type: "TERMINER_PARTIE" }
  | { type: "REINITIALISER_PARTIE" };



export const etatInitialPartie: EtatPartie = {
  indexJoueurActif: 0,
  sensJeu: 1,
  statut: "en_attente",
};

export function reducerPartie(
  etat: EtatPartie,
  action: ActionPartie
): EtatPartie {
  switch (action.type) {
    case "DEMARRER_PARTIE":
      return {
        ...etat,
        statut: "en_cours",
        indexJoueurActif: 0,
      };

    case "TOUR_SUIVANT": {
      if (etat.statut !== "en_cours" || action.nombreJoueurs <= 0) {
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

    case "TERMINER_PARTIE":
  return {
    ...etat,
    statut: "terminee",
  };

    case "REINITIALISER_PARTIE":
      return etatInitialPartie;

    default:
      return etat;
  }
}