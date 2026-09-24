import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Rules from "../pages/Rules";

/**
 * Mock du module useFetch pour contrôler les valeurs retournées.
 * Cela permet de tester chaque état (chargement, erreur, succès)
 * de manière isolée sans faire de vraies requêtes HTTP.
 */
const mockUseFetch = vi.fn();

vi.mock("../hooks/useFetch", () => ({
  useFetch: (...args: unknown[]) => mockUseFetch(...args),
}));

describe("Rules", () => {
  beforeEach(() => {
    mockUseFetch.mockReset();
  });

  it("affiche le texte de chargement quand les données sont en cours de récupération", () => {
    // Simuler l'état de chargement
    mockUseFetch.mockReturnValue({
      donnees: null,
      chargement: true,
      erreur: null,
    });

    render(<Rules />);

    expect(
      screen.getByText("Chargement des règles en cours…")
    ).toBeInTheDocument();
  });

  it("affiche un message d'erreur quand le fetch échoue", () => {
    // Simuler l'état d'erreur
    mockUseFetch.mockReturnValue({
      donnees: null,
      chargement: false,
      erreur: "Erreur HTTP : 500",
    });

    render(<Rules />);

    expect(
      screen.getByText(/Erreur lors du chargement/)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Réessayer" })
    ).toBeInTheDocument();
  });

  it("affiche les règles quand les données sont chargées avec succès", async () => {
    // Simuler l'état de succès avec des données
    mockUseFetch.mockReturnValue({
      donnees: {
        titre: "Règles du UNO",
        sections: [
          {
            id: 1,
            titre: "Objectif du jeu",
            contenu: "Être le premier à se débarrasser de ses cartes.",
          },
        ],
      },
      chargement: false,
      erreur: null,
    });

    render(<Rules />);

    await waitFor(() => {
      expect(
        screen.getByText("Objectif du jeu")
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Être le premier à se débarrasser de ses cartes."
        )
      ).toBeInTheDocument();
    });
  });
});
