import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  name: string;
  paypalLink: string;
}

const priceARS = 5000;
const priceUSD = 7;

const courses: Course[] = [
  { id: 'aprender-meditar', name: 'Taller Aprender a Meditar', paypalLink: 'https://www.paypal.com/ncp/payment/7XPKXNWN3977N' },
  { id: 'yoga', name: 'Yoga', paypalLink: 'https://www.paypal.com/ncp/payment/RUP6VSFLMKY2Y' },
  { id: 'barras-access', name: 'Barras de Access', paypalLink: 'https://www.paypal.com/ncp/payment/C3GE4KC69HA7Y' },
  { id: 'astrologia-numerologia', name: 'Astrología y Numerología', paypalLink: 'https://www.paypal.com/ncp/payment/B2KYWDJPH789S' },
  { id: 'reiki', name: 'Reiki', paypalLink: 'https://www.paypal.com/ncp/payment/SQ965YBKDK3C6' },
  { id: 'reflexologia', name: 'Reflexología', paypalLink: 'https://www.paypal.com/ncp/payment/G8T69UP8PVHVY' },
  { id: 'mesa-radionica', name: 'Mesa Radiónica y Radiestesia', paypalLink: 'https://www.paypal.com/ncp/payment/E9HGDNC25KQQU' },
  { id: 'cuencos-tibetanos', name: 'Cuencos Tibetanos y Musicoterapia', paypalLink: 'https://www.paypal.com/ncp/payment/KPTNH3KEPVDDJ' },
  { id: 'tarot-marsella', name: 'Tarot Marsella', paypalLink: 'https://www.paypal.com/ncp/payment/QPRGBM4BHVRGG' },
  { id: 'sanacion-pranica', name: 'Sanación Pránica', paypalLink: 'https://www.paypal.com/ncp/payment/SHTDZFP2R6X52' },
  { id: 'hipnosis-regresiones', name: 'Hipnosis y Regresiones', paypalLink: 'https://www.paypal.com/ncp/payment/5D8GANNHCZG2L' },
  { id: 'feng-shui', name: 'Feng Shui', paypalLink: 'https://www.paypal.com/ncp/payment/MAXX5NDESQW5L' },
  { id: 'biomagnetismo', name: 'Biomagnetismo', paypalLink: 'https://www.paypal.com/ncp/payment/PXDYFKJAFP3GE' },
  { id: 'tapping-eft', name: 'Tapping EFT', paypalLink: 'https://www.paypal.com/ncp/payment/B4CFHKBMR4ECQ' },
  { id: 'velomancia', name: 'Velomancia', paypalLink: 'https://www.paypal.com/ncp/payment/WX7UU3TLQBYHE' },
  { id: 'glandula-pineal', name: 'Activación de la Glándula Pineal', paypalLink: 'https://www.paypal.com/ncp/payment/6X5ABNKEJHNQW' },
  { id: 'medicina-china', name: 'Medicina China', paypalLink: 'https://www.paypal.com/ncp/payment/XLNDR39GCAE6U' },
  { id: 'metodo-yuen', name: 'Método Yuen', paypalLink: 'https://www.paypal.com/ncp/payment/N7WL6UMMPBKDW' },
  { id: 'auriculoterapia', name: 'Auriculoterapia', paypalLink: 'https://www.paypal.com/ncp/payment/NREV9DF9DRT7L' },
  { id: 'cirugia-astral', name: 'Cirugía Astral', paypalLink: 'https://www.paypal.com/ncp/payment/RM5CV8CQYWGUA' },
  { id: 'parapsicologia', name: 'Parapsicología', paypalLink: 'https://www.paypal.com/ncp/payment/Q7KRFGNKM24FW' },
  { id: 'pack-holistico-22', name: 'Pack Holístico (22 cursos)', paypalLink: 'https://www.paypal.com/ncp/payment/HSS65J96C3KMU' },
];

const Checkout: React.FC = () => {
  const [cursoSeleccionadoTransferencia, setCursoSeleccionadoTransferencia] = useState<Course | null>(null);

  if (cursoSeleccionadoTransferencia) {
    const tuNumeroWhatsApp = "5493413375533";
    const mensajeWp = encodeURIComponent(`¡Hola! Acabo de realizar la transferencia por ARS $${priceARS.toLocaleString()} para el curso "${cursoSeleccionadoTransferencia.name}". Te adjunto el comprobante.`);

    return (
      <div className="min-h-screen bg-cover bg-center p-6 flex items-center justify-center" style={{ backgroundImage: 'url("/Terapiasholisticas.jpg")' }}>
        <div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-2">Datos para Transferencia</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Curso seleccionado: <span className="font-semibold text-indigo-600">{cursoSeleccionadoTransferencia.name}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6 border border-gray-200">
            <div>
              <span className="text-xs text-gray-500 block">Titular de la cuenta:</span>
              <span className="font-medium text-gray-800">Diego Martin Fragnito</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">CBU:</span>
              <span className="font-mono font-bold text-indigo-600 select-all text-sm">4530000800012708764665</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Alias:</span>
              <span className="font-mono font-bold text-indigo-600 select-all text-lg">HOLISTICA.DMF</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Importe a abonar:</span>
              <span className="font-semibold text-gray-800">ARS ${priceARS.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-600 text-center">
              Una vez realizada la transferencia, hacé clic en el botón para enviar el comprobante directamente a nuestro WhatsApp y activar tu acceso.
            </p>

            <a
              href={`https://wa.me/${tuNumeroWhatsApp}?text=${mensajeWp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200 shadow-md text-center"
            >
              <span>💬 Avisar por WhatsApp</span>
            </a>

            <button
              onClick={() => setCursoSeleccionadoTransferencia(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg text-center transition-colors"
            >
              ← Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: 'url("/Terapiasholisticas.jpg")' }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Catálogo de Cursos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="border p-4 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div>
                <h2 className="font-semibold text-lg mb-2">{course.name}</h2>
                <p className="text-sm text-gray-600">ARS ${priceARS.toLocaleString()}</p>
                <p className="text-sm text-gray-600">USD ${priceUSD}</p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setCursoSeleccionadoTransferencia(course)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-center cursor-pointer transition-colors"
                >
                  Comprar 🏦
                </button>
                <a
                  href={course.paypalLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    course.paypalLink ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-gray-300 cursor-not-allowed text-white'
                  } font-bold py-2 px-4 rounded-lg text-center`}
                >
                  Pagar con PayPal
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 mt-10">
          <p className="font-semibold mb-2">Información general de transferencia:</p>
          <p><strong>CBU:</strong> 4530000800012708764665</p>
          <p><strong>Alias:</strong> HOLISTICA.DMF</p>
          <p><strong>Titular:</strong> Diego Martin Fragnito</p>
          <p className="mt-2">Ante cualquier duda, podés comunicarte con nosotros mediante el botón de WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;