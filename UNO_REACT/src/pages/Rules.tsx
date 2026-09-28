import { useFetch } from "../hooks/useFetch";

/**
 * Types pour les données de l'API des règles
 */
interface SectionRegle {
  id: number;
  titre: string;
  contenu: string;
}

interface DonneesRegles {
  titre: string;
  sections: SectionRegle[];
}

/**
 * Page Règles du UNO
 *
 * Charge les règles depuis l'API avec useFetch<T>.
 * Affiche les 3 états : chargement, erreur, succès.
 */
function Rules() {
  const { donnees, chargement, erreur } =
    useFetch<DonneesRegles>("https://api.npoint.io/69e6eeb7fb0b44c947ab");

  // --- État 1 : Chargement ---
  if (chargement) {
    return (
      <div>
        <h1>Règles du UNO</h1>
        <p>Chargement des règles en cours…</p>
      </div>
    );
  }

  // --- État 2 : Erreur ---
  if (erreur) {
    return (
      <div>
        <h1>Règles du UNO</h1>
        <p className="error-message">
          Erreur lors du chargement : {erreur}
        </p>
        <button onClick={() => window.location.reload()}>
          Réessayer
        </button>
      </div>
    );
  }

  // --- État 3 : Succès ---
  if (!donnees) {
    return (
      <div>
        <h1>Règles du UNO</h1>
        <p>Aucune donnée disponible.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{donnees.titre}</h1>

      {donnees.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.titre}</h2>
          <p>{section.contenu}</p>
        </section>
      ))}
    </div>
  );
}

export default Rules;