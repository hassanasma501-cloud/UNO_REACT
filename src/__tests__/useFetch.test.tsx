import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../hooks/useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("retourne l'état de chargement puis les données en cas de succès", async () => {
    // Données simulées retournées par fetch
    const donneesSimulees = {
      titre: "Test",
      sections: [],
    };

    // Mocker la fonction fetch globale
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(donneesSimulees),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() =>
      useFetch<{ titre: string; sections: never[] }>(
        "/api/test.json"
      )
    );

    // Au départ, le hook doit être en état de chargement
    expect(result.current.chargement).toBe(true);
    expect(result.current.donnees).toBeNull();
    expect(result.current.erreur).toBeNull();

    // Attendre que le fetch se termine
    await waitFor(() => {
      expect(result.current.chargement).toBe(false);
    });

    // Après le fetch, les données doivent être présentes
    expect(result.current.donnees).toEqual(donneesSimulees);
    expect(result.current.erreur).toBeNull();

    // Vérifier que fetch a bien été appelé avec la bonne URL
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/test.json",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });

  it("retourne une erreur quand le fetch échoue", async () => {
    // Mocker fetch pour simuler une erreur réseau
    const mockFetch = vi
      .fn()
      .mockRejectedValue(new Error("Network Error"));
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() =>
      useFetch<unknown>("/api/erreur.json")
    );

    // Au départ : chargement
    expect(result.current.chargement).toBe(true);

    // Attendre la fin du fetch
    await waitFor(() => {
      expect(result.current.chargement).toBe(false);
    });

    // Après le fetch : erreur présente, pas de données
    expect(result.current.erreur).toBe("Network Error");
    expect(result.current.donnees).toBeNull();
  });
});
