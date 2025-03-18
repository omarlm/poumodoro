import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MuteSoundProvider } from "./context/MuteSoundContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuteSoundProvider>
      <App />
    </MuteSoundProvider>
  </StrictMode>,
);
