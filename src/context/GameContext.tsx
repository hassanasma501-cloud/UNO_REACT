import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import {
  reducerPartie,
  etatInitialPartie,
  type EtatPartie,
  type ActionPartie,
} from "../game/gameReducer";

interface ValeurContextePartie {
  etat: EtatPartie;
  dispatch: Dispatch<ActionPartie>;
}

const ContextePartie = createContext<ValeurContextePartie | undefined>(
  undefined
);

interface FournisseurPartieProps {
  children: ReactNode;
}

export function FournisseurPartie({
  children,
}: FournisseurPartieProps) {
  const [etat, dispatch] = useReducer(
    reducerPartie,
    etatInitialPartie
  );

  return (
    <ContextePartie.Provider value={{ etat, dispatch }}>
      {children}
    </ContextePartie.Provider>
  );
}

export function usePartie() {
  const contexte = useContext(ContextePartie);

  if (contexte === undefined) {
    throw new Error(
      "usePartie doit être utilisé dans un FournisseurPartie"
    );
  }

  return contexte;
}