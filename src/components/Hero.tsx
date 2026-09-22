import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative w-full min-h-[50vh] sm:min-h-[70vh] md:min-h-screen bg-[#e8eada] bg-center bg-no-repeat bg-contain md:bg-cover transition-all duration-300"
      style={{
        backgroundImage: 'url(/terapiasholisticas1.jpg)',
      }}
    >
      {/* Muestra la imagen completa sin recortar nada en el celular */}
    </section>
  );
};

export default Hero;