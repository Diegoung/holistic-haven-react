import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const AdminPanel = () => {
  const [perfiles, setPerfiles] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [compras, setCompras] = useState<any[]>([]);
  const [emailBuscado, setEmailBuscado] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');

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

      {/* 2. Lista de Usuarios (Muestra Nombre y Correo combinados) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Usuarios Registrados ({perfiles.length})</h3>
        <div className="space-y-4">
          {perfiles.map(user => {
            const nombre = user.nombre || "Sin nombre";
            const correo = user.email || user.correo || "";
            
            return (
              <div key={user.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 pb-2 border-b border-gray-200 gap-1">
                  <span className="text-sm font-bold text-purple-900">
                    👤 {nombre} {correo ? `(${correo})` : ''}
                  </span>
                  <span className="text-xs font-mono text-gray-400 truncate">ID: {user.id}</span>
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
          })}
        </div>
      </div>
    </div>
  );
};