import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

interface SectionRegle {
  id: number;
  titre: string;
  contenu: string;
}

interface ReglesUNO {
  titre: string;
  sections: SectionRegle[];
}

function Rules() {
  const [tentative, setTentative] = useState(0);

  const { donnees, chargement, erreur } = useFetch<ReglesUNO>(
    `https://api.npoint.io/69e6eeb7fb0b44c947ab?tentative=${tentative}`
);

  if (chargement) {
    return (
      <div>
        <h1>Règles du UNO</h1>
        <p>Chargement des règles en cours…</p>
      </div>
    );
  }

  if (erreur) {
    return (
      <div>
        <h1>Règles du UNO</h1>

        <p>
          Erreur lors du chargement : {erreur}
        </p>

        <button
          type="button"
          onClick={() => setTentative((ancienne) => ancienne + 1)}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{donnees?.titre ?? "Règles du UNO"}</h1>

      {donnees?.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.titre}</h2>
          <p>{section.contenu}</p>
        </section>
      ))}
    </div>
  );
}

export default Rules;