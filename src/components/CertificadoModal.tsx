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
  const [abrirDropdown, setAbrirDropdown] = useState(false);

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
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '15px', boxSizing: 'border-box' }}>
      
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', maxWidth: '900px', width: '100%', maxHeight: '95vh', overflowY: 'auto', boxSizing: 'border-box' }}>
        
        {/* Controles de edición */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '12px', borderRadius: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            placeholder="Nombre" 
            style={{ flex: 1, minWidth: '200px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="date" 
            onChange={e => setFecha(e.target.value)} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          {esPack && (
            <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
              <div 
                onClick={() => setAbrirDropdown(!abrirDropdown)}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}
              >
                <span style={{ color: terapiaPack ? '#000' : '#666', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {terapiaPack || '-- Seleccionar Terapia del Pack --'}
                </span>
                <span style={{ fontSize: '12px', marginLeft: '5px' }}>▼</span>
              </div>

              {abrirDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '200px', overflowY: 'auto', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 2000, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)', marginTop: '2px' }}>
                  {opcionesPack.map(t => (
                    <div 
                      key={t} 
                      onClick={() => { setTerapiaPack(t); setAbrirDropdown(false); }}
                      style={{ padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontSize: '14px', backgroundColor: terapiaPack === t ? '#e8f5e9' : '#fff' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = terapiaPack === t ? '#e8f5e9' : '#fff'}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
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

        {/* Botones de acción */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleDescargarImagen} 
            disabled={descargando}
            style={{ flex: 1, padding: '12px', backgroundColor: '#2C4A3E', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', opacity: descargando ? 0.7 : 1 }}
          >
            {descargando ? 'Generando certificado...' : 'Descargar Certificado 📥'}
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