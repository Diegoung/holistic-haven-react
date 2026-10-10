import React from 'react';

export default function Verificacion() {
  const queryParams = new URLSearchParams(window.location.search);
  const alumno = queryParams.get('alumno') || 'Estudiante';
  const curso = queryParams.get('curso') || 'Formación Holística';
  const fecha = queryParams.get('fecha') || '';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f8f6', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px 30px', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '2px solid #2C4A3E' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛡️</div>
        <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Certificado Acreditado Oficialmente
        </span>
        <h2 style={{ color: '#2C4A3E', marginTop: '18px', fontSize: '22px', fontWeight: 'bold' }}>
          Escuela de Terapias Holísticas D.M.F
        </h2>
        <div style={{ height: '1px', backgroundColor: '#e0e0e0', margin: '20px 0' }}></div>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>Se confirma la autenticidad del documento otorgado a:</p>
        <h3 style={{ color: '#1a237e', fontSize: '24px', margin: '12px 0', fontWeight: 'bold' }}>
          {alumno}
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>por haber completado exitosamente la formación en:</p>
        <h4 style={{ color: '#1B3026', fontSize: '19px', textTransform: 'uppercase', margin: '12px 0', fontWeight: 'bold' }}>
          {curso}
        </h4>
        {fecha && (
          <p style={{ color: '#555', fontSize: '13px', marginTop: '10px' }}>
            📅 <strong>Fecha de emisión:</strong> {fecha.split('-').reverse().join('/')}
          </p>
        )}
        <div style={{ marginTop: '25px', padding: '14px', backgroundColor: '#f8fdfa', borderRadius: '10px', fontSize: '12px', color: '#2C4A3E', border: '1px solid #c8e6c9' }}>
          ✓ Formación avalada y expedida por <strong>Diego Martín</strong> (Terapeuta Holístico).
        </div>
        <a 
          href="/" 
          style={{ display: 'inline-block', marginTop: '20px', color: '#2C4A3E', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Volver a la Escuela de Terapias
        </a>
      </div>
    </div>
  );
}