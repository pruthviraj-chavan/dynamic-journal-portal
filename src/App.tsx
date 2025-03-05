
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { PapersProvider } from "@/context/PapersContext";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Editorial from "./pages/Editorial";
import Submit from "./pages/Submit";
import Archives from "./pages/Archives";
import Volume from "./pages/Volume";
import Paper from "./pages/Paper";
import Search from "./pages/Search";

// Admin Pages
import Admin from "./pages/Admin";
import AdminVolumes from "./pages/AdminVolumes";
import AdminVolume from "./pages/AdminVolume";
import AdminNewVolume from "./pages/AdminNewVolume";
import AdminPapers from "./pages/AdminPapers";
import AdminPaper from "./pages/AdminPaper";
import AdminNewPaper from "./pages/AdminNewPaper";
import AdminAuthors from "./pages/AdminAuthors";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <PapersProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/editorial" element={<Editorial />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/volume/:id" element={<Volume />} />
                <Route path="/paper/:id" element={<Paper />} />
                <Route path="/search" element={<Search />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/volumes" element={<AdminVolumes />} />
                <Route path="/admin/volume/:id" element={<AdminVolume />} />
                <Route path="/admin/new-volume" element={<AdminNewVolume />} />
                <Route path="/admin/papers" element={<AdminPapers />} />
                <Route path="/admin/paper/:id" element={<AdminPaper />} />
                <Route path="/admin/new-paper" element={<AdminNewPaper />} />
                <Route path="/admin/authors" element={<AdminAuthors />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                
                {/* Catch All Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </PapersProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
