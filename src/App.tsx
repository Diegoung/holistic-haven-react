import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Importaciones de los componentes de la Landing Page
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Auth } from './components/Auth';

interface Curso {
  id: string | number;
  titulo: string;
  descripcion: string;
  precio: number;
  link_drive: string;
}

export const MainApp: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [mostrarModalAuth, setMostrarModalAuth] = useState<boolean>(false);
  
  const [nombre, setNombre] = useState<string>('');
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [compras, setCompras] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setMostrarModalAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [session]);

  const cargarDatos = async () => {
    try {
      // 1. Cargar todos los cursos
      const { data: cursosData, error: errorCursos } = await supabase
        .from('cursos')
        .select('*')
        .order('id', { ascending: true });

      if (errorCursos) console.error('Error al cargar cursos:', errorCursos.message);
      if (cursosData) setCursos(cursosData);

      // 2. Si hay sesión, cargar compras y perfil
      if (session?.user) {
        const { data: perfilData } = await supabase
          .from('perfiles')
          .select('nombre')
          .eq('id', session.user.id)
          .single();

        if (perfilData) setNombre(perfilData.nombre);

        const { data: comprasData } = await supabase
          .from('compras')
          .select('curso_id')
          .eq('user_id', session.user.id)
          .eq('estado', 'approved');

        if (comprasData) {
          const listaCompras = comprasData.map((c) => String(c.curso_id).replace(/"/g, '').trim());
          setCompras(listaCompras);
        }
      } else {
        setNombre('');
        setCompras([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMercadoPago = async (curso: Curso) => {
    if (!session?.user) {
      setMostrarModalAuth(true);
      return;
    }

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: curso.titulo,
          price: curso.precio,
          userId: session.user.id,
          courseId: curso.id,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Ocurrió un error al generar el pago. Intentá nuevamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la pasarela de pagos.");
    }
  };

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-holistic-beige text-holistic-dark relative font-sans">
      
      {/* 🔹 NAVBAR INTEGRADO */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1a237e',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>🔮 Escuela Holística DMF</h2>
        <div>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>Hola, <strong>{nombre || 'Alumno'}</strong></span>
              <button 
                onClick={handleCerrarSesion}
                style={{ padding: '8px 14px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setMostrarModalAuth(true)}
              style={{ padding: '10px 18px', backgroundColor: '#009ee3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ingresar / Registrarse
            </button>
          )}
        </div>
      </nav>

      {/* 🔹 HERO */}
      <Hero />

      {/* 🔹 SECCIÓN DE CURSOS Y SERVICIOS DINÁMICA */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#1a237e', fontSize: '32px', marginBottom: '10px' }}>Formaciones y Cursos Holísticos</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Explorá nuestro catálogo de cursos. Adquirí el acceso a cada uno de forma automática.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>Cargando catálogo...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
            {cursos.map((curso) => {
              const estaComprado = compras.includes(String(curso.id));

              return (
                <div 
                  key={curso.id} 
                  style={{ 
                    border: estaComprado ? '2px solid #2e7d32' : '1px solid #e0e0e0', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    backgroundColor: estaComprado ? '#f1f8e9' : '#ffffff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#1a237e', fontSize: '18px' }}>{curso.titulo}</h3>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.4' }}>{curso.descripcion}</p>
                  </div>

                  <div style={{ marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                    {estaComprado ? (
                      <div>
                        <span style={{ fontSize: '12px', color: '#2e7d32', fontWeight: 'bold' }}>✓ Ya tenés este curso</span>
                        <a 
                          href={curso.link_drive} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            marginTop: '8px',
                            padding: '10px',
                            backgroundColor: '#2e7d32',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}
                        >
                          Acceder al Material (Drive) ↗
                        </a>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontWeight: 'bold', fontSize: '20px', margin: '0 0 10px 0', color: '#2e7d32' }}>
                          ${curso.precio} ARS
                        </p>
                        
                        {session ? (
                          <button 
                            onClick={() => handleMercadoPago(curso)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              backgroundColor: '#009ee3',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}
                          >
                            Comprar Curso 💳
                          </button>
                        ) : (
                          <button 
                            onClick={() => setMostrarModalAuth(true)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              backgroundColor: '#1a237e',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '14px'
                            }}
                          >
                            Ingresar para Comprar 🔒
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🔹 RESTO DE LAS SECCIONES */}
      <Testimonials />
      <Gallery />
      <PreguntasFrecuentes />
      <Contact />
      <Footer />

      {/* 🔹 BOTÓN WHATSAPP */}
      <WhatsAppButton />

      {/* 🔹 MODAL DE AUTENTICACIÓN */}
      {mostrarModalAuth && !session && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
            <button 
              onClick={() => setMostrarModalAuth(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg"
            >
              ✕
            </button>
            <Auth />
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

export default App;