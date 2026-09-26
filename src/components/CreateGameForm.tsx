import { useState } from "react";
import type { FormEvent } from "react";

/**
 * Erreurs de validation par champ
 */
interface ErreursFormulaire {
  nomJoueur: string;
  nombreJoueurs: string;
}

/**
 * Props du composant CreateGameForm
 */
interface CreateGameFormProps {
  onSubmit: (nomJoueur: string, nombreJoueurs: number) => void;
}

/**
 * Formulaire contrôlé de création de partie.
 *
 * - Champs contrôlés avec useState
 * - Validation côté client
 * - Messages d'erreur par champ
 * - Soumission bloquée tant que le formulaire est invalide
 */
function CreateGameForm({ onSubmit }: CreateGameFormProps) {
  // États contrôlés pour chaque champ
  const [nomJoueur, setNomJoueur] = useState("");
  const [nombreJoueurs, setNombreJoueurs] = useState("2");

  // Erreurs de validation par champ
  const [erreurs, setErreurs] = useState<ErreursFormulaire>({
    nomJoueur: "",
    nombreJoueurs: "",
  });

  // Indique si le formulaire a déjà été soumis une première fois
  const [soumis, setSoumis] = useState(false);

  // --- Fonctions de validation par champ ---

  const validerNomJoueur = (nom: string): string => {
    if (nom.trim() === "") {
      return "Le nom du joueur est requis.";
    }
    if (nom.trim().length < 2) {
      return "Le nom doit contenir au moins 2 caractères.";
    }
    if (nom.trim().length > 20) {
      return "Le nom ne doit pas dépasser 20 caractères.";
    }
    return "";
  };

  const validerNombreJoueurs = (nombre: string): string => {
    const n = parseInt(nombre, 10);
    if (isNaN(n)) {
      return "Veuillez sélectionner un nombre de joueurs.";
    }
    if (n < 2 || n > 4) {
      return "Le nombre de joueurs doit être entre 2 et 4.";
    }
    return "";
  };

  /**
   * Vérifie si le formulaire entier est valide
   */
  const formulaireValide = (): boolean => {
    const erreurNom = validerNomJoueur(nomJoueur);
    const erreurNombre = validerNombreJoueurs(nombreJoueurs);
    return erreurNom === "" && erreurNombre === "";
  };

  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSoumis(true);

    // Valider tous les champs
    const erreurNom = validerNomJoueur(nomJoueur);
    const erreurNombre = validerNombreJoueurs(nombreJoueurs);

    const nouvellesErreurs: ErreursFormulaire = {
      nomJoueur: erreurNom,
      nombreJoueurs: erreurNombre,
    };

    setErreurs(nouvellesErreurs);

    // Soumission bloquée si le formulaire est invalide
    if (erreurNom === "" && erreurNombre === "") {
      onSubmit(nomJoueur.trim(), parseInt(nombreJoueurs, 10));
    }
  };

  /**
   * Mise à jour du nom avec re-validation en temps réel
   * (seulement après la première soumission)
   */
  const handleNomChange = (value: string) => {
    setNomJoueur(value);
    if (soumis) {
      setErreurs((prev) => ({
        ...prev,
        nomJoueur: validerNomJoueur(value),
      }));
    }
  };

  /**
   * Mise à jour du nombre de joueurs avec re-validation
   */
  const handleNombreChange = (value: string) => {
    setNombreJoueurs(value);
    if (soumis) {
      setErreurs((prev) => ({
        ...prev,
        nombreJoueurs: validerNombreJoueurs(value),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="nomJoueur">Nom du joueur :</label>
        <input
          id="nomJoueur"
          type="text"
          value={nomJoueur}
          onChange={(e) => handleNomChange(e.target.value)}
          placeholder="Entre ton pseudo"
          aria-invalid={erreurs.nomJoueur !== ""}
          aria-describedby={
            erreurs.nomJoueur ? "erreur-nom" : undefined
          }
        />
        {erreurs.nomJoueur && (
          <p
            id="erreur-nom"
            className="error-message"
            role="alert"
          >
            {erreurs.nomJoueur}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="nombreJoueurs">
          Nombre de joueurs :
        </label>
        <select
          id="nombreJoueurs"
          value={nombreJoueurs}
          onChange={(e) => handleNombreChange(e.target.value)}
          aria-invalid={erreurs.nombreJoueurs !== ""}
          aria-describedby={
            erreurs.nombreJoueurs ? "erreur-nombre" : undefined
          }
        >
          <option value="2">2 joueurs</option>
          <option value="3">3 joueurs</option>
          <option value="4">4 joueurs</option>
        </select>
        {erreurs.nombreJoueurs && (
          <p
            id="erreur-nombre"
            className="error-message"
            role="alert"
          >
            {erreurs.nombreJoueurs}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={soumis && !formulaireValide()}
      >
        Créer une partie
      </button>
    </form>
  );
}

export default CreateGameForm;
