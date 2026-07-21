import React, { useState } from 'react';
import { UserPlus, UserCheck, Sparkles, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface NavbarProps {
  session?: any;
  onAbrirAuth?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ session, onAbrirAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Mágico + Nombre de la Escuela */}
          <a 
            href="#top" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-amber-400 p-0.5 shadow-md group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🍃</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-extrabold bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                Escuela Holística DMF
              </span>
              <span className="text-[10px] tracking-widest text-amber-600 font-semibold uppercase -mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Bienestar & Sanación
              </span>
            </div>
          </a>

          {/* Menú Desktop (Navegación + Botón de Registro) */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-slate-700 hover:text-purple-700 font-medium text-sm transition-all hover:scale-105"
            >
              Cursos
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')} 
              className="text-slate-700 hover:text-purple-700 font-medium text-sm transition-all hover:scale-105"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection('preguntas-frecuentes')} 
              className="text-slate-700 hover:text-purple-700 font-medium text-sm transition-all hover:scale-105"
            >
              Preguntas Frecuentes
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="text-slate-700 hover:text-purple-700 font-medium text-sm transition-all hover:scale-105"
            >
              Contáctanos
            </button>

            {/* 🌟 BOTÓN DE REGISTRARSE / MI CUENTA ARRIBA DE TODO */}
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-xs bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[120px] truncate">{session.user.email}</span>
                </span>
                <button
                  onClick={cerrarSesion}
                  title="Cerrar sesión"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAbrirAuth}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold py-2.5 px-5 rounded-2xl text-xs transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 border border-purple-400/30"
              >
                <UserPlus className="w-4 h-4 text-amber-300" />
                <span>Registrarme / Ingresar</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {!session && (
              <button
                onClick={onAbrirAuth}
                className="flex items-center gap-1.5 bg-purple-800 text-white font-bold py-2 px-3 rounded-xl text-xs shadow"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                <span>Ingresar</span>
              </button>
            )}
            <button 
              onClick={toggleMenu} 
              className="text-purple-900 p-2 text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-purple-100 py-6 px-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-left text-slate-800 hover:text-purple-700 font-semibold py-2 border-b border-purple-50"
            >
              Cursos
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')} 
              className="text-left text-slate-800 hover:text-purple-700 font-semibold py-2 border-b border-purple-50"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection('preguntas-frecuentes')} 
              className="text-left text-slate-800 hover:text-purple-700 font-semibold py-2 border-b border-purple-50"
            >
              Preguntas Frecuentes
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="text-left text-slate-800 hover:text-purple-700 font-semibold py-2 border-b border-purple-50"
            >
              Contáctanos
            </button>

            {session && (
              <button
                onClick={cerrarSesion}
                className="flex items-center gap-2 text-rose-600 font-semibold py-2 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión ({session.user.email})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;