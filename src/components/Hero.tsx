import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative w-full h-[70vh] md:min-h-screen overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/terapiasholisticas1.jpg)',
      }}
    >
      {/* Contenedor adaptado para mantener la proporción visual en celulares */}
    </section>
  );
};

export default Hero;