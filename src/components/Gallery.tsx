
import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=1170",
      title: "Meditacion"
    },
    {
      url: "/Auriculoterapia.jpg",
      title: "Auriculoterapia"
    },
    {
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220",
      title: "Yoga"
    },
    {
      url: "/Flores de bach.jpg",
      title: "Flores de Bach"
    },
    {
      url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1374",
      title: "Terapia con Cristales"
    },
    {
      url: "/Feng Shui.jpg",
      title: "Feng Shui"
    },
    {
      url: "/Pendulo hebreo.jpg",
      title: "Pendulo Hebreo"
    },
    {
      url: "/Tarot Marsella.jpg",
      title: "Tarot Marsella"
    },
    {
      url: "/Radiestesia.jpg",
      title: "Radiestesia"
    },
  ];
  
  return (
    <section className="py-16 bg-holistic-beige/50">
      <div className="holistic-container">
        <div className="text-center mb-12">
          <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">Nuestra Galería</h2>
          <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
            Explora nuestros espacios y terapias a través de estas imágenes que capturan la esencia 
            de bienestar y armonía que ofrecemos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg aspect-square group">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-holistic-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-serif text-xl">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
