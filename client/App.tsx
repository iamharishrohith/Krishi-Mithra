import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppShell from "./components/AppShell";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Advisory from "./pages/Advisory";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import { I18nProvider } from "./i18n/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/onboarding" element={<AppShell />}>
              <Route index element={<Onboarding />} />
            </Route>
            <Route path="/" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="advisory" element={<Advisory />} />
              <Route path="community" element={<Community />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
