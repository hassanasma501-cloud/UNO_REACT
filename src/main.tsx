import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FournisseurPartie } from "./context/GameContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FournisseurPartie>
      <App />
    </FournisseurPartie>
  </StrictMode>
);