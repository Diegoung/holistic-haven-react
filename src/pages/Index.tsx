
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-holistic-light">
      <Navbar />
      <Hero />
      <Services />
      <div className="py-16 bg-white">
        <div className="holistic-container">
          <div className="text-center mb-12">
            <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">Bienestar Holístico</h2>
            <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
              Nuestro enfoque holístico considera la interconexión entre cuerpo, mente y espíritu. 
              Creemos que el verdadero bienestar surge cuando estos aspectos están en armonía.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1470" 
                alt="Bienestar holístico" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-6">
              <h3 className="holistic-heading text-2xl font-semibold">Nuestro Enfoque</h3>
              <p className="text-holistic-dark/80">
                En HolisticHaven, entendemos que cada persona es única, con necesidades y 
                experiencias distintas. Por eso, adaptamos nuestras terapias para ofrecer un 
                tratamiento personalizado que aborde tus necesidades específicas.
              </p>
              <p className="text-holistic-dark/80">
                Combinamos técnicas ancestrales con conocimientos modernos para crear un 
                espacio de sanación donde puedas reconectar contigo mismo y encontrar equilibrio.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-holistic-purple"></div>
                  <span>Terapias personalizadas según tus necesidades</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-holistic-purple"></div>
                  <span>Ambiente tranquilo y acogedor</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-holistic-purple"></div>
                  <span>Profesionales certificados y con experiencia</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-holistic-purple"></div>
                  <span>Productos orgánicos y naturales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
