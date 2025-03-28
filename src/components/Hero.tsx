
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/Terapiasholisticas.jpg)', // Ruta directa desde la carpeta public
        backgroundSize: 'cover', // Ajusta el tamaño para cubrir toda la sección
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que se repita
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          Escuela Holística DMF
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Descubra nuestro enfoque holístico para la salud y el bienestar. Terapias naturales, meditación y prácticas curativas para restaurar la armonía en tu vida.
        </p>
        
      </div>
    </section>
  );
};

export default Hero;