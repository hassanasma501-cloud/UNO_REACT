import type { Card, GameStatus, Player } from "../../types/game";
import { CentreTable } from "./CentreTable";
import { MainJoueur } from "./MainJoueur";
import "./PlateauJeu.css";

interface PlateauJeuProps {
  joueurs: Player[];
  joueurLocalId: string;
  indexJoueurActif: number;
  sensJeu: 1 | -1;
  statut: GameStatus;
  carteDessus: Card | null;
  nombreCartesPioche: number;
  onJouerCarte: (carte: Card) => void;
  onPiocher: () => void;
}

export function PlateauJeu({
  joueurs,
  joueurLocalId,
  indexJoueurActif,
  sensJeu,
  statut,
  carteDessus,
  nombreCartesPioche,
  onJouerCarte,
  onPiocher,
}: PlateauJeuProps) {
  const joueurActif = joueurs[indexJoueurActif];

  const joueurLocal = joueurs.find(
    (joueur) => joueur.id === joueurLocalId
  );

  const adversaires = joueurs.filter(
    (joueur) => joueur.id !== joueurLocalId
  );

  const estTourJoueurLocal =
    statut === "playing" &&
    joueurActif?.id === joueurLocalId;

  return (
    <main className="plateau-jeu">
      <header className="plateau-jeu__header">
        <div>
          <span className="plateau-jeu__label">Statut</span>
          <strong>{statut}</strong>
        </div>

        <div className="plateau-jeu__tour">
          <span className="plateau-jeu__label">
            Tour actuel
          </span>

          <strong>
            {joueurActif?.name ?? "Aucun joueur"}
          </strong>
        </div>

        <div>
          <span className="plateau-jeu__label">
            Sens du jeu
          </span>

          <strong className="plateau-jeu__sens">
            {sensJeu === 1 ? "↻" : "↺"}
          </strong>
        </div>
      </header>

      <section className="plateau-jeu__adversaires">
        {adversaires.map((joueur) => (
          <div
            key={joueur.id}
            className={`adversaire ${
              joueurActif?.id === joueur.id
                ? "adversaire--actif"
                : ""
            }`}
          >
            <h2>{joueur.name}</h2>

            <div className="adversaire__cartes">
              {joueur.cards.map((carte) => (
                <div
                  key={carte.id}
                  className="carte-cachee"
                >
                  UNO
                </div>
              ))}
            </div>

            <span>
              {joueur.cards.length} carte
              {joueur.cards.length > 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </section>

      <CentreTable
        carteDessus={carteDessus}
        nombreCartesPioche={nombreCartesPioche}
        peutPiocher={estTourJoueurLocal}
        onPiocher={onPiocher}
      />

      {joueurLocal && (
        <MainJoueur
          joueur={joueurLocal}
          estActif={estTourJoueurLocal}
          onJouerCarte={onJouerCarte}
        />
      )}
    </main>
  );
}