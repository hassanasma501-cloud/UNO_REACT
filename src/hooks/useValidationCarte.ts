export function useValidationCarte() {
  const peutJouerCarte = (
    couleurCarte: string,
    valeurCarte: string,
    couleurCarteDessus: string,
    valeurCarteDessus: string,
    estJoker = false
  ): boolean => {
    if (estJoker) {
      return true;
    }

    const memeCouleur = couleurCarte === couleurCarteDessus;
    const memeValeur = valeurCarte === valeurCarteDessus;

    return memeCouleur || memeValeur;
  };

  return {
    peutJouerCarte,
  };
}