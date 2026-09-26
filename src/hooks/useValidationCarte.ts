import type { Card } from "../types/game";
import { usePartie } from "../context/GameContext";

export function useValidationCarte() {
  const { etat } = usePartie();

  const peutJouerCarte = (carte: Card): boolean => {
    const carteDessus = etat.carteDessus;

    // S'il n'y a encore aucune carte sur la table,
    // la première carte peut être jouée.
    if (carteDessus === null) {
      return true;
    }

    // Les jokers peuvent être joués sur n'importe quelle carte.
    if (carte.color === "wild") {
      return true;
    }

    // Dans notre version simplifiée, après un joker,
    // n'importe quelle couleur peut être jouée.
    if (carteDessus.color === "wild") {
      return true;
    }

    // Même couleur : carte autorisée.
    if (carte.color === carteDessus.color) {
      return true;
    }

    // Pour deux cartes numériques,
    // il faut que leur valeur soit identique.
    if (
      carte.type === "number" &&
      carteDessus.type === "number"
    ) {
      return carte.value === carteDessus.value;
    }

    // Pour les cartes spéciales,
    // le même symbole/type peut être joué.
    if (
      carte.type !== "number" &&
      carteDessus.type !== "number"
    ) {
      return carte.type === carteDessus.type;
    }

    return false;
  };

  return {
    peutJouerCarte,
  };
}