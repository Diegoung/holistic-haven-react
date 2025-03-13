
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-holistic-gradient py-20 md:py-32">
      <div className="holistic-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="holistic-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encuentra el equilibrio para tu cuerpo y mente
          </h1>
          <p className="text-lg md:text-xl text-holistic-dark/80 mb-8">
            Descubre nuestro enfoque holístico para la salud y el bienestar. 
            Terapias naturales, meditación y prácticas curativas para restaurar 
            la armonía en tu vida.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button className="holistic-btn-primary">Reserva tu sesión</Button>
            <Button variant="outline" className="border-holistic-purple text-holistic-purple hover:bg-holistic-purple hover:text-white">
              Conoce nuestros servicios
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1498019559366-a1cbd07b5160?q=80&w=1470')] bg-center bg-cover"></div>
    </section>
  );
};

export default Hero;
