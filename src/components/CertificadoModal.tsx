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
        alignItems: 'flex-start',
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
          margin: 'auto',
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
              padding: '12px 16px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              backgroundImage: 'url(/terapiasholisticas1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '430px',
              position: 'relative',
            }}
          >
            {/* ENCABEZADO INSTITUCIONAL */}
            <p
              style={{
                fontSize: '8px',
                letterSpacing: '1.5px',
                color: '#2C4A3E',
                fontWeight: 'bold',
                margin: '0 0 2px 0',
                textTransform: 'uppercase',
              }}
            >
              Escuela de Terapias Holísticas D.M.F
            </p>

            {/* TITULO */}
            <h1
              style={{
                fontSize: '13px',
                color: '#2C4A3E',
                margin: '2px 0',
                fontWeight: 'bold',
                letterSpacing: '1px',
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
                margin: '3px 0 1px 0',
                fontSize: '9px',
              }}
            >
              Se otorga a:
            </p>

            {/* NOMBRE */}
            <h2
              style={{
                borderBottom: '1.5px solid #1a237e',
                display: 'inline-block',
                width: '75%',
                margin: '2px 0 4px 0',
                fontSize: '14px',
                color: '#1a237e',
                fontWeight: 'bold',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
                wordBreak: 'break-word',
                paddingBottom: '2px',
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
              El cual ha completado satisfactoriamente el curso intensivo de:
            </p>

            {/* NOMBRE TERAPIA */}
            <h3
              style={{
                color: '#111',
                fontSize: '11px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: '3px 0 8px 0',
                letterSpacing: '1px',
                textShadow: '0px 1px 2px rgba(255,255,255,0.9)',
                wordBreak: 'break-word',
              }}
            >
              {esPack ? terapiaPack || 'SELEACCIONE UNA TERAPIA' : curso?.titulo}
            </h3>

            {/* DETALLES DEL CURSO Y FECHA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '8px 0 10px 0',
                fontSize: '8px',
                color: '#333',
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold', display: 'block' }}>📅 FECHA</span>
                {fecha ? fecha.split('-').reverse().join('/') : 'DD/MM/AAAA'}
              </div>
              <div>
                <span style={{ fontWeight: 'bold', display: 'block' }}>🎓 DURACIÓN</span>
                Curso Intensivo
              </div>
              <div>
                <span style={{ fontWeight: 'bold', display: 'block' }}>📜 MODALIDAD</span>
                Formación Integral
              </div>
            </div>

            {/* SECCIÓN FIRMA Y CÓDIGO QR DE VERIFICACIÓN */}
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 15px',
              }}
            >
              {/* CÓDIGO QR DINÁMICO */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    'https://www.terapiasholisticasdmf.com/verificar?alumno=' + 
                    (nombre || '') + 
                    '&curso=' + 
                    (esPack ? terapiaPack || '' : curso?.titulo || '') + 
                    '&fecha=' + 
                    (fecha || '')
                  )}`}
                  alt="QR Verificación"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: '#fff',
                    padding: '2px',
                    border: '1px solid #1a237e',
                    borderRadius: '4px',
                  }}
                />
                <span style={{ fontSize: '6px', color: '#333', marginTop: '2px', fontWeight: 'bold' }}>
                  ESCANEE PARA VERIFICAR
                </span>
              </div>

              {/* SECCIÓN FIRMA DE PUÑO Y LETRA */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginLeft: '10px',
                }}
              >
                {/* IMAGEN DE LA FIRMA DIGITALIZADA */}
                <img
                  src="/firma-diego.png"
                  alt="Firma Diego Martín"
                  style={{
                    height: '42px',
                    objectFit: 'contain',
                    marginBottom: '-5px',
                    pointerEvents: 'none',
                  }}
                />

                {/* ACLARACIÓN DE LA FIRMA */}
                <p
                  style={{
                    fontSize: '7px',
                    color: '#333',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    margin: 0,
                    borderTop: '1px solid #777',
                    paddingTop: '2px',
                    width: '90%',
                    textAlign: 'center',
                  }}
                >
                  Diego Martin • Terapeuta con 10 años de experiencia en Terapias Holísticas
                </p>
              </div>
            </div>
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

        {/* NOTA PARA CELULARES */}
        <p style={{ fontSize: '11px', color: '#d9534f', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
          ⚠️ <em>Para una mejor experiencia visual y un resultado óptimo, se recomienda realizar la descarga directamente desde una PC o Notebook.</em>
        </p>
      </div>
    </div>
  );
};