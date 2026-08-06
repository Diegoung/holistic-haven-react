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
import { AdminPanel } from './components/AdminPanel'; // <--- Con llaves

export const MainApp: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [mostrarModalAuth, setMostrarModalAuth] = useState<boolean>(false);

  // Tu correo de administrador configurado
  const ADMIN_EMAIL = "diego56@admin.com"; 

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

      {/* 5. Panel de Administrador (Solo se muestra si sos el admin logueado) */}
      {session?.user?.email === ADMIN_EMAIL && (
        <div className="my-12 p-6 bg-purple-50 border-2 border-purple-300 rounded-3xl max-w-5xl mx-auto shadow-lg">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-xl font-bold text-purple-900">🛡️ Panel de Control Exclusivo (Admin)</h2>
            <span className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">Sesión Activa</span>
          </div>
          <AdminPanel />
        </div>
      )}

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