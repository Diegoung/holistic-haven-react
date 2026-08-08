import React, { useState } from 'react';

interface CertificadoModalProps {
  curso: {
    id: string | number;
    titulo: string;
  };
  nombreAlumno: string;
  onCerrar: () => void;
}

export const CertificadoModal: React.FC<CertificadoModalProps> = ({ curso, nombreAlumno, onCerrar }) => {
  const [nombre, setNombre] = useState<string>(nombreAlumno || '');
  const [fecha, setFecha] = useState<string>('');
  
  // Lista de las 22 formaciones del Pack Holístico para el menú desplegable
  const listaCursosPack = [
    "Registros Akáshicos", "Biomagnetismo Holístico", "Terapia de Ángeles", 
    "Fitoterapia y Plantas Medicinales", "Tarot Terapéutico", "Astrología Evolutiva",
    "Flores de Bach", "Remedios Homeopáticos", "Biodescodificación", 
    "Masaje Descontracturante y Relajante", "Reflexologia Podal", "Aromaterapia Clínica",
    "Geometría Sagrada", "Péndulo Hebreo", "Cuencos Tibetanos y Sonoterapia",
    "Limpieza Energética de Espacios", "Numerología Terapéutica", "Cacao Sagrado y Medicina Herbal",
    "Masaje Ayurvédico", "Mindfulness y Meditación", "Registros Akáshicos Nivel Avanzado", "Sanación con Cristales"
  ];

  const [terapiaElegidaPack, setTerapiaElegidaPack] = useState<string>(listaCursosPack[0]);

  const esPack = curso.titulo.toLowerCase().includes('pack');

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', overflowY: 'auto' }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-certificate, #printable-certificate * { visibility: visible; }
          #printable-certificate { 
            position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; margin: 0; padding: 0; box-shadow: none !important; border: 12px solid #2C4A3E !important;
          }
        }
      `}</style>

      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', width: '100%', maxWidth: '900px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#2C4A3E', textAlign: 'center', marginBottom: '15px' }}>Personaliza tu Certificado Profesional</h3>

        {/* CONTROLES */}
        <div style={{ display: 'grid', gridTemplateColumns: esPack ? '1fr 1fr 1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px', backgroundColor: '#f4f6f5', padding: '15px', borderRadius: '8px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px' }}>Nombre del Alumno:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px' }}>Fecha de Emisión:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>

          {esPack && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px', color: '#2C4A3E' }}>Seleccionar Terapia:</label>
              <select value={terapiaElegidaPack} onChange={(e) => setTerapiaElegidaPack(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #2C4A3E', backgroundColor: '#fff', fontWeight: 'bold' }}>
                {listaCursosPack.map((t, idx) => (<option key={idx} value={t}>{t}</option>))}
              </select>
            </div>
          )}
        </div>

        {/* DISEÑO DEL CERTIFICADO MEJORADO */}
        <div id="printable-certificate" style={{
          width: '100%', maxWidth: '850px', aspectRatio: '1.414 / 1', position: 'relative', margin: '0 auto', backgroundColor: '#fff', border: '12px solid #2C4A3E', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 50px', fontFamily: 'Georgia, serif', textAlign: 'center'
        }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#666', margin: '0 0 5px 0', textTransform: 'uppercase' }}>Escuela de</p>
            <h2 style={{ color: '#1B3026', fontSize: '22px', margin: '0 0 15px 0', fontWeight: 'normal', letterSpacing: '2px', textTransform: 'uppercase' }}>Terapias Holísticas D.M.F</h2>
            <div style={{ width: '100px', height: '1px', backgroundColor: '#2C4A3E', margin: '0 auto' }}></div>
          </div>

          <div>
            <h1 style={{ color: '#2C4A3E', fontSize: '26px', margin: '15px 0 10px 0', fontWeight: 'normal', fontStyle: 'italic' }}>Certificado de Participación</h1>
            <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', margin: '0 0 10px 0' }}>Por el presente se otorga a:</p>
            
            <h2 style={{ borderBottom: '2px solid #2C4A3E', color: '#1a237e', margin: '0 auto 15px auto', fontSize: '28px', fontWeight: 'bold', paddingBottom: '4px', width: '75%', fontFamily: 'Arial, sans-serif' }}>
              {nombre || 'Nombre del Estudiante'}
            </h2>

            <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px 0' }}>Por haber completado satisfactoriamente la formación intensiva de:</p>
            
            <h3 style={{ color: '#2e7d32', fontSize: '20px', margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
              {esPack ? terapiaElegidaPack : curso.titulo}
            </h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px', padding: '0 30px' }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: '#666' }}>Fecha de emisión:</p>
              <p style={{ margin: '0', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{fecha || 'DD/MM/AAAA'}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 2px 0', fontFamily: 'Brush Script MT, cursive, serif', fontSize: '24px', color: '#1B3026' }}>Diego Martin</p>
              <div style={{ width: '140px', height: '1px', backgroundColor: '#2C4A3E', margin: '0 auto 4px auto' }}></div>
              <p style={{ margin: '0', fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Director General</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', backgroundColor: '#2C4A3E', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Imprimir / Guardar PDF 🖨️</button>
          <button onClick={onCerrar} style={{ padding: '12px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar ❌</button>
        </div>
      </div>
    </div>
  );
};

export default CertificadoModal;