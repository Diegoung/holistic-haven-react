import React from 'react';

const Checkout: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: 'url("/Terapiasholisticas.jpg")' }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <a
            href="https://link.mercadopago.com.ar/articulosvariosss"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-300 text-center"
          >
            Pagar con Mercado Pago
          </a>
          <a
            href="https://www.paypal.com/ncp/payment/WPSLPY9WJ5TMJ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow transition duration-300 text-center"
          >
            Pagar con PayPal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

