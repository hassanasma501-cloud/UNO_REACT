import type { Card, Player } from "../../types/game";
import { CarteUNO } from "./CarteUNO";
import "./MainJoueur.css";

interface MainJoueurProps {
  joueur: Player;
  estActif?: boolean;
  onJouerCarte?: (carte: Card) => void;
}

export function MainJoueur({
  joueur,
  estActif = false,
  onJouerCarte,
}: MainJoueurProps) {
  return (
    <section className="main-joueur">
      <div className="main-joueur__entete">
        <h2>{joueur.name}</h2>

        {estActif && (
          <span className="main-joueur__tour">
            À ton tour
          </span>
        )}
      </div>

      <div className="main-joueur__cartes">
        {joueur.cards.length === 0 ? (
          <p>Aucune carte</p>
        ) : (
          joueur.cards.map((carte) => (
            <CarteUNO
              key={carte.id}
              carte={carte}
              selectionnable={estActif}
              onClick={() => onJouerCarte?.(carte)}
            />
          ))
        )}
      </div>
    </section>
  );
}