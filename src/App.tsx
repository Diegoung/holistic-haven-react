import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import imagenCertificado from './assets/certificado.jpg';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import { EspacioHolistico } from './components/EspacioHolistico';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Auth } from './components/Auth';
import { AdminPanel } from './components/AdminPanel';
import { PortalTerapeuta } from './components/PortalTerapeuta';
import PruebaPackHolistico from './components/PruebaPackHolistico'; // 👈 Importado correctamente

// Componente de Promoción del Portal del Terapeuta con enlaces directos a WhatsApp
const PromocionPortalTerapeuta: React.FC = () => {
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
            ✨ Software Profesional Exclusivo para Terapeutas y Sanadores
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
          <h3 style={{ color: '#2C4A3E', fontSize: '26px', margin: 0 }}>Planes de Acceso y Valores por País</h3>
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

export const MainApp: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [mostrarModalAuth, setMostrarModalAuth] = useState<boolean>(false);

  const [cursoSeleccionadoCert, setCursoSeleccionadoCert] = useState<any>(null);
  const [nombreAlumnoCert, setNombreAlumnoCert] = useState<string>('');
  const [fechaCert, setFechaCert] = useState<string>('');
  const [mostrarCertificadoVista, setMostrarCertificadoVista] = useState<boolean>(false);

  // Estados para controlar si el usuario logueado es terapeuta activo
  const [esTerapeutaActivo, setEsTerapeutaActivo] = useState<boolean>(false);

  const listaCursosPack = [
    "Pendulo hebreo",
    "Radiestesia",
    "Biodescodificacion",
    "Chakras y aura",
    "Hoponopono",
    "Flores de Bach",
    "Sanación árbol genealógico",
    "Sanación niño interior",
    "Sanación linaje femenino y rito del útero",
    "Sanación con ángeles",
    "Magia wicca",
    "Sanación popular",
    "Limpieza energética",
    "Gemoterapia",
    "Rocíos auricos y sahumos",
    "Cortes de cordones energéticos",
    "Runas",
    "Magia e interpretación con velas",
    "Registros akashicos",
    "Ayurveda",
    "Constelaciones familiares",
    "Vidas pasadas Kharma y Dharma"
  ];

  const [terapiaElegidaPack, setTerapiaElegidaPack] = useState<string>(listaCursosPack[0]);
  const ADMIN_EMAIL = "diego56@admin.com"; 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        cargarPerfil(session.user.id);
        verificarPermisosTerapeuta(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setMostrarModalAuth(false);
        cargarPerfil(session.user.id);
        verificarPermisosTerapeuta(session.user.id);
      } else {
        setEsTerapeutaActivo(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const cargarPerfil = async (userId: string) => {
    const { data } = await supabase
      .from('perfiles')
      .select('nombre')
      .eq('id', userId)
      .single();
    if (data?.nombre) {
      setNombreAlumnoCert(data.nombre);
    }
  };

  const verificarPermisosTerapeuta = async (userId: string) => {
    try {
      const { data: perfil, error } = await supabase
        .from('perfiles')
        .select('rol, suscripcion_hasta')
        .eq('id', userId)
        .single();

      if (error || !perfil) {
        setEsTerapeutaActivo(false);
        return;
      }

      const esRolTerapeuta = perfil.rol === 'terapeuta';
      let suscripcionVigente = false;

      if (perfil.suscripcion_hasta) {
        const hoy = new Date();
        const vencimiento = new Date(perfil.suscripcion_hasta);
        suscripcionVigente = vencimiento >= hoy;
      }

      setEsTerapeutaActivo(esRolTerapeuta && suscripcionVigente);
    } catch (err) {
      console.error('Error al verificar permisos de terapeuta:', err);
      setEsTerapeutaActivo(false);
    }
  };

  const abrirCertificado = (curso: any) => {
    setCursoSeleccionadoCert(curso);
    const nombreCurso = curso?.titulo || curso?.name || curso?.nombre || curso?.title || '';
    if (nombreCurso.toLowerCase().includes('pack')) {
      setTerapiaElegidaPack(listaCursosPack[0]);
    }
    setMostrarCertificadoVista(true);
  };

  const tituloCursoActual = cursoSeleccionadoCert 
    ? (cursoSeleccionadoCert.titulo || cursoSeleccionadoCert.name || cursoSeleccionadoCert.nombre || cursoSeleccionadoCert.title || '') 
    : '';
  const esPackHolistico = tituloCursoActual.toLowerCase().includes('pack');

  return (
    <div className="min-h-screen bg-holistic-beige text-holistic-dark relative">
      
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
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
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            z-index: 999999 !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
        }
      `}</style>

      <Navbar session={session} onAbrirAuth={() => setMostrarModalAuth(true)} />
      <Hero />
      
      {/* 🔹 Sección de Promoción y Precios del Portal del Terapeuta debajo de la imagen principal */}
      <PromocionPortalTerapeuta />

      {/* 🌿 Si el usuario logueado es terapeuta activo, mostramos su Portal del Terapeuta */}
      {session && esTerapeutaActivo && (
        <div className="my-12 p-6 bg-white border-2 border-green-300 rounded-3xl max-w-6xl mx-auto shadow-lg">
          <div className="text-center mb-6 border-b pb-4">
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">✨ Beneficio Exclusivo: Portal del Terapeuta Activo</span>
          </div>
          <PortalTerapeuta />
        </div>
      )}

      <Services session={session} onAbrirAuth={() => setMostrarModalAuth(true)} onAbrirCertificado={abrirCertificado} />
      <Testimonials />
      <EspacioHolistico />
      <PreguntasFrecuentes />
      <Contact />

      {session?.user?.email === ADMIN_EMAIL && (
        <div className="my-12 p-6 bg-purple-50 border-2 border-purple-300 rounded-3xl max-w-5xl mx-auto shadow-lg">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-xl font-bold text-purple-900">🛡️ Panel de Control Exclusivo (Admin)</h2>
            <span className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">Sesión Activa</span>
          </div>
          <AdminPanel />
        </div>
      )}

      <Footer />
      <WhatsAppButton />

      {mostrarModalAuth && !session && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
            <button onClick={() => setMostrarModalAuth(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg">✕</button>
            <Auth />
          </div>
        </div>
      )}

      {mostrarCertificadoVista && cursoSeleccionadoCert && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: 1000, overflowY: 'auto', padding: '30px 15px', boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', maxWidth: '950px', width: '100%', margin: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#2C4A3E', textAlign: 'center', marginBottom: '15px', fontFamily: 'Arial, sans-serif' }}>Configurar tu Certificado Profesional</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: esPackHolistico ? '1fr 1fr 1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px', backgroundColor: '#f4f6f5', padding: '15px', borderRadius: '8px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px', color: '#333' }}>Nombre y Apellido:</label>
                <input type="text" value={nombreAlumnoCert} onChange={(e) => setNombreAlumnoCert(e.target.value)} placeholder="Tu nombre completo" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px', color: '#333' }}>Fecha de finalización:</label>
                <input type="date" value={fechaCert} onChange={(e) => setFechaCert(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {esPackHolistico && (
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '12px', color: '#2C4A3E' }}>Seleccionar Terapia del Pack:</label>
                  <select value={terapiaElegidaPack} onChange={(e) => setTerapiaElegidaPack(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #2C4A3E', backgroundColor: '#fff', fontWeight: 'bold', boxSizing: 'border-box' }}>
                    {listaCursosPack.map((terapia, idx) => (
                      <option key={idx} value={terapia}>{terapia}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div id="printable-certificate" style={{ width: '100%', maxWidth: '900px', aspectRatio: '1.414 / 1', position: 'relative', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', overflow: 'hidden', boxSizing: 'border-box', backgroundColor: '#fff' }}>
              <img src={imagenCertificado} alt="Fondo Certificado" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />

              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', padding: '30px 40px 20px 32%', boxSizing: 'border-box', fontFamily: 'Georgia, serif' }}>
                
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '3px', color: '#444', margin: '0 0 3px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>ESCUELA DE TERAPIAS HOLÍSTICAS D.M.F</p>
                  <h2 style={{ color: '#1B3026', fontSize: '22px', margin: '0 0 8px 0', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>CERTIFICADO DE PARTICIPACIÓN</h2>
                  <p style={{ fontStyle: 'italic', color: '#555', fontSize: '12px', margin: 0 }}>Se le otorga a:</p>
                </div>

                <div style={{ width: '100%' }}>
                  <h1 style={{ borderBottom: '2px solid #2C4A3E', color: '#1a237e', margin: '0 auto 8px auto', fontSize: '26px', fontWeight: 'bold', paddingBottom: '2px', width: '80%', fontFamily: 'Arial, sans-serif' }}>
                    {nombreAlumnoCert || 'Nombre del Estudiante'}
                  </h1>

                  <p style={{ color: '#555', fontSize: '12px', margin: '0 0 5px 0', fontStyle: 'italic' }}>El cual ha completado satisfactoriamente el curso intensivo de:</p>
                  
                  <h3 style={{ color: '#1B3026', fontSize: '21px', margin: '0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                    {esPackHolistico ? terapiaElegidaPack : tituloCursoActual}
                  </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', width: '100%', fontSize: '11px', color: '#333', margin: '5px 0' }}>
                  <div style={{ textAlign: 'center' }}>
                    <strong style={{ display: 'block', color: '#2C4A3E', fontSize: '10px', marginBottom: '2px' }}>📅 FECHA DE FINALIZACIÓN</strong>
                    {fechaCert ? fechaCert.split('-').reverse().join('/') : 'DD/MM/AAAA'}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <strong style={{ display: 'block', color: '#2C4A3E', fontSize: '10px', marginBottom: '2px' }}>⏱️ DURACIÓN DEL CURSO</strong>
                    Curso Intensivo
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <strong style={{ display: 'block', color: '#2C4A3E', fontSize: '10px', marginBottom: '2px' }}>📜 MODALIDAD</strong>
                    Formación Integral
                  </div>
                </div>

                <div style={{ width: '100%', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 2px 0', fontFamily: 'Brush Script MT, cursive, serif', fontSize: '22px', color: '#1B3026' }}>Diego Martin</p>
                  <div style={{ width: '130px', height: '1px', backgroundColor: '#2C4A3E', margin: '0 auto 3px auto' }}></div>
                  <p style={{ margin: '0', fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diego Martin • Terapeuta con 10 años de experiencia en terapias holísticas</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '9px', color: '#555', borderTop: '1px solid rgba(44,74,62,0.2)', paddingTop: '6px' }}>
                  <span>🌐 www.terapiasholisticasdmf.com</span>
                  <span>🇦🇷 Formación con propósito, para una vida más consciente.</span>
                </div>

              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', backgroundColor: '#2C4A3E', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>Descargar Certificado 📥</button>
              <button onClick={() => setMostrarCertificadoVista(false)} style={{ padding: '12px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar ❌</button>
            </div>

            <p style={{ fontSize: '11px', color: '#d9534f', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
              ⚠️ <em>Para una mejor experiencia visual y un resultado óptimo, se recomienda realizar la descarga directamente desde una PC o Notebook.</em>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/prueba" element={<PruebaPackHolistico />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;