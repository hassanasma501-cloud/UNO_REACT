import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  it("affiche le texte passé en children", () => {
    render(<Button>Jouer</Button>);

    const bouton = screen.getByRole("button", { name: "Jouer" });
    expect(bouton).toBeInTheDocument();
    expect(bouton).toHaveTextContent("Jouer");
  });

  it("appelle onClick quand on clique sur le bouton", () => {
    let compteur = 0;
    const handleClick = () => {
      compteur += 1;
    };

    render(<Button onClick={handleClick}>Cliquer</Button>);

    const bouton = screen.getByRole("button", { name: "Cliquer" });
    fireEvent.click(bouton);

    expect(compteur).toBe(1);
  });
});
