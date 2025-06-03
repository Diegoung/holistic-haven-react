import React from 'react';
import { motion } from 'framer-motion';

interface Course {
  name: string;
  mercadoPagoLink: string;
  paypalLink: string;
}

const priceARS = 5000;
const priceUSD = 7;

const courses: Course[] = [
  // ... tus cursos
  { name: 'Taller Aprender a Meditar', mercadoPagoLink: 'https://mpago.la/1LbCpZn', paypalLink: 'https://www.paypal.com/ncp/payment/7XPKXNWN3977N' },
  { name: 'Yoga', mercadoPagoLink: 'https://mpago.la/1m6KVs8', paypalLink: 'https://www.paypal.com/ncp/payment/RUP6VSFLMKY2Y' },
  { name: 'Barras de Access', mercadoPagoLink: 'https://mpago.la/1ArdBA7', paypalLink: 'https://www.paypal.com/ncp/payment/C3GE4KC69HA7Y' },
  { name: 'Astrología y Numerología', mercadoPagoLink: 'https://mpago.la/19pGEFj', paypalLink: 'https://www.paypal.com/ncp/payment/B2KYWDJPH789S' },
  { name: 'Reiki', mercadoPagoLink: 'https://mpago.la/2tH8L2Y', paypalLink: 'https://www.paypal.com/ncp/payment/SQ965YBKDK3C6' },
  { name: 'Reflexología', mercadoPagoLink: 'https://mpago.la/2zeA5gB', paypalLink: 'https://www.paypal.com/ncp/payment/G8T69UP8PVHVY' },
  { name: 'Mesa Radiónica y Radiestesia', mercadoPagoLink: 'https://mpago.la/1DsFHU4', paypalLink: 'https://www.paypal.com/ncp/payment/E9HGDNC25KQQU' },
  { name: 'Cuencos Tibetanos y Musicoterapia', mercadoPagoLink: 'https://mpago.la/1bZNBFQ', paypalLink: 'https://www.paypal.com/ncp/payment/KPTNH3KEPVDDJ' },
  { name: 'Tarot Marsella', mercadoPagoLink: 'https://mpago.la/1iZ8EHP', paypalLink: 'https://www.paypal.com/ncp/payment/QPRGBM4BHVRGG' },
  { name: 'Sanación Pránica', mercadoPagoLink: 'https://mpago.la/2ah1U7Z', paypalLink: 'https://www.paypal.com/ncp/payment/SHTDZFP2R6X52' },
  { name: 'Hipnosis y Regresiones', mercadoPagoLink: 'https://mpago.la/13rE4MZ', paypalLink: 'https://www.paypal.com/ncp/payment/5D8GANNHCZG2L' },
  { name: 'Feng Shui', mercadoPagoLink: 'https://mpago.la/1YYLDtH', paypalLink: 'https://www.paypal.com/ncp/payment/MAXX5NDESQW5L' },
  { name: 'Biomagnetismo', mercadoPagoLink: 'https://mpago.la/1oADvtX', paypalLink: 'https://www.paypal.com/ncp/payment/PXDYFKJAFP3GE' },
  { name: 'Tapping EFT', mercadoPagoLink: 'https://mpago.la/2THH2PU', paypalLink: 'https://www.paypal.com/ncp/payment/B4CFHKBMR4ECQ' },
  { name: 'Velomancia', mercadoPagoLink: 'https://mpago.la/2dvGCpp', paypalLink: 'https://www.paypal.com/ncp/payment/WX7UU3TLQBYHE' },
  { name: 'Activación de la Glándula Pineal', mercadoPagoLink: 'https://mpago.la/1m6AeRg', paypalLink: 'https://www.paypal.com/ncp/payment/6X5ABNKEJHNQW' },
  { name: 'Medicina China', mercadoPagoLink: 'https://mpago.la/2JoXxHt', paypalLink: 'https://www.paypal.com/ncp/payment/XLNDR39GCAE6U' },
  { name: 'Método Yuen', mercadoPagoLink: 'https://mpago.la/2krzPyc', paypalLink: 'https://www.paypal.com/ncp/payment/N7WL6UMMPBKDW' },
  { name: 'Auriculoterapia', mercadoPagoLink: 'https://mpago.la/1AyFDN3', paypalLink: 'https://www.paypal.com/ncp/payment/NREV9DF9DRT7L' },
  { name: 'Cirugía Astral', mercadoPagoLink: 'https://mpago.la/1PATZii', paypalLink: 'https://www.paypal.com/ncp/payment/RM5CV8CQYWGUA' },
  { name: 'Parapsicología', mercadoPagoLink: 'https://mpago.la/2C66Zk2', paypalLink: 'https://www.paypal.com/ncp/payment/Q7KRFGNKM24FW' },
  { name: 'Pack Holístico (22 cursos)', mercadoPagoLink: 'https://mpago.la/1q3yBXq', paypalLink: 'https://www.paypal.com/ncp/payment/HSS65J96C3KMU' },
];


const Checkout: React.FC = () => {
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
                <a
                  href={course.mercadoPagoLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    course.mercadoPagoLink ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                  } text-white font-bold py-2 px-4 rounded-lg text-center`}
                >
                  Pagar con Mercado Pago
                </a>
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


