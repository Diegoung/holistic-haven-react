import React from 'react';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-purple-900/40 relative overflow-hidden">
      
      {/* Luz ambiental sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Columna 1: Brand / Descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-900/50 rounded-xl text-purple-400 border border-purple-700/50">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Escuela Holística DMF
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dedicados a promover el bienestar integral a través de terapias naturales, formación profesional y prácticas de sanación.
            </p>
            
            {/* Redes Sociales */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.instagram.com/invites/contact/?i=anrtygkmnlyw&utm_content=tli3e60"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-purple-700 transition-all border border-slate-700/60 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100087199578566&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-purple-700 transition-all border border-slate-700/60 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios / Modalidad */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-l-2 border-purple-500 pl-3">
              Nuestra Propuesta
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span> Consultas y seguimiento de estudio.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span> Profesores en línea.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span> Material en PDFs y Videos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span> Envíos por Correo y WhatsApp.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span> Acceso directo a Google Drive.
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos (Anclas a la Single Page) */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-l-2 border-purple-500 pl-3">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Cursos disponibles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonios')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('preguntas-frecuentes')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-l-2 border-purple-500 pl-3">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-purple-400 flex-shrink-0" />
                <span>Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-purple-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/5493413375533" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +54 9 341 337-5533
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:contacto@terapiasholisticasdmf.com" 
                  className="hover:text-white transition-colors break-all"
                >
                  contacto@terapiasholisticasdmf.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Derechos Reservados */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Escuela Holística DMF. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;