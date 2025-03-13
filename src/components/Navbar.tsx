
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-holistic-light py-4 sticky top-0 z-50 shadow-sm">
      <div className="holistic-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-holistic-purple" />
          <span className="font-serif text-xl font-semibold text-holistic-dark">Escuela Holistica DMF</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-holistic-dark hover:text-holistic-purple transition-colors">Inicio</Link>
          <Link to="/servicios" className="text-holistic-dark hover:text-holistic-purple transition-colors">Servicios</Link>
          <Link to="/terapias" className="text-holistic-dark hover:text-holistic-purple transition-colors">Terapias</Link>
          <Link to="/testimonios" className="text-holistic-dark hover:text-holistic-purple transition-colors">Testimonios</Link>
          <Link to="/sobre-nosotros" className="text-holistic-dark hover:text-holistic-purple transition-colors">Sobre Nosotros</Link>
          <Button className="holistic-btn-primary">Contacto</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-holistic-dark p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-holistic-light py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">Inicio</Link>
            <Link to="/servicios" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">Servicios</Link>
            <Link to="/terapias" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">Terapias</Link>
            <Link to="/testimonios" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">Testimonios</Link>
            <Link to="/sobre-nosotros" className="text-holistic-dark hover:text-holistic-purple transition-colors py-2">Sobre Nosotros</Link>
            <Button className="holistic-btn-primary w-full">Contacto</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
