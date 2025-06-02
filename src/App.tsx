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
import Gallery from "./components/Gallery";
import PreguntasFrecuentes from './components/PreguntasFrecuentes.tsx';
import Checkout from "./components/Checkout";

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/PreguntasFrecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/checkout" element={<Checkout />} />

        
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;