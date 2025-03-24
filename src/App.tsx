import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials"; // Importa el componente Testimonials
import WhatsAppButton from "./components/WhatsAppButton.tsx";
import Services from "./components/Services"; // Importa el nuevo componente

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Botón de WhatsApp (visible en todas las páginas) */}
        <WhatsAppButton />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<Contact />} />
          <Route path="/testimonios" element={<Testimonials />} /> {/* Agrega la ruta /testimonios */}
          <Route path="*" element={<NotFound />} />
          <Route path="/cursos" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;