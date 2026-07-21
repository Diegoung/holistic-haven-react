import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient'; // Asegurate de importar tu cliente de Supabase

interface Course {
  id: string; // Agregamos un ID único para cada curso
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

  const handleMercadoPago = async (course: Course) => {
    // 1. Obtener el usuario autenticado en Supabase
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Por favor iniciá sesión para poder realizar la compra.");
      return;
    }

    try {
      // 2. Generar el checkout llamando a la API
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course.name,
          price: priceARS,
          userId: user.id,
          courseId: course.id,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redirigir al cliente a la pantalla de cobro de MP
        window.location.href = data.init_point;
      } else {
        alert("Ocurrió un error al generar el pago. Intentá nuevamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la pasarela de pagos.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: 'url("/Terapiasholisticas.jpg")' }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Carrito de Compras</h1>

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
                  onClick={() => handleMercadoPago(course)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center cursor-pointer transition-colors"
                >
                  Pagar con Mercado Pago
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
          <p className="font-semibold mb-2">¿Querés pagar por transferencia local?</p>
          <p>Podés hacerlo a esta cuenta bancaria:</p>
          <p><strong>CBU:</strong> 1430001713033958540010</p>
          <p><strong>Alias:</strong> holistica.dmf</p>
          <p><strong>Banco:</strong> Bru Bank</p>
          <p className="mt-2">Una vez hecho el pago, por favor enviá el comprobante a nuestro WhatsApp así enviaremos el material correspondiente.</p>
          <p className="mt-2">Contamos con cuentas locales en su país para que pueda depositar en su moneda local, consulte....</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;