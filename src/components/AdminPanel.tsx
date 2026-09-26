import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const AdminPanel = () => {
  const [perfiles, setPerfiles] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [compras, setCompras] = useState<any[]>([]);
  const [emailBuscado, setEmailBuscado] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  
  // Estado para el buscador de alumnos
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const { data: dataPerfiles } = await supabase.from('perfiles').select('*');
    const { data: dataCursos } = await supabase.from('cursos').select('*');
    const { data: dataCompras } = await supabase.from('compras').select('*');
    
    setPerfiles(dataPerfiles || []);
    setCursos(dataCursos || []);
    setCompras(dataCompras || []);
  };

  const toggleAcceso = async (userId: string, cursoId: string, nombreCurso: string, yaTiene: boolean) => {
    if (yaTiene) {
      const { error } = await supabase
        .from('compras')
        .delete()
        .eq('user_id', userId)
        .eq('curso_id', cursoId);

      if (error) {
        alert("❌ Error al quitar acceso: " + error.message);
      } else {
        alert(`🗑️ Acceso a "${nombreCurso}" revocado.`);
        cargarDatos();
      }
    } else {
      const { error } = await supabase.from('compras').insert([
        { user_id: userId, curso_id: cursoId, estado: 'approved' }
      ]);

      if (error) {
        alert("❌ Error al dar acceso: " + error.message);
      } else {
        alert(`✅ ¡Acceso a "${nombreCurso}" concedido con éxito!`);
        cargarDatos();
      }
    }
  };

  const tieneAcceso = (userId: string, cursoId: any) => {
    return compras.some(c => c.user_id === userId && String(c.curso_id) === String(cursoId));
  };

  // Función para eliminar el usuario por completo (Auth + Base de Datos)
  const borrarUsuario = async (userId: string, nombreUsuario: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar a "${nombreUsuario}"? Podrá volver a registrarse si lo desea.`)) return;

    try {
      const { error } = await supabase.rpc('borrar_usuario_admin', {
        user_id_to_delete: userId
      });

      if (error) throw error;

      alert('¡Usuario eliminado con éxito! Ya puede volver a registrarse.');
      cargarDatos(); // Recarga los datos para actualizar la lista
    } catch (error: any) {
      console.error('Error al eliminar:', error.message);
      alert('Hubo un error al eliminar el usuario: ' + error.message);
    }
  };

  // Filtrar alumnos por Nombre, Correo o ID
  const perfilesFiltrados = perfiles.filter(user => {
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return true;

    const nombre = (user.nombre || '').toLowerCase();
    const correo = (user.email || user.correo || '').toLowerCase();
    const id = (user.id || '').toLowerCase();

    return nombre.includes(termino) || correo.includes(termino) || id.includes(termino);
  });

  return (
    <div className="space-y-6">
      {/* 1. Formulario Rápido */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Otorgar Acceso Rápido por ID</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input 
            type="text" 
            placeholder="ID del usuario" 
            value={emailBuscado}
            onChange={(e) => setEmailBuscado(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select 
            value={cursoSeleccionado} 
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Selecciona un curso...</option>
            {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
          </select>
          <button 
            onClick={() => toggleAcceso(emailBuscado, cursoSeleccionado, "Curso seleccionado", false)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
          >
            Dar Acceso
          </button>
        </div>
      </div>

      {/* 2. Lista de Usuarios y Buscador */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-purple-900">
            Usuarios Registrados ({perfilesFiltrados.length} {busqueda && `de ${perfiles.length}`})
          </h3>

          {/* Campo de Búsqueda */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50/30"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs px-1"
              >
                ✖
              </button>
            )}
          </div>
        </div>

        {/* Lista filtrada */}
        <div className="space-y-4">
          {perfilesFiltrados.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-6">
              No se encontraron usuarios que coincidan con "{busqueda}".
            </p>
          ) : (
            perfilesFiltrados.map(user => {
              const nombre = user.nombre || "Sin nombre";
              const correo = user.email || user.correo || "";
              
              return (
                <div key={user.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 pb-2 border-b border-gray-200 gap-2">
                    <div>
                      <span className="text-sm font-bold text-purple-900 block">
                        👤 {nombre} {correo ? `(${correo})` : ''}
                      </span>
                      <span className="text-xs font-mono text-gray-400 truncate">ID: {user.id}</span>
                    </div>

                    {/* Botón para eliminar usuario */}
                    <button
                      onClick={() => borrarUsuario(user.id, nombre)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 self-start sm:self-auto"
                      title="Eliminar usuario del sistema para que pueda volver a registrarse"
                    >
                      🗑️ Eliminar Usuario
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cursos.map(curso => {
                      const yaTiene = tieneAcceso(user.id, curso.id);
                      return (
                        <button 
                          key={curso.id}
                          onClick={() => toggleAcceso(user.id, curso.id, curso.titulo, yaTiene)}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                            yaTiene 
                              ? 'bg-green-100 hover:bg-red-100 text-green-800 hover:text-red-800 border border-green-300 hover:border-red-300' 
                              : 'bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-200'
                          }`}
                          title={yaTiene ? "Huésped con acceso. Clic para quitar" : "Clic para dar acceso"}
                        >
                          {yaTiene ? '✓' : '+'} {curso.titulo}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};