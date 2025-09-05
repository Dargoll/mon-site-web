import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import Homepage from "./pages/Homepage";
import Biography from "./pages/Biography";
import Projects from "./pages/Projects";
import ApiData from "./pages/ApiData";
import MediaInterventions from "./pages/MediaInterventions";
import NotFound from "./pages/NotFound";
import PageRER from "./pages/PageRER";
import Design from "./pages/Design";
// Supprimé: import Design from "./pages/ApiData"; // ← Cette ligne était en double

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Barre de navigation fixe */}
        <Navigation />

        {/* Layout sticky footer : prend toute la hauteur, pousse le footer en bas */}
        <div className="min-h-dvh flex flex-col">
          {/* La classe .page (définie dans index.css) compense la nav fixe + gère les paddings responsive */}
          <main className="flex-1 page">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/media" element={<MediaInterventions />} />
              <Route path="/api-data" element={<ApiData />} />
              <Route path="/projet-rer" element={<PageRER />} />
              <Route path="/projet-design" element={<Design />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer safe-area friendly */}
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;