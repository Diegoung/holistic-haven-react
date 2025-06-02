import React, { useState } from "react";

const faqs = [
  {
    question: "¿Dónde puedo ver los cursos y novedades de nuestra academia?",
    answer: (
      <span>
        Los invitamos a explorar nuestro catálogo en WhatsApp para conocer en detalle cada uno de nuestros cursos y descubrir nuestras últimas novedades a través de nuestro canal.&nbsp;
        <a 
          href="https://wa.me/c/5493413375533" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900"
        >
          Ver catálogo en WhatsApp
        </a>.
        <a 
          href="https://whatsapp.com/channel/0029Vaa1oA0FMqrbUhIvyE2m" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900"
        >
          Unirme al canal de Whatsapp
        </a>.
      </span>
    ),
  },
  {
    question: "¿Necesito experiencia previa para inscribirme en los cursos?",
    answer:
      "No. Nuestros cursos están diseñados tanto para principiantes como para personas con experiencia previa en terapias holísticas.",
  },
  {
    question: "¿Los cursos son presenciales o virtuales?",
    answer:
      "Nuestros cursos se imparten en modalidad virtual, brindando a los estudiantes manuales desarrollados por nosotros y material audiovisual complementario. Además, cuentan con asistencia personalizada durante el proceso de estudio.",
  },
  {
    question: "¿Entregan certificado?",
    answer:
      "Sí, cada curso incluye un certificado de participación que acredita que usted posee conocimientos en la terapia correspondiente.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos transferencias bancarias, Mercado Pago, y otros métodos según el país del estudiante. Para más detalles, contactanos por WhatsApp.",
  },
  {
    question: "¿Cómo puedo inscribirme a un curso?",
    answer:
      "Podés inscribirte contactándonos por WhatsApp.",
  },
];

const PreguntasFrecuentes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-purple-200 rounded-lg shadow-sm transition"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-purple-700 font-semibold focus:outline-none"
            >
              {faq.question}
              <span className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
