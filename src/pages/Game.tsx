import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { Card, Player } from "../types/game";
import { useTourJeu } from "../hooks/useTourJeu";
import { PlateauJeu } from "../components/game/PlateauJeu";

function Game() {
  const location = useLocation();
  const playerName = location.state?.playerName || "Joueur";

  const {
    etat,
    definirJoueurs,
    definirPioche,
    demarrerPartie,
    piocherCarte,
    jouerCarte,
  } = useTourJeu();

  useEffect(() => {
    const joueurs: Player[] = [
      {
        id: "1",
        name: playerName,
        cards: [
          { id: "j1-1", color: "red", type: "number", value: 5 },
          { id: "j1-2", color: "blue", type: "number", value: 2 },
          { id: "j1-3", color: "green", type: "draw2" },
          { id: "j1-4", color: "wild", type: "wild" },
        ],
      },
      {
        id: "2",
        name: "Joueur 2",
        cards: [
          { id: "j2-1", color: "red", type: "number", value: 7 },
          { id: "j2-2", color: "yellow", type: "number", value: 3 },
          { id: "j2-3", color: "red", type: "skip" },
          { id: "j2-4", color: "wild", type: "wildDraw4" },
        ],
      },
      {
        id: "3",
        name: "Joueur 3",
        cards: [
          { id: "j3-1", color: "red", type: "number", value: 9 },
          { id: "j3-2", color: "green", type: "reverse" },
          { id: "j3-3", color: "blue", type: "number", value: 6 },
          { id: "j3-4", color: "yellow", type: "number", value: 4 },
        ],
      },
    ];

    const pioche: Card[] = [
      { id: "p1", color: "blue", type: "number", value: 1 },
      { id: "p2", color: "green", type: "number", value: 2 },
      { id: "p3", color: "yellow", type: "number", value: 3 },
      { id: "p4", color: "red", type: "number", value: 4 },
      { id: "p5", color: "blue", type: "number", value: 5 },
      { id: "p6", color: "green", type: "number", value: 6 },
      { id: "p7", color: "yellow", type: "number", value: 7 },
      { id: "p8", color: "red", type: "number", value: 8 },
      { id: "p9", color: "wild", type: "wild" },
      { id: "p10", color: "wild", type: "wildDraw4" },
    ];

    definirJoueurs(joueurs);
    definirPioche(pioche);
    demarrerPartie();
  }, []);

  const joueurLocal = etat.joueurs.find(
    (joueur) => joueur.id === "1"
  );

  const piocher = () => {
    if (joueurLocal) {
      piocherCarte(joueurLocal.id);
    }
  };

  const jouer = (carte: Card) => {
    if (joueurLocal) {
      jouerCarte(joueurLocal.id, carte);
    }
  };

  return (
    <PlateauJeu
      joueurs={etat.joueurs}
      joueurLocalId="1"
      indexJoueurActif={etat.indexJoueurActif}
      sensJeu={etat.sensJeu}
      statut={etat.statut}
      carteDessus={etat.carteDessus}
      nombreCartesPioche={etat.pioche.length}
      onJouerCarte={jouer}
      onPiocher={piocher}
    />
  );
}

export default Game;