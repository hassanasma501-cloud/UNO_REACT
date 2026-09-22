import type { Card } from "../types/game";
import { usePartie } from "../context/GameContext";

export function useValidationCarte() {
  const { etat } = usePartie();

  const peutJouerCarte = (carte: Card): boolean => {
    const carteDessus = etat.carteDessus;

    // S'il n'y a encore aucune carte sur la table
    if (carteDessus === null) {
      return true;
    }

    // Un joker peut être joué sur n'importe quelle carte
    if (carte.color === "wild") {
      return true;
    }

    const memeCouleur = carte.color === carteDessus.color;
    const memeType = carte.type === carteDessus.type;

    const memeValeur =
      carte.type === "number" &&
      carteDessus.type === "number" &&
      carte.value === carteDessus.value;

    return memeCouleur || memeType || memeValeur;
  };

  return {
    peutJouerCarte,
  };
}