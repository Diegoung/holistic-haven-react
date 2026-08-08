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
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '900px', width: '90%' }}>
        
        {/* Controles de edición */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
          <input type="date" onChange={e => setFecha(e.target.value)} />
          {esPack && (
            <select onChange={e => setTerapiaPack(e.target.value)}>
              {opcionesPack.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
        </div>

        {/* Certificado Visual */}
        <div id="printable-certificate" style={{ border: '15px solid #2C4A3E', padding: '50px', textAlign: 'center', fontFamily: 'Georgia' }}>
          <h1>CERTIFICADO DE PARTICIPACIÓN</h1>
          <p>Se otorga a:</p>
          <h2 style={{ borderBottom: '2px solid #2C4A3E', display: 'inline-block', width: '80%' }}>{nombre}</h2>
          <p>Por haber completado el curso de:</p>
          <h3 style={{ color: '#2e7d32' }}>{esPack ? terapiaPack : curso.titulo}</h3>
          <p>Fecha: {fecha}</p>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={() => window.print()}>Imprimir PDF</button>
          <button onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};