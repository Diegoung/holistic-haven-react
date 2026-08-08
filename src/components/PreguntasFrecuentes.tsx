import React, { useState } from "react";

const faqs = [
  {
    question: "¿Cómo funciona la plataforma y el registro de usuarios?",
    answer:
      "Para adquirir y acceder a las formaciones, primero debés registrarte o iniciar sesión en la web con tu correo electrónico. De esta manera, el sistema vincula tus compras de forma segura a tu perfil, permitiéndote desbloquear de manera automática el acceso al material de estudio, los enlaces de descarga y tus certificados oficiales en cualquier momento.",
  },
  {
    question: "¿Cómo accedo a los cursos que compro?",
    answer:
      "Una vez que realizas el pago y se aprueba, el sistema habilita automáticamente en tu panel los botones de acceso. Podrás ingresar directamente a carpetas de Google Drive organizadas que contienen todo el material de estudio en formato PDF y videos explicativos complementarios para estudiar a tu propio ritmo.",
  },
  {
    question: "¿Los cursos cuentan con apoyo o seguimiento?",
    answer:
      "¡Sí! Todas nuestras formaciones cuentan con asistencia personalizada de un profesor durante todo tu proceso de aprendizaje para que puedas resolver dudas, consultar inquietudes y avanzar con total seguridad.",
  },
  {
    question: "¿Necesito experiencia previa para inscribirme?",
    answer:
      "No. Nuestros cursos están diseñados desde cero, por lo que son ideales tanto para principiantes como para personas con experiencia previa que buscan perfeccionarse en terapias holísticas.",
  },
  {
    question: "¿Los cursos son presenciales o virtuales?",
    answer:
      "Son 100% virtuales y asincrónicos. Podrás administrar tus tiempos de lectura y práctica con los manuales en PDF y videos, respaldados siempre por la asistencia personalizada de tu profesor.",
  },
  {
    question: "¿Cómo se obtiene el certificado de finalización?",
    answer:
      "Al finalizar tu formación, podrás ingresar a tu panel y hacer clic en el botón de certificado. El sistema te permite generar y descargar tu Certificado Oficial de la academia de forma inmediata como imagen de alta calidad (ideal para visualizarse y guardarse sin problemas en cualquier celular o PC).",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos pagos locales en Argentina por transferencia o medios automáticos, y pagos internacionales mediante PayPal o coordinación directa. Si tenés dudas con el pago, podés contactarnos por WhatsApp.",
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