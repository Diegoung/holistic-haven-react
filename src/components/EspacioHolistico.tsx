import React, { useState } from "react";

export const EspacioHolistico: React.FC = () => {
  const [seccionActiva, setSeccionActiva] = useState<'oraculo' | 'lunas' | 'arquetipo' | 'selector'>('oraculo');

  // 1. Estados y datos para el Oráculo
  const mensajesOraculo = [
    "✨ 'Tu intuición es tu brújula más fiel hoy. Confía en lo que sientes en tu interior.'",
    "🌿 'Momento de soltar el control y permitir que el universo acomode lo que está en proceso.'",
    "💧 'La sanación requiere paciencia. Sé amable contigo mismo/a en este ciclo de aprendizaje.'",
    "🔥 'Tu energía creativa está en alto. Canaliza tu pasión hacia aquello que nutre tu alma.'",
    "🕊️ 'La paz que buscas no está afuera, sino en la quietud de tu respiración consciente.'"
  ];
  const [mensajeActual, setMensajeActual] = useState<string | null>(null);

  // 2. Estados para la Calculadora de Arquetipo
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [resultadoArquetipo, setResultadoArquetipo] = useState<{ elemento: string, descripcion: string } | null>(null);

  const calcularArquetipo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fechaNacimiento) return;
    const mes = parseInt(fechaNacimiento.split('-')[1]);
    const elementos = [
      { elemento: "Fuego (Acción y Propósito)", descripcion: "Tu energía es impulsora, apasionada y luminosa. Ideal para iniciar proyectos y liderar tu propio camino." },
      { elemento: "Tierra (Raíz y Manifestación)", descripcion: "Te conecta con la estabilidad, el cuerpo y lo práctico. Tienes gran capacidad para materializar tus metas." },
      { elemento: "Aire (Mente y Consciencia)", descripcion: "Tu enfoque pasa por la claridad mental, la comunicación y la expansión de nuevas ideas y sabidurías." },
      { elemento: "Agua (Emoción y Sanación)", descripcion: "Tu mayor poder es la empatía, la intuición profunda y la capacidad de transmutar las emociones." }
    ];
    setResultadoArquetipo(elementos[mes % elementos.length]);
  };

  // 3. Estados para el Selector de Terapias
  const [resultadoTest, setResultadoTest] = useState<{ titulo: string, desc: string, recomendacion: string } | null>(null);

  const procesarTest = (opcion: string) => {
    const resultados: Record<string, { titulo: string, desc: string, recomendacion: string }> = {
      emocional: { titulo: "Sanación Emocional", desc: "Tu alma pide liberar cargas del pasado y sanar vínculos.", recomendacion: "Biodescodificación o Sanación del Niño Interior." },
      energetica: { titulo: "Maestría Energética", desc: "Necesitas herramientas de blindaje y limpieza para tu aura y espacios.", recomendacion: "Péndulo Hebreo y Rocíos Áuricos." },
      ancestros: { titulo: "Sanación del Linaje", desc: "Estás listo para sanar raíces familiares y patrones repetitivos.", recomendacion: "Sanación de Árbol Genealógico y Rito del Útero." },
      dones: { titulo: "Despertar Espiritual", desc: "Tus dones intuitivos necesitan estructura y canalización.", recomendacion: "Registros Akáshicos y Magia Wicca." }
    };
    setResultadoTest(resultados[opcion] || resultados.emocional);
  };

  return (
    <section className="py-16 bg-purple-50/30">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-900">Rincón de Bienestar y Guía Holística</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Un espacio interactivo para conectar con tu energía, consultar mensajes y descubrir herramientas de autoconocimiento.
          </p>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'oraculo', label: '🔮 Oráculo' },
            { id: 'lunas', label: '🌙 Fases Lunares' },
            { id: 'arquetipo', label: '⭐ Tu Elemento' },
            { id: 'selector', label: '🧭 Selector de Terapia' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSeccionActiva(tab.id as any)}
              className={`px-4 py-2.5 rounded-full font-medium transition shadow-sm ${seccionActiva === tab.id ? 'bg-purple-800 text-white' : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenedor de Contenido Dinámico */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100 min-h-[420px] flex flex-col justify-center items-center">
          
          {/* 1. ORÁCULO */}
          {seccionActiva === 'oraculo' && (
            <div className="text-center max-w-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Mensaje de Guía para Tu Día</h3>
              <p className="text-slate-600 mb-6 text-sm">Respira hondo, concéntrate en una pregunta y descubre el mensaje que tiene el universo para vos.</p>
              {mensajeActual ? (
                <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl mb-6 shadow-inner">
                  <p className="text-purple-900 font-serif text-lg italic">{mensajeActual}</p>
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-xl mb-6 border border-dashed border-slate-300">
                  <p className="text-slate-400">Haz clic en el botón para revelar tu mensaje...</p>
                </div>
              )}
              <button
                onClick={() => setMensajeActual(mensajesOraculo[Math.floor(Math.random() * mensajesOraculo.length)])}
                className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg shadow transition"
              >
                {mensajeActual ? 'Sacar otro mensaje 🎴' : 'Revelar mi mensaje 🌟'}
              </button>
            </div>
          )}

          {/* 2. FASES LUNARES */}
          {seccionActiva === 'lunas' && (
            <div className="max-w-xl text-left">
              <h3 className="text-2xl font-bold text-purple-900 mb-3 text-center">Agenda Energética y Clima Lunar</h3>
              <p className="text-slate-600 mb-6 text-sm text-center">El cielo nos invita constantemente a ciclar nuestra energía entre la siembra y la cosecha.</p>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                  <h4 className="font-bold text-purple-900">🌑 Luna Nueva / Siembra</h4>
                  <p className="text-sm text-slate-600">Momento ideal para intencionar nuevos hábitos e iniciar cursos de formación.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-bold text-purple-900">🌕 Luna Llena / Cosecha y Plenitud</h4>
                  <p className="text-sm text-slate-600">Punto de máxima iluminación. Excelente para rituales de agradecimiento y cierre de etapas.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. ARQUETIPO */}
          {seccionActiva === 'arquetipo' && (
            <div className="max-w-md w-full">
              <h3 className="text-2xl font-bold text-purple-900 mb-2 text-center">Calculadora de Elemento Esencial</h3>
              <p className="text-slate-600 mb-6 text-sm text-center">Ingresa tus datos para conocer tu vibración elemental base.</p>
              {!resultadoArquetipo ? (
                <form onSubmit={calcularArquetipo} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Tu Nombre</label>
                    <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Sofía" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Fecha de Nacimiento</label>
                    <input type="date" required value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-600" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg shadow transition mt-2">Calcular mi Energía ✨</button>
                </form>
              ) : (
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center animate-fadeIn">
                  <h4 className="text-xl font-bold text-purple-900 mb-1">¡Hola, {nombre}!</h4>
                  <p className="text-sm text-purple-700 font-semibold mb-3">Tu elemento predominante es: {resultadoArquetipo.elemento}</p>
                  <p className="text-slate-600 text-sm mb-6">{resultadoArquetipo.descripcion}</p>
                  <button onClick={() => setResultadoArquetipo(null)} className="text-xs text-purple-700 underline font-semibold hover:text-purple-900">Calcular otra fecha 🔄</button>
                </div>
              )}
            </div>
          )}

          {/* 4. SELECTOR DE TERAPIA IDEAL */}
          {seccionActiva === 'selector' && (
            <div className="max-w-2xl w-full text-center">
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Selector de Terapia Ideal</h3>
              <p className="text-slate-600 mb-6 text-sm">Elige tu enfoque principal para recibir una sugerencia personalizada de cursos:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-6">
                <button onClick={() => procesarTest('emocional')} className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-900 font-medium text-xs transition">🌱 Sanación emocional y vínculos</button>
                <button onClick={() => procesarTest('energetica')} className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-900 font-medium text-xs transition">🛡️ Protección y limpieza energética</button>
                <button onClick={() => procesarTest('ancestros')} className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-900 font-medium text-xs transition">🌳 Sanación de Árbol Genealógico</button>
                <button onClick={() => procesarTest('dones')} className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-900 font-medium text-xs transition">✨ Desarrollo de dones espirituales</button>
              </div>
              {resultadoTest && (
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center animate-fadeIn">
                  <h4 className="font-bold text-purple-900">{resultadoTest.titulo}</h4>
                  <p className="text-xs text-slate-600 my-1">{resultadoTest.desc}</p>
                  <p className="text-xs font-bold text-purple-800">🎯 Sugerencia: {resultadoTest.recomendacion}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default EspacioHolistico;