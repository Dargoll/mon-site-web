import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 👉 initialise i18n (il faut que tu aies src/i18n.ts comme expliqué)
import "./i18n";

// 👉 HelmetProvider pour gérer les balises <title>, <meta> multilingues
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
