import React, { useState } from 'react';

interface Props {
  curso: { id: string | number, titulo: string };
  nombreAlumno: string;
  onCerrar: () => void;
}

export const CertificadoModal: React.FC<Props> = ({ curso, nombreAlumno, onCerrar }) => {
  const [nombre, setNombre] = useState(nombreAlumno);
  const [fecha, setFecha] = useState('');
  const [terapiaPack, setTerapiaPack] = useState('');

  const esPack = curso.titulo.toLowerCase().includes('pack');
  
  const opcionesPack = [
    "Registros Akáshicos", "Biomagnetismo", "Tarot Terapéutico", "Flores de Bach", 
    "Biodescodificación", "Reflexología", "Aromaterapia", "Péndulo Hebreo", 
    "Sonoterapia", "Masaje Ayurvédico", "Mindfulness", "Sanación con Cristales"
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '15px', boxSizing: 'border-box' }}>
      
      {/* 🔹 ESTILOS DE IMPRESIÓN FORZADA A4 HORIZONTAL (COMPATIBLE CON CELULARES Y PC) */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape !important;
            margin: 0 !important;
          }
          body, html {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            overflow: hidden !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible !important;
          }
          #printable-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 40px !important;
            box-sizing: border-box !important;
            z-index: 999999 !important;
            background-color: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', maxWidth: '900px', width: '100%', maxHeight: '95vh', overflowY: 'auto', boxSizing: 'border-box' }}>
        
        {/* Controles de edición */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '12px', borderRadius: '8px' }}>
          <input 
            type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            placeholder="Nombre" 
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="date" 
            onChange={e => setFecha(e.target.value)} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {esPack && (
            <select 
              value={terapiaPack} 
              onChange={e => setTerapiaPack(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}
            >
              <option value="">-- Seleccionar Terapia del Pack --</option>
              {opcionesPack.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </div>

        {/* Certificado Visual */}
        <div id="printable-certificate" style={{ border: '15px solid #2C4A3E', padding: '40px', textAlign: 'center', fontFamily: 'Georgia, serif', backgroundColor: '#fff', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '24px', color: '#2C4A3E', marginBottom: '10px' }}>CERTIFICADO DE PARTICIPACIÓN</h1>
          <p style={{ fontStyle: 'italic', color: '#555', margin: '5px 0' }}>Se otorga a:</p>
          <h2 style={{ borderBottom: '2px solid #2C4A3E', display: 'inline-block', width: '80%', margin: '15px 0', fontSize: '26px', color: '#1a237e' }}>
            {nombre || 'Nombre del Alumno'}
          </h2>
          <p style={{ fontStyle: 'italic', color: '#555', margin: '5px 0' }}>Por haber completado el curso de:</p>
          <h3 style={{ color: '#2e7d32', fontSize: '22px', textTransform: 'uppercase', margin: '10px 0' }}>
            {esPack ? (terapiaPack || 'Seleccione una terapia') : curso.titulo}
          </h3>
          <p style={{ marginTop: '30px', fontSize: '14px', color: '#333' }}>Fecha: {fecha ? fecha.split('-').reverse().join('/') : 'DD/MM/AAAA'}</p>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => window.print()} 
            style={{ flex: 1, padding: '12px', backgroundColor: '#2C4A3E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Descargar / Imprimir PDF 📥
          </button>
          <button 
            onClick={onCerrar} 
            style={{ padding: '12px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Cerrar ❌
          </button>
        </div>
      </div>
    </div>
  );
};