import React, { useState } from 'react';
import { toPng } from 'html-to-image';

interface Props {
  curso: { id: string | number; titulo: string };
  nombreAlumno: string;
  onCerrar: () => void;
}

export const CertificadoModal: React.FC<Props> = ({
  curso,
  nombreAlumno,
  onCerrar,
}) => {
  const [nombre, setNombre] = useState(nombreAlumno);
  const [fecha, setFecha] = useState('');
  const [terapiaPack, setTerapiaPack] = useState('');
  const [descargando, setDescargando] = useState(false);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const esPack = curso.titulo.toLowerCase().includes('pack');

  const opcionesPack = [
    'Cuencos Tibetanos y Musicoterapia',
    'Tarot Marsella',
    'Yoga',
    'Barras de Access',
    'Astrología y Numerología',
    'Reiki',
    'Reflexología',
    'Mesa Radiónica y Radiestesia',
    'Sanación Pránica',
    'Hipnosis y Regresiones',
    'Feng Shui',
    'Biomagnetismo',
    'Tapping EFT',
    'Velomancia',
    'Activación Glándula Pineal',
    'Medicina China',
    'Método Yuen',
    'Auriculoterapia',
    'Cirugía Astral',
    'Parapsicología',
    'Taller aprender a meditar',
    'Registros Akáshicos',
  ];

  const handleDescargarImagen = async () => {
    const node = document.getElementById('printable-certificate');
    if (!node) return;

    try {
      setDescargando(true);
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
      });

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
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Soluciona el corte superior permitiendo scroll vertical limpio
        padding: '20px 10px',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '14px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          margin: 'auto', // Centrado automático fluido
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* CABECERA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#2C4A3E',
            }}
          >
            Generador de Certificado
          </span>

          <button
            onClick={onCerrar}
            style={{
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* CONTROLES */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '10px',
            backgroundColor: '#f4f6f5',
            padding: '8px',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            {/* NOMBRE */}
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del alumno"
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px',
                boxSizing: 'border-box',
              }}
            />

            {/* FECHA */}
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* SELECTOR PACK */}
          {esPack && (
            <button
              type="button"
              onClick={() => setMostrarSelector(true)}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid #2C4A3E',
                backgroundColor: '#2C4A3E',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {terapiaPack ? `Terapia: ${terapiaPack}` : '🔍 Seleccionar Terapia del Pack'}
              </span>
              <span>▼</span>
            </button>
          )}
        </div>

        {/* MODAL SELECTOR DE TERAPIAS */}
        {mostrarSelector && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000000,
              padding: '15px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '400px',
                maxHeight: '75vh',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 5px 25px rgba(0,0,0,0.4)',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '6px',
                }}
              >
                <h3 style={{ margin: 0, color: '#2C4A3E', fontSize: '13px' }}>
                  Seleccione la Terapia
                </h3>
                <button
                  onClick={() => setMostrarSelector(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '15px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  overflowY: 'auto',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {opcionesPack.map((t) => (
                  <div
                    key={t}
                    onClick={() => {
                      setTerapiaPack(t);
                      setMostrarSelector(false);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor: terapiaPack === t ? '#e8f5e9' : '#fafafa',
                      border: terapiaPack === t ? '1px solid #2e7d32' : '1px solid #eee',
                      fontSize: '12px',
                      color: '#333',
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENEDOR VISUALIZADOR DEL CERTIFICADO */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
            margin: '4px 0',
          }}
        >
          <div
            id="printable-certificate"
            style={{
              border: '3px solid #2C4A3E',
              padding: '10px 14px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              backgroundImage: 'url(/terapiasholisticas1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '410px',
            }}
          >
            {/* TITULO */}
            <h1
              style={{
                fontSize: '12px',
                color: '#2C4A3E',
                margin: '2px 0',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
              }}
            >
              CERTIFICADO DE PARTICIPACIÓN
            </h1>

            {/* OTORGA */}
            <p
              style={{
                fontStyle: 'italic',
                color: '#555',
                margin: '2px 0',
                fontSize: '9px',
              }}
            >
              Se otorga a:
            </p>

            {/* NOMBRE */}
            <h2
              style={{
                borderBottom: '2px solid #2C4A3E',
                display: 'inline-block',
                width: '80%',
                margin: '4px 0',
                fontSize: '13px',
                color: '#1a237e',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
                wordBreak: 'break-word',
              }}
            >
              {nombre || 'Nombre del Alumno'}
            </h2>

            {/* CURSO */}
            <p
              style={{
                fontStyle: 'italic',
                color: '#555',
                margin: '2px 0',
                fontSize: '9px',
              }}
            >
              Por haber completado el curso de:
            </p>

            {/* NOMBRE TERAPIA */}
            <h3
              style={{
                color: '#2e7d32',
                fontSize: '11px',
                textTransform: 'uppercase',
                margin: '4px 0',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
                wordBreak: 'break-word',
              }}
            >
              {esPack ? terapiaPack || 'Seleccione una terapia' : curso.titulo}
            </h3>

            {/* FECHA */}
            <p
              style={{
                marginTop: '6px',
                marginBottom: '2px',
                fontSize: '9px',
                color: '#333',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
              }}
            >
              Fecha: {fecha ? fecha.split('-').reverse().join('/') : 'DD/MM/AAAA'}
            </p>
          </div>
        </div>

        {/* BOTON DESCARGA */}
        <button
          onClick={handleDescargarImagen}
          disabled={descargando}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#2C4A3E',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: descargando ? 'default' : 'pointer',
            opacity: descargando ? 0.7 : 1,
            fontSize: '12px',
            marginTop: '6px',
          }}
        >
          {descargando ? 'Generando certificado...' : 'Descargar Certificado 📥'}
        </button>
      </div>
    </div>
  );
};