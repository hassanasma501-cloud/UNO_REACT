import type { Card } from "../../types/game";
import "./CarteUNO.css";

interface CarteUNOProps {
  carte: Card;
  onClick?: () => void;
  selectionnable?: boolean;
}

export function CarteUNO({
  carte,
  onClick,
  selectionnable = false,
}: CarteUNOProps) {
  const afficherValeur = () => {
    switch (carte.type) {
      case "number":
        return carte.value;

      case "reverse":
        return "↺";

      case "skip":
        return "⊘";

      case "draw2":
        return "+2";

      case "wild":
        return "★";

      case "wildDraw4":
        return "+4";

      default:
        return "?";
    }
  };

  return (
    <button
      type="button"
      className={`carte-uno carte-uno--${carte.color} ${
        selectionnable ? "carte-uno--selectionnable" : ""
      }`}
      onClick={onClick}
      disabled={!selectionnable}
    >
      <span className="carte-uno__coin carte-uno__coin--haut">
        {afficherValeur()}
      </span>

      <div className="carte-uno__centre">
        {afficherValeur()}
      </div>

      <span className="carte-uno__coin carte-uno__coin--bas">
        {afficherValeur()}
      </span>
    </button>
  );
}