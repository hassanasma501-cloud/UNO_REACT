import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateGameForm from "../components/CreateGameForm";

describe("CreateGameForm", () => {
  /**
   * Test sur un comportement conditionnel :
   * Quand le formulaire est soumis avec un nom vide,
   * un message d'erreur doit apparaître.
   * Quand on entre un nom valide et qu'on re-soumet,
   * le message d'erreur doit disparaître.
   */
  it("affiche une erreur si le nom est vide à la soumission", () => {
    const mockSubmit = vi.fn();
    render(<CreateGameForm onSubmit={mockSubmit} />);

    // Soumettre le formulaire sans remplir le nom
    const boutonSubmit = screen.getByRole("button", {
      name: "Créer une partie",
    });
    fireEvent.click(boutonSubmit);

    // Le message d'erreur doit être visible
    const erreur = screen.getByText(
      "Le nom du joueur est requis."
    );
    expect(erreur).toBeInTheDocument();

    // La fonction onSubmit ne doit PAS avoir été appelée
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("n'affiche pas d'erreur et appelle onSubmit avec un nom valide", () => {
    const mockSubmit = vi.fn();
    render(<CreateGameForm onSubmit={mockSubmit} />);

    // Remplir le champ nom avec une valeur valide
    const inputNom = screen.getByLabelText("Nom du joueur :");
    fireEvent.change(inputNom, { target: { value: "Alice" } });

    // Soumettre le formulaire
    const boutonSubmit = screen.getByRole("button", {
      name: "Créer une partie",
    });
    fireEvent.click(boutonSubmit);

    // Pas de message d'erreur
    const erreur = screen.queryByText(
      "Le nom du joueur est requis."
    );
    expect(erreur).not.toBeInTheDocument();

    // La fonction onSubmit doit avoir été appelée avec les bonnes valeurs
    expect(mockSubmit).toHaveBeenCalledWith("Alice", 2);
  });
});
