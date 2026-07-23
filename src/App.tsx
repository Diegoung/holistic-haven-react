import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Importaciones de los componentes de la Landing Page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Auth } from './components/Auth';

export const MainApp: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [mostrarModalAuth, setMostrarModalAuth] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setMostrarModalAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-holistic-beige text-holistic-dark relative">
      
      {/* 1. Navbar (Pasamos session y el activador del modal) */}
      <Navbar 
        session={session} 
        onAbrirAuth={() => setMostrarModalAuth(true)} 
      />

      {/* 2. Hero / Portada */}
      <Hero />

      {/* 3. Cursos y Servicios */}
      <Services 
        session={session} 
        onAbrirAuth={() => setMostrarModalAuth(true)} 
      />

      {/* 4. Resto de las Secciones */}
      <Testimonials />
      <Gallery />
      <PreguntasFrecuentes />
      <Contact />
      <Footer />

      {/* Botón Flotante de WhatsApp */}
      <WhatsAppButton />

      {/* Modal / Ventana Flotante de Autenticación */}
      {mostrarModalAuth && !session && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
            <button 
              onClick={() => setMostrarModalAuth(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg"
            >
              ✕
            </button>
            <Auth />
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

export default App;