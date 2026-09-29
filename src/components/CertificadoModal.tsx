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
      console.error(
        'Error al generar la imagen del certificado:',
        err
      );

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
        padding: '15px',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '12px 18px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: 'calc(100vh - 30px)',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* CABECERA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '7px',
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
              width: '24px',
              height: '24px',
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
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '8px',
            backgroundColor: '#f4f6f5',
            padding: '7px',
            borderRadius: '8px',
            alignItems: 'center',
          }}
        >
          {/* NOMBRE */}
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del alumno"
            style={{
              flex: 1,
              minWidth: '130px',
              padding: '5px 8px',
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
              padding: '5px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '12px',
              boxSizing: 'border-box',
            }}
          />

          {/* SELECTOR PACK */}
          {esPack && (
            <button
              type="button"
              onClick={() => setMostrarSelector(true)}
              style={{
                flex: 1,
                minWidth: '100%',
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
                {terapiaPack
                  ? `Terapia: ${terapiaPack}`
                  : '🔍 Seleccionar Terapia del Pack'}
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
                maxWidth: '420px',
                maxHeight: '80vh',
                borderRadius: '10px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 5px 25px rgba(0,0,0,0.4)',
                boxSizing: 'border-box',
              }}
            >
              {/* CABECERA SELECTOR */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '8px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: '#2C4A3E',
                    fontSize: '14px',
                  }}
                >
                  Seleccione la Terapia
                </h3>

                <button
                  onClick={() => setMostrarSelector(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* LISTA */}
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
                      padding: '8px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor:
                        terapiaPack === t ? '#e8f5e9' : '#fafafa',
                      border:
                        terapiaPack === t
                          ? '1px solid #2e7d32'
                          : '1px solid #eee',
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

        {/* CERTIFICADO */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '3px 0',
            overflow: 'hidden',
          }}
        >
          <div
            id="printable-certificate"
            style={{
              border: '3px solid #2C4A3E',
              padding: '8px 14px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              backgroundImage: 'url(/terapiasholisticas1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              width: '430px',
              maxWidth: '100%',
              flexShrink: 0,
            }}
          >
            {/* TITULO */}
            <h1
              style={{
                fontSize: '13px',
                color: '#2C4A3E',
                margin: '2px 0',
                textShadow:
                  '0px 1px 2px rgba(255,255,255,0.9)',
              }}
            >
              CERTIFICADO DE PARTICIPACIÓN
            </h1>

            {/* OTORGA */}
            <p
              style={{
                fontStyle: 'italic',
                color: '#555',
                margin: '1px 0',
                fontSize: '10px',
              }}
            >
              Se otorga a:
            </p>

            {/* NOMBRE */}
            <h2
              style={{
                borderBottom: '2px solid #2C4A3E',
                display: 'inline-block',
                width: '75%',
                margin: '3px 0',
                fontSize: '14px',
                color: '#1a237e',
                textShadow:
                  '0px 1px 2px rgba(255,255,255,0.9)',
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
                margin: '1px 0',
                fontSize: '10px',
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
                margin: '3px 0',
                textShadow:
                  '0px 1px 2px rgba(255,255,255,0.9)',
                wordBreak: 'break-word',
              }}
            >
              {esPack
                ? terapiaPack || 'Seleccione una terapia'
                : curso.titulo}
            </h3>

            {/* FECHA */}
            <p
              style={{
                marginTop: '5px',
                marginBottom: '2px',
                fontSize: '10px',
                color: '#333',
                textShadow:
                  '0px 1px 2px rgba(255,255,255,0.9)',
              }}
            >
              Fecha:{' '}
              {fecha
                ? fecha.split('-').reverse().join('/')
                : 'DD/MM/AAAA'}
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
            marginTop: '5px',
          }}
        >
          {descargando
            ? 'Generando certificado...'
            : 'Descargar Certificado 📥'}
        </button>
      </div>
    </div>
  );
};