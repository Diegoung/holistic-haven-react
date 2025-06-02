import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/Terapiasholisticas.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Botones de pago arriba a la derecha */}
      <div className="absolute top-4 right-4 z-50 flex space-x-3">
        {/* Botón Mercado Pago */}
        <a 
          href="https://link.mercadopago.com.ar/articulosvariosss"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
        >
          Mercado Pago
        </a>

        {/* Botón PayPal */}
        <a 
          href="https://www.paypal.com/ncp/payment/WPSLPY9WJ5TMJ"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
        >
          PayPal
        </a>
      </div>

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
