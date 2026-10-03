import React from 'react';

export const PromocionTerapeuta: React.FC = () => {
  const telefonoWhatsApp = "5493413375533";

  const generarUrlWhatsApp = (pais: string) => {
    const mensaje = `Hola! Me interesa contratar el Portal del Terapeuta para ${pais}. ¿Me brindan más información y los medios de pago? ✨`;
    return `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#f4f8f6', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        
        {/* Cabecera explicativa */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span style={{ background: '#e8f8f5', color: '#117a65', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
            ✨ Software Profesional Exclusivo para Terapeutas
          </span>
          <h2 style={{ color: '#2C4A3E', fontSize: '32px', margin: '15px 0 12px 0' }}>
            Lleva tu Consultorio Holístico al Siguiente Nivel con Automatización Total
          </h2>
          <p style={{ fontSize: '16px', color: '#555', maxWidth: '850px', margin: 'auto', lineHeight: '1.6' }}>
            Una plataforma diseñada a medida para organizar tu práctica profesional. Olvídate de las agendas de papel y el desorden administrativo: gestiona turnos de forma inteligente, mantén historias clínicas avanzadas adaptadas a más de 43 disciplinas y comunícate con tus consultantes mediante avisos automáticos por WhatsApp.
          </p>
        </div>

        {/* Características principales */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '50px' }}>
          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e0e8e4', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>📅</div>
            <h3 style={{ color: '#2C4A3E', margin: '0 0 10px 0', fontSize: '18px' }}>Agenda y Calendario Interactivo</h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5', margin: 0 }}>
              Visualiza tus turnos por día u hora, configura tus franjas laborales y mantén un control absoluto de tus espacios disponibles.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e0e8e4', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>💬</div>
            <h3 style={{ color: '#2C4A3E', margin: '0 0 10px 0', fontSize: '18px' }}>Recordatorios Automáticos por WhatsApp</h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5', margin: 0 }}>
              Envía mensajes personalizados directamente al WhatsApp de tus pacientes con un solo clic, incluyendo el nombre de tu espacio y los detalles del turno.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e0e8e4', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>📂</div>
            <h3 style={{ color: '#2C4A3E', margin: '0 0 10px 0', fontSize: '18px' }}>Historias Clínicas por Terapia</h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5', margin: 0 }}>
              Fichas específicas para más de 43 disciplinas (Péndulo Hebreo, Biodescodificación, Reiki, Tarot, etc.) con parámetros únicos de evolución.
            </p>
          </div>
        </div>

        {/* Título de Planes y Valores */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#2C4A3E', fontSize: '26px', margin: 0 }}>Planes de Acceso mensuales y Valores por País</h3>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Elige el tiempo de suscripción y potencia tu consultorio hoy mismo.</p>
        </div>

        {/* Carteles de Precios Multimoneda */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          {/* ARGENTINA */}
          <div style={{ background: '#fff', border: '2px solid #27ae60', borderRadius: '14px', padding: '25px', textAlign: 'center', boxShadow: '0 4px 12px rgba(39, 174, 96, 0.1)' }}>
            <span style={{ fontSize: '32px' }}>🇦🇷</span>
            <h4 style={{ margin: '10px 0 15px 0', color: '#2C4A3E', fontSize: '20px' }}>Argentina</h4>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>1 Mes: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$2.000</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>3 Meses: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$5.500</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>6 Meses: <strong style={{ color: '#27ae60', fontSize: '17px' }}>$11.000</strong></div>
            <a 
              href={generarUrlWhatsApp('Argentina')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none', marginTop: '15px', background: '#2C4A3E', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
            >
              Contratar Plan (Arg)
            </a>
          </div>

          {/* ECUADOR */}
          <div style={{ background: '#fff', border: '2px solid #2980b9', borderRadius: '14px', padding: '25px', textAlign: 'center', boxShadow: '0 4px 12px rgba(41, 128, 185, 0.1)' }}>
            <span style={{ fontSize: '32px' }}>🇪🇨</span>
            <h4 style={{ margin: '10px 0 15px 0', color: '#2C4A3E', fontSize: '20px' }}>Ecuador</h4>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>1 Mes: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$2 USD</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>3 Meses: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$5 USD</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>6 Meses: <strong style={{ color: '#2980b9', fontSize: '17px' }}>$10 USD</strong></div>
            <a 
              href={generarUrlWhatsApp('Ecuador')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none', marginTop: '15px', background: '#2C4A3E', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
            >
              Contratar Plan (Ecu)
            </a>
          </div>

          {/* PERÚ */}
          <div style={{ background: '#fff', border: '2px solid #e67e22', borderRadius: '14px', padding: '25px', textAlign: 'center', boxShadow: '0 4px 12px rgba(230, 126, 34, 0.1)' }}>
            <span style={{ fontSize: '32px' }}>🇵🇪</span>
            <h4 style={{ margin: '10px 0 15px 0', color: '#2C4A3E', fontSize: '20px' }}>Perú</h4>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>1 Mes: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>S/ 76</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>3 Meses: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>S/ 190</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>6 Meses: <strong style={{ color: '#e67e22', fontSize: '17px' }}>S/ 380</strong></div>
            <a 
              href={generarUrlWhatsApp('Perú')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none', marginTop: '15px', background: '#2C4A3E', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
            >
              Contratar Plan (Per)
            </a>
          </div>

          {/* URUGUAY */}
          <div style={{ background: '#fff', border: '2px solid #8e44ad', borderRadius: '14px', padding: '25px', textAlign: 'center', boxShadow: '0 4px 12px rgba(142, 68, 173, 0.1)' }}>
            <span style={{ fontSize: '32px' }}>🇺🇾</span>
            <h4 style={{ margin: '10px 0 15px 0', color: '#2C4A3E', fontSize: '20px' }}>Uruguay</h4>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>1 Mes: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$82 UYU</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>3 Meses: <strong style={{ color: '#2C4A3E', fontSize: '15px' }}>$205 UYU</strong></div>
            <div style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>6 Meses: <strong style={{ color: '#8e44ad', fontSize: '17px' }}>$410 UYU</strong></div>
            <a 
              href={generarUrlWhatsApp('Uruguay')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none', marginTop: '15px', background: '#2C4A3E', color: '#fff', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
            >
              Contratar Plan (Uru)
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PromocionTerapeuta;