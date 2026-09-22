import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[70vh] md:min-h-screen bg-[#e8eada]">
      
      {/* Imagen para Celulares (Vertical 9:16) */}
      <div 
        className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/terapiasholisticas11.jpg)' }}
      />

      {/* Imagen para Computadoras (Horizontal original) */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/terapiasholisticas1.jpg)' }}
      />

    </section>
  );
};

exports default Hero;