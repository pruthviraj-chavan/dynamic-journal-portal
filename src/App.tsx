
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
