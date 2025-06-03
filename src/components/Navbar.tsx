import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-holistic-light py-4 sticky top-0 z-50 shadow-sm">
      <div className="holistic-container flex justify-between items-center">
        {/* Ícono de hoja + Nombre de la escuela */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-holistic-purple text-2xl">🍃</span>
          <span className="font-serif text-xl font-semibold text-holistic-dark">
            Escuela Holística DMF
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/servicios" className="text-holistic-dark hover:text-holistic-purple transition-colors">
            Contactanos
          </Link>
          <Link to="/cursos" className="text-holistic-dark hover:text-holistic-purple transition-colors">
            Cursos
          </Link>
          <Link to="/testimonios" className="text-holistic-dark hover:text-holistic-purple transition-colors">
            Testimonios
          </Link>
          <Link to="/PreguntasFrecuentes" className="text-holistic-dark hover:text-holistic-purple transition-colors">
            Preguntas Frecuentes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-holistic-dark p-2">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-holistic-light py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/servicios" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">
              Contactanos
            </Link>
            <Link to="/cursos" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">
              Cursos
            </Link>
            <Link to="/testimonios" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">
              Testimonios
            </Link>
            <Link to="/PreguntasFrecuentes" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">
              Preguntas Frecuentes
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
