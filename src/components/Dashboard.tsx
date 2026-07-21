import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Props {
  session: any;
  onAbrirAuth: () => void;
}

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  link_drive: string;
}

export const Dashboard: React.FC<Props> = ({ session, onAbrirAuth }) => {
  const [nombre, setNombre] = useState<string>('');
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [compras, setCompras] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔗 Tu link general de cobro de Mercado Pago
  const LINK_MERCADO_PAGO = "https://www.mercadopago.com.ar"; 

  useEffect(() => {
    cargarDatos();
  }, [session]);

  const cargarDatos = async () => {
    try {
      // 1. Cargar todos los cursos (Público)
      const { data: cursosData, error: errorCursos } = await supabase
        .from('cursos')
        .select('*')
        .order('id', { ascending: true });

      if (errorCursos) console.error('Error al cargar cursos:', errorCursos.message);
      if (cursosData) setCursos(cursosData);

      // 2. Si el usuario inició sesión, cargamos sus compras y nombre
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
          .eq('user_id', session.user.id);

        if (comprasData) {
          setCompras(comprasData.map((c) => c.curso_id));
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

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando catálogo...</p>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🔹 BARRA SUPERIOR (NAVBAR) */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1a237e',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>🔮 Academia de Terapias Holísticas</h2>
        
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
              onClick={onAbrirAuth}
              style={{ padding: '10px 18px', backgroundColor: '#009ee3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ingresar / Registrarse
            </button>
          )}
        </div>
      </nav>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1a237e' }}>Formaciones y Cursos Holísticos</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Explorá nuestro catálogo de cursos. Adquirí el acceso a cada uno de forma individual por $3.500 ARS.
          </p>
        </div>

        {/* 📦 GRILLA DE CURSOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {cursos.map((curso) => {
            const estaComprado = compras.includes(curso.id);

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
                        <a 
                          href={LINK_MERCADO_PAGO} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            padding: '10px',
                            backgroundColor: '#009ee3',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}
                        >
                          Comprar Curso 💳
                        </a>
                      ) : (
                        <button 
                          onClick={onAbrirAuth}
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
      </div>
    </div>
  );
};