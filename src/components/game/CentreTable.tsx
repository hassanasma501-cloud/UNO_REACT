import type { Card } from "../../types/game";
import { CarteUNO } from "./CarteUNO";
import "./CentreTable.css";

interface CentreTableProps {
  carteDessus: Card | null;
  nombreCartesPioche: number;
  peutPiocher?: boolean;
  onPiocher?: () => void;
}

export function CentreTable({
  carteDessus,
  nombreCartesPioche,
  peutPiocher = false,
  onPiocher,
}: CentreTableProps) {
  return (
    <section className="centre-table">
      <div className="centre-table__zone">
        <button
          type="button"
          className="pioche-uno"
          onClick={onPiocher}
          disabled={!peutPiocher || nombreCartesPioche === 0}
        >
          <span className="pioche-uno__logo">UNO</span>
          <span className="pioche-uno__nombre">
            {nombreCartesPioche} cartes
          </span>
        </button>

        <div className="centre-table__defausse">
          {carteDessus ? (
            <CarteUNO carte={carteDessus} />
          ) : (
            <div className="centre-table__vide">
              Aucune carte
            </div>
          )}

          <span className="centre-table__label">
            Carte jouée
          </span>
        </div>
      </div>
    </section>
  );
}