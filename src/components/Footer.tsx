import React from 'react';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-holistic-dark text-white pt-12 pb-6">
      <div className="holistic-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-holistic-purple" />
              <span className="font-serif text-xl font-semibold">Escuela Holistica DMF</span>
            </div>
            <p className="text-white/70">
              Escuela holística dedicada a promover el bienestar integral a través de terapias 
              naturales y prácticas ancestrales.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/invites/contact/?i=anrtygkmnlyw&utm_content=tli3e60"
                target="_blank"
                className="text-white/70 hover:text-holistic-purple transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                 href="https://www.facebook.com/profile.php?id=100087199578566&mibextid=ZbWKwL"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-white/70 hover:text-holistic-purple transition-colors"
                 aria-label="Facebook"
              >
                 <Facebook size={20} />
               </a>
              
            </div>
          </div>

          <div>
  <h3 className="font-serif text-lg font-semibold mb-4">Servicios</h3>
  <ul className="space-y-2">
    <li>
      <p className="text-white/70">Consultas Personalizadas.</p>
    </li>
    <li>
      <p className="text-white/70">Seguimiento de estudio.</p>
    </li>
    <li>
      <p className="text-white/70">Profesores en línea.</p>
    </li>
    <li>
      <p className="text-white/70">Material de estudio en PDF y Videos.</p>
    </li>
    <li>
      <p className="text-white/70">El material se envia por correo, Whatsapp o ambos.</p>
    </li>
  </ul>
</div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              
              
              <li>
                <Link to="/testimonios" className="text-white/70 hover:text-holistic-purple transition-colors">
                  Testimonios
                 </Link>
              </li>
              <li>
                <Link to="/Gallery" className="text-white/70 hover:text-holistic-purple transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-holistic-purple transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/PreguntasFrecuentes" className="text-white/70 hover:text-holistic-purple transition-colors">
                  Preguntas Frecuentes
                 </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-holistic-purple" />
                <span className="text-white/70">Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-holistic-purple" />
                <span className="text-white/70">+54 9 3413375533</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-holistic-purple" />
                <span className="text-white/70">contacto@terapiasholisticasdmf.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Escuela Holistica DMF. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;