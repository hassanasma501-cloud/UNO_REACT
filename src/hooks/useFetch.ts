import { useState, useEffect } from "react";

/**
 * Interface générique pour les trois états du fetch :
 * - chargement (loading)
 * - erreur (error)
 * - succès (data)
 */
export interface EtatFetch<T> {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
}

/**
 * Hook générique useFetch<T>
 *
 * Charge des données depuis une URL et gère :
 * - Les 3 états : chargement, erreur, succès
 * - Le nettoyage des effets (AbortController)
 * - Les situations de course (race conditions)
 *
 * @param url - L'URL à charger
 * @returns EtatFetch<T> avec donnees, chargement, erreur
 */
export function useFetch<T>(url: string): EtatFetch<T> {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    // AbortController permet d'annuler la requête
    // si le composant se démonte ou si l'URL change
    // → cela gère les race conditions
    const controller = new AbortController();

    const chargerDonnees = async () => {
      // Réinitialiser l'état avant chaque nouvelle requête
      setChargement(true);
      setErreur(null);
      setDonnees(null);

      try {
        const reponse = await fetch(url, {
          signal: controller.signal,
        });

        if (!reponse.ok) {
          throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const json = (await reponse.json()) as T;

        // Vérifier que la requête n'a pas été annulée
        // avant de mettre à jour l'état (race condition)
        if (!controller.signal.aborted) {
          setDonnees(json);
          setChargement(false);
        }
      } catch (err: unknown) {
        // Ignorer les erreurs d'annulation (AbortError)
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        // Mettre à jour l'état erreur seulement si pas annulé
        if (!controller.signal.aborted) {
          setErreur(
            err instanceof Error
              ? err.message
              : "Une erreur inconnue est survenue"
          );
          setChargement(false);
        }
      }
    };

    chargerDonnees();

    // Nettoyage de l'effet :
    // Annule la requête en cours si le composant est démonté
    // ou si l'URL change → évite les race conditions
    return () => {
      controller.abort();
    };
  }, [url]);

  return { donnees, chargement, erreur };
}
