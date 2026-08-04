"use client";
import React from 'react';

interface TransferenciaProps {
  cursoNombre?: string;
  onVolver?: () => void;
}

export default function Transferencia({ cursoNombre = "el curso seleccionado", onVolver }: TransferenciaProps) {
  // Tus datos bancarios reales
  const datosBanco = {
    banco: "Mercado Pago / Cuenta Digital",
    titular: "Diego Martin Fragnito",
    cuit: "Argentina", 
    cbu: "4530000800012708764665",
    alias: "HOLISTICA.DMF"
  };

  // Tu número de WhatsApp configurado
  const tuNumeroWhatsApp = "5493410000000"; // Reemplazá con tu número real de WhatsApp Business
  const mensajeWp = encodeURIComponent(`¡Hola! Acabo de realizar la transferencia para "${cursoNombre}". Te adjunto el comprobante.`);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Datos para Transferencia</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Estás a un paso de inscribirte en: <span className="font-semibold text-indigo-600">{cursoNombre}</span>
        </p>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6 border border-gray-200">
          <div>
            <span className="text-xs text-gray-500 block">Titular de la cuenta:</span>
            <span className="font-medium text-gray-800">{datosBanco.titular}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">CBU:</span>
            <span className="font-mono font-bold text-indigo-600 select-all text-sm">{datosBanco.cbu}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Alias:</span>
            <span className="font-mono font-bold text-indigo-600 select-all text-lg">{datosBanco.alias}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Entidad / Medio:</span>
            <span className="font-medium text-gray-800">{datosBanco.banco}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-gray-500 text-center">
            Una vez realizada la transferencia, hacé clic en el botón de abajo para enviar el comprobante por WhatsApp y activar tu acceso de inmediato.
          </p>

          <a
            href={`https://wa.me/${tuNumeroWhatsApp}?text=${mensajeWp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200 shadow-md"
          >
            <span className="text-xl">💬</span>
            <span>Avisar por WhatsApp</span>
          </a>

          {onVolver && (
            <button
              onClick={onVolver}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 pt-2"
            >
              ← Volver atrás
            </button>
          )}
        </div>
      </div>
    </div>
  );
}