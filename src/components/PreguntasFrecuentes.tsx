import React, { useState } from "react";

const faqs = [
  {
    question: "¿Cómo accedo a los cursos que compro en la plataforma?",
    answer:
      "Para comprar un curso debes registrarte o iniciar sesión en la web. Una vez realizado el pago, el sistema habilitará automáticamente el botón 'Acceder al Material' para ingresar a la carpeta de Google Drive correspondiente.",
  },
  {
    question: "¿Necesito experiencia previa para inscribirme?",
    answer:
      "No. Nuestros cursos están diseñados tanto para principiantes como para personas con experiencia previa en terapias holísticas.",
  },
  {
    question: "¿Los cursos son presenciales o virtuales?",
    answer:
      "Nuestros cursos son 100% virtuales y asincrónicos. Recibirás manuales y material audiovisual complementario cargado en Google Drive para que estudies a tu propio ritmo, junto con asistencia personalizada.",
  },
  {
    question: "¿Entregan certificado?",
    answer:
      "Sí, cada curso incluye su certificado de participación que acredita los conocimientos adquiridos en la terapia correspondiente.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Mercado Pago (tarjetas de crédito, débito y dinero en cuenta) directamente desde la web. Si deseas abonar por transferencia u otro método, podés contactarnos por WhatsApp.",
  },
  {
    question: "¿Dónde puedo ver más novedades o realizar consultas directas?",
    answer: (
      <span>
        Podés explorar nuestro catálogo y novedades directamente en nuestro canal de WhatsApp.&nbsp;
        <a 
          href="https://wa.me/c/5493413375533" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900 font-medium"
        >
          Ver catálogo en WhatsApp
        </a>
        &nbsp;o&nbsp;
        <a 
          href="https://whatsapp.com/channel/0029Vaa1oA0FMqrbUhIvyE2m" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900 font-medium"
        >
          Unirme al canal de WhatsApp
        </a>.
      </span>
    ),
  },
];

const PreguntasFrecuentes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <section id="preguntas-frecuentes" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-purple-200 rounded-lg shadow-sm transition bg-white/60 backdrop-blur-sm"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-purple-800 font-semibold focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className={`transition-transform duration-300 ml-2 text-purple-600 ${activeIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-slate-600 border-t border-purple-100 pt-3 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;