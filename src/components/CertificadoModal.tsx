import React, { useState } from 'react';
import { toPng } from 'html-to-image';

interface Props {
  curso: { id: string | number, titulo: string };
  nombreAlumno: string;
  onCerrar: () => void;
}

export const CertificadoModal: React.FC<Props> = ({ curso, nombreAlumno, onCerrar }) => {
  const [nombre, setNombre] = useState(nombreAlumno);
  const [fecha, setFecha] = useState('');
  const [terapiaPack, setTerapiaPack] = useState('');
  const [descargando, setDescargando] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const esPack = curso.titulo.toLowerCase().includes('pack');
  
  const opcionesPack = [
    "Cuencos Tibetanos y Musicoterapia",
    "Tarot Marsella",
    "Yoga",
    "Barras de Access",
    "Astrología y Numerología",
    "Reiki",
    "Reflexología",
    "Mesa Radiónica y Radiestesia",
    "Sanación Pránica",
    "Hipnosis y Regresiones",
    "Feng Shui",
    "Biomagnetismo",
    "Tapping EFT",
    "Velomancia",
    "Activación Glándula Pineal",
    "Medicina China",
    "Método Yuen",
    "Auriculoterapia",
    "Cirugía Astral",
    "Parapsicología",
    "Taller aprender a meditar",
    "Registros Akáshicos"
  ];

  const handleDescargarImagen = async () => {
    const node = document.getElementById('printable-certificate');
    if (node) {
      try {
        setDescargando(true);
        // Generamos con alta calidad para la descarga manteniendo el tamaño real nítido
        const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
        
        const link = document.createElement('a');
        link.download = `Certificado_${nombre || 'Alumno'}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error al generar la imagen del certificado:', err);
        alert('Hubo un error al descargar. Inténtalo de nuevo.');
      } finally {
        setDescargando(false);
      }
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '10px', boxSizing: 'border-box' }}>
      
      {/* Contenedor principal que se adapta al alto exacto de la pantalla */}
      <div style={{ backgroundColor: 'white', padding: '12px 15px', borderRadius: '12px', maxWidth: '580px', width: '100%', maxHeight: '96vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', overflowY: 'auto' }}>
        
        {/* Controles de edición */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px', backgroundColor: '#f0f0f0', padding: '6px 8px', borderRadius: '6px', alignItems: 'center', flexShrink: 0 }}>
          <input 
            type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            placeholder="Nombre" 
            style={{ flex: 1, minWidth: '130px', padding: '5px 8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
          />
          <input 
            type="date" 
            onChange={e => setFecha(e.target.value)} 
            style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
          />

          {esPack && (
            <button
              type="button"
              onClick={() => setMostrarSelector(true)}
              style={{ flex: 1, minWidth: '170px', padding: '5px 8px', borderRadius: '4px', border: '1px solid #2C4A3E', backgroundColor: '#2C4A3E', color: '#fff', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {terapiaPack ? `Terapia: ${terapiaPack}` : '🔍 Seleccionar Terapia'}
              </span>
              <span>▼</span>
            </button>
          )}
        </div>

        {/* Modal interno para seleccionar la terapia */}
        {mostrarSelector && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, padding: '15px' }}>
            <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '450px', maxHeight: '75vh', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '6px' }}>
                <h3 style={{ margin: 0, color: '#2C4A3E', fontSize: '15px' }}>Seleccione la Terapia del Pack</h3>
                <button onClick={() => setMostrarSelector(false)} style={{ background: 'none', border: 'none', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>
              <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {opcionesPack.map(t => (
                  <div
                    key={t}
                    onClick={() => { setTerapiaPack(t); setMostrarSelector(false); }}
                    style={{ padding: '7px 10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: terapiaPack === t ? '#e8f5e9' : '#f9f9f9', border: terapiaPack === t ? '1px solid #2e7d32' : '1px solid #eee', fontSize: '12px', color: '#333' }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certificado Visual compactado en altura para entrar perfectamente */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, margin: '2px 0' }}>
          <div 
            id="printable-certificate" 
            style={{ 
              border: '6px solid #2C4A3E', 
              padding: '12px 20px', 
              textAlign: 'center', 
              fontFamily: 'Georgia, serif', 
              backgroundImage: 'url(/terapiasholisticas1.jpg)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#fff', 
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '520px'
            }}
          >
            <h1 style={{ fontSize: '14px', color: '#2C4A3E', marginBottom: '2px', textShadow: '0px 1px 2px rgba(255,255,255,0.9)' }}>CERTIFICADO DE PARTICIPACIÓN</h1>
            <p style={{ fontStyle: 'italic', color: '#555', margin: '1px 0', fontSize: '10px' }}>Se otorga a:</p>
            <h2 style={{ borderBottom: '2px solid #2C4A3E', display: 'inline-block', width: '75%', margin: '4px 0', fontSize: '15px', color: '#1a237e', textShadow: '0px 1px 2px rgba(255,255,255,0.9)' }}>
              {nombre || 'Nombre del Alumno'}
            </h2>
            <p style={{ fontStyle: 'italic', color: '#555', margin: '1px 0', fontSize: '10px' }}>Por haber completado el curso de:</p>
            <h3 style={{ color: '#2e7d32', fontSize: '12px', textTransform: 'uppercase', margin: '3px 0', textShadow: '0px 1px 2px rgba(255,255,255,0.9)' }}>
              {esPack ? (terapiaPack || 'Seleccione una terapia') : curso.titulo}
            </h3>
            <p style={{ marginTop: '6px', fontSize: '10px', color: '#333', textShadow: '0px 1px 2px rgba(255,255,255,0.9)' }}>Fecha: {fecha ? fecha.split('-').reverse().join('/') : 'DD/MM/AAAA'}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button 
            onClick={handleDescargarImagen} 
            disabled={descargando}
            style={{ flex: 1, padding: '8px', backgroundColor: '#2C4A3E', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', opacity: descargando ? 0.7 : 1, fontSize: '12px' }}
          >
            {descargando ? 'Generando certificado...' : 'Descargar Certificado 📥'}
          </button>
          <button 
            onClick={onCerrar} 
            style={{ padding: '8px 14px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
          >
            Cerrar ❌
          </button>
        </div>

      </div>
    </div>
  );
};