import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '3413375533'; // Reemplaza con tu número de WhatsApp
  const message = 'Hola, estoy interesado en tus servicios.'; // Mensaje predeterminado

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out z-50"
    >
      {/* Usar la imagen whatsapp.png desde la carpeta public */}
      <img src="/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppButton;