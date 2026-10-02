import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CONFIG_TERAPIAS: Record<string, { campoEspecifico: string; placeholder: string }> = {
  "Péndulo Hebreo": { campoEspecifico: "Etiquetas / Miasmas detectados", placeholder: "Ej: Campo electromagnético, magia ritual, miasma Psórico..." },
  "Radiestesia": { campoEspecifico: "Gráficos / Porcentajes de Vitalidad", placeholder: "Ej: Nivel Bovis inicial, gráfico de chakras..." },
  "Biodescodificación": { campoEspecifico: "Conflicto Biológico / Sintagma", placeholder: "Ej: Sentido biológico del síntoma, frase sanadora..." },
  "Chakras y aura": { campoEspecifico: "Estado de Vórtices Energéticos", placeholder: "Ej: Bloqueo en plexo solar, fuga en aura áurica..." },
  "Hoponopono": { campoEspecifico: "Memorias / Creencias a limpiar", placeholder: "Ej: 'Lo siento, perdóname, te amo, gracias' enfocado en..." },
  "Flores de Bach": { campoEspecifico: "Fórmula Floral Personalizada", placeholder: "Ej: Mimulus, Impatiens, Walnut (Frasco de 30ml)..." },
  "Sanación árbol genealógico": { campoEspecifico: "Transgeneracional / Yacente", placeholder: "Ej: Repetición de patrón con el abuelo paterno..." },
  "Sanación niño interior": { campoEspecifico: "Herida detectada / Edad", placeholder: "Ej: Herida de abandono aprox. a los 7 años..." },
  "Sanación linaje femenino y rito del útero": { campoEspecifico: "Memorias del útero / Ancestras", placeholder: "Ej: Sanación de la línea materna, corte de lazos..." },
  "Sanación con ángeles": { campoEspecifico: "Arcángel / Mensaje recibido", placeholder: "Ej: Arcángel Rafael - Mensaje de sanación física..." },
  "Magia wicca": { campoEspecifico: "Correspondencias / Intención", placeholder: "Ej: Fase lunar, hierbas e inciensos utilizados..." },
  "Sanación popular": { campoEspecifico: "Rezo / Práctica tradicional", placeholder: "Ej: Ojeo, limpieza con ruda y alcanfor..." },
  "Limpieza energética": { campoEspecifico: "Densidad removida / Elementos", placeholder: "Ej: Sahumo de copal, descarga en altar..." },
  "Gemoterapia": { campoEspecifico: "Piedras / Cristales asignados", placeholder: "Ej: Cuarzo cristal, Amatista en tercer ojo..." },
  "Rocíos auricos y sahumos": { campoEspecifico: "Esencias y resinas utilizadas", placeholder: "Ej: Rocío de rosas y palo santo..." },
  "Cortes de cordones energéticos": { campoEspecifico: "Vínculo / Persona involucrada", placeholder: "Ej: Corte de lazo con ex pareja / ex socio..." },
  "Runas": { campoEspecifico: "Tirada / Runas seleccionadas", placeholder: "Ej: Tirada de 3 runas: Ansuz, Raidho, Fehu..." },
  "Magia e interpretación con velas": { campoEspecifico: "Lectura de Cera / Llama", placeholder: "Ej: Vela abrecaminos, lágrimas de cera hacia la izquierda..." },
  "Registros akashicos": { campoEspecifico: "Preguntas y Respuestas del Canal", placeholder: "Ej: Pregunta sobre misión de vida y respuesta de los Maestros..." },
  "Ayurveda": { campoEspecifico: "Biotipo (Dosha dominante)", placeholder: "Ej: Vata desequilibrado, Pitta en exceso..." },
  "Constelaciones familiares": { campoEspecifico: "Representantes / Dinámica oculta", placeholder: "Ej: Exclusión en el sistema familiar de..." },
  "Vidas pasadas Kharma y Dharma": { campoEspecifico: "Escena / Época kármica", placeholder: "Ej: Vínculo kármico en Europa s.XVIII..." },
  "Taller aprender a meditar": { campoEspecifico: "Técnica de respiración / Foco", placeholder: "Ej: Meditación mindfulness, anclaje en la respiración..." },
  "Yoga": { campoEspecifico: "Asanas / Pranayamas trabajados", placeholder: "Ej: Serie de posturas para apertura de cadera..." },
  "Barras de access": { campoEspecifico: "Puntos activados", placeholder: "Ej: Barras de control, dinero y banda de implantes..." },
  "Astrología y Numerología": { campoEspecifico: "Tránsitos / Sendero natal", placeholder: "Ej: Retorno de Saturno, número de destino 7..." },
  "Reiki": { campoEspecifico: "Símbolos aplicados / Sintonización", placeholder: "Ej: Cho Ku Rei y Sei He Ki en zona dorsal..." },
  "Reflexología": { campoEspecifico: "Zonas reflejas tratadas", placeholder: "Ej: Zona de columna vertebral y plexo solar en pie izquierdo..." },
  "Mesa Radiónica y Radiestesia": { campoEspecifico: "Comandos / Gráficos en mesa", placeholder: "Ej: Mesa de armonización vincular..." },
  "Cuencos Tibetanos y Musicoterapia": { campoEspecifico: "Frecuencias / Chakras resonados", placeholder: "Ej: Cuenco de cuarzo 432 Hz en chakra corazón..." },
  "Tarot Marsella": { campoEspecifico: "Arcanos de la Tirada", placeholder: "Ej: El Loco, La Rueda de la Fortuna, El Mundo..." },
  "Sanación Pránica": { campoEspecifico: "Prana / Limpieza de centros", placeholder: "Ej: Barrido de prana sucio en chakra bazo..." },
  "Hipnosis y Regresiones": { campoEspecifico: "Anclaje / Estado de trance", placeholder: "Ej: Regresión a escena de infancia segura..." },
  "Feng Shui": { campoEspecifico: "Sectores / Cura aplicada", placeholder: "Ej: Cura de sal y agua en sector norte del hogar..." },
  "Biomagnetismo": { campoEspecifico: "Pares Biomagnéticos colocados", placeholder: "Ej: Timo - Páncreas, Pineal - Bulbo..." },
  "Tapping EFT": { campoEspecifico: "Frase de configuración / Puntos", placeholder: "Ej: 'Aunque tengo este miedo...' (Puntos de karate, ceja, bajo ojo)..." },
  "Velomancia": { campoEspecifico: "Propósito / Tipo de velón", placeholder: "Ej: Velón blanco de sanación y corte..." },
  "Activación Glándula Pineal": { campoEspecifico: "Frecuencia / Visualización", placeholder: "Ej: Activación con geometría sagrada e iluminación..." },
  "Medicina China": { campoEspecifico: "Meridianos / Elemento afectado", placeholder: "Ej: Exceso de fuego en meridiano de corazón..." },
  "Método Yuen": { campoEspecifico: "Debilidades borradas (Fuerte/Débil)", placeholder: "Ej: Borrar debilidades en la línea media y sistema nervioso..." },
  "Auriculoterapia": { campoEspecifico: "Puntos auriculares estimulados", placeholder: "Ej: Shen Men, Punto endocrino, Ansiedad..." },
  "Cirugía Astral": { campoEspecifico: "Zona intervenida en el doble etérico", placeholder: "Ej: Limpieza y sellado en campo áurico posterior..." },
  "Parapsicología": { campoEspecifico: "Fenómeno / Análisis perceptivo", placeholder: "Ej: Percepción extrasensorial, psicoquinesis..." }
};

const LISTA_TERAPIAS = Object.keys(CONFIG_TERAPIAS);

export const PortalTerapeuta = () => {
  const [vistaActiva, setVistaActiva] = useState<'agenda' | 'disponibilidad' | 'pacientes'>('agenda');
  
  const [userId, setUserId] = useState<string | null>(null);
  const [nombreTerapeuta, setNombreTerapeuta] = useState<string>('Terapeuta');
  const [nombreNegocio, setNombreNegocio] = useState<string>('Espacio Holístico');
  const [suscripcionHasta, setSuscripcionHasta] = useState<string | null>(null);

  const [citas, setCitas] = useState<any[]>([]);
  const [horariosTrabajo, setHorariosTrabajo] = useState<any[]>([]);
  const [pacientes, setPacientes] = useState<any[]>([]);

  const [nuevoHorario, setNuevoHorario] = useState({ dia: 'Lunes', horaInicio: '09:00', horaFin: '18:00' });
  const [nuevaCita, setNuevaCita] = useState({ paciente: '', telefono: '', fecha: '', hora: '', tipo: LISTA_TERAPIAS[0] });
  const [nuevoPaciente, setNuevoPaciente] = useState({ nombre: '', telefono: '', terapiaPrincipal: LISTA_TERAPIAS[0], datoEspecifico: '', notasGenerales: '' });

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    cargarDatosTerapeuta();
  }, []);

  const cargarDatosTerapeuta = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const currentUserId = session.user.id;
    setUserId(currentUserId);

    // 1. Cargar perfil (Nombre y suscripción)
    const { data: perfilData } = await supabase
      .from('perfiles')
      .select('nombre, suscripcion_hasta')
      .eq('id', currentUserId)
      .single();
    
    if (perfilData) {
      if (perfilData.nombre) {
        setNombreTerapeuta(perfilData.nombre);
        setNombreNegocio(`Espacio de ${perfilData.nombre}`);
      }
      if (perfilData.suscripcion_hasta) {
        setSuscripcionHasta(perfilData.suscripcion_hasta);
      }
    }

    // 2. Cargar Citas / Turnos del Terapeuta
    const { data: citasData } = await supabase
      .from('turnos_terapeuta')
      .select('*')
      .eq('user_id', currentUserId);
    if (citasData) setCitas(citasData);

    // 3. Cargar Horarios de Trabajo
    const { data: horariosData } = await supabase
      .from('horarios_terapeuta')
      .select('*')
      .eq('user_id', currentUserId);
    if (horariosData) setHorariosTrabajo(horariosData);

    // 4. Cargar Pacientes
    const { data: pacientesData } = await supabase
      .from('pacientes_terapeuta')
      .select('*')
      .eq('user_id', currentUserId);
    if (pacientesData) setPacientes(pacientesData);
  };

  const agendarCita = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaCita.paciente || !nuevaCita.fecha || !nuevaCita.hora || !userId) return;

    const { data, error } = await supabase
      .from('turnos_terapeuta')
      .insert([{ user_id: userId, ...nuevaCita, estado: 'Confirmado' }])
      .select();

    if (error) {
      alert("❌ Error al agendar turno: " + error.message);
    } else if (data) {
      setCitas([...citas, data[0]]);
      setNuevaCita({ paciente: '', telefono: '', fecha: '', hora: '', tipo: LISTA_TERAPIAS[0] });
    }
  };

  const eliminarCita = async (id: number) => {
    if (!window.confirm('¿Deseas eliminar este turno de la agenda?')) return;

    const { error } = await supabase
      .from('turnos_terapeuta')
      .delete()
      .eq('id', id);

    if (error) {
      alert("❌ Error al eliminar turno: " + error.message);
    } else {
      setCitas(citas.filter(c => c.id !== id));
    }
  };

  const enviarWhatsAppTurno = (cita: any) => {
    const telefonoLimpio = cita.telefono.replace(/\D/g, ''); 
    const mensaje = `Hola *${cita.paciente}*! Te escribo de *${nombreNegocio}* (Terapeuta: ${nombreTerapeuta}) para recordarte tu turno de *${cita.tipo}* programado para el día *${cita.fecha}* a las *${cita.hora} hs*. ¡Te esperamos! ✨`;
    const url = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const agregarHorarioTrabajo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoHorario.dia || !userId) return;

    const { data, error } = await supabase
      .from('horarios_terapeuta')
      .insert([{ user_id: userId, ...nuevoHorario, activo: true }])
      .select();

    if (error) {
      alert("❌ Error al guardar horario: " + error.message);
    } else if (data) {
      setHorariosTrabajo([...horariosTrabajo, data[0]]);
      setNuevoHorario({ dia: 'Lunes', horaInicio: '09:00', horaFin: '18:00' });
    }
  };

  const eliminarHorarioTrabajo = async (id: number) => {
    const { error } = await supabase
      .from('horarios_terapeuta')
      .delete()
      .eq('id', id);

    if (error) {
      alert("❌ Error al eliminar horario: " + error.message);
    } else {
      setHorariosTrabajo(horariosTrabajo.filter(h => h.id !== id));
    }
  };

  const agregarPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoPaciente.nombre || !userId) return;

    const objetoPaciente = {
      user_id: userId,
      nombre: nuevoPaciente.nombre,
      telefono: nuevoPaciente.telefono,
      terapia_principal: nuevoPaciente.terapiaPrincipal,
      dato_especifico: nuevoPaciente.datoEspecifico,
      notas_generales: nuevoPaciente.notasGenerales
    };

    const { data, error } = await supabase
      .from('pacientes_terapeuta')
      .insert([objetoPaciente])
      .select();

    if (error) {
      alert("❌ Error al guardar paciente: " + error.message);
    } else if (data) {
      setPacientes([...pacientes, data[0]]);
      setNuevoPaciente({ nombre: '', telefono: '', terapiaPrincipal: LISTA_TERAPIAS[0], datoEspecifico: '', notasGenerales: '' });
    }
  };

  const eliminarPaciente = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar la ficha de este paciente?')) return;

    const { error } = await supabase
      .from('pacientes_terapeuta')
      .delete()
      .eq('id', id);

    if (error) {
      alert("❌ Error al eliminar paciente: " + error.message);
    } else {
      setPacientes(pacientes.filter(p => p.id !== id));
    }
  };

  const configActual = CONFIG_TERAPIAS[nuevoPaciente.terapiaPrincipal] || {
    campoEspecifico: "Detalles específicos de la sesión",
    placeholder: "Escribe los parámetros de la terapia..."
  };

  const horasPosiblesDelDia = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const citasDelDiaSeleccionado = citas.filter(c => c.fecha === fechaSeleccionada);

  const agendarEnFranja = (hora: string) => {
    setNuevaCita({ ...nuevaCita, fecha: fechaSeleccionada, hora: hora });
    setVistaActiva('agenda');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '20px', marginBottom: '20px' }}>
        
        {suscripcionHasta && (
          <div style={{
            marginBottom: '15px',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid',
            backgroundColor: new Date(suscripcionHasta) < new Date() ? '#fde8e8' : '#e8f8f5',
            borderColor: new Date(suscripcionHasta) < new Date() ? '#f8b4b4' : '#a3e4d7',
            color: new Date(suscripcionHasta) < new Date() ? '#c53030' : '#117a65',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '13px'
          }}>
            <span>
              {new Date(suscripcionHasta) < new Date()
                ? '⚠️ Tu acceso al Portal del Terapeuta ha caducado.'
                : '✨ Tu acceso al Portal del Terapeuta está activo hasta:'}
            </span>
            <strong style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              {new Date(suscripcionHasta).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </strong>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <span style={{ background: '#e8f8f5', color: '#27ae60', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              ✨ Terapeuta: {nombreTerapeuta}
            </span>
            <h1 style={{ color: '#2C4A3E', margin: '8px 0 5px 0' }}>🌿 Portal Profesional de {nombreTerapeuta}</h1>
            <p style={{ color: '#666', margin: 0 }}>Gestiona tus turnos, disponibilidad de horarios y fichas clínicas.</p>
          </div>

          <div style={{ background: '#f4f6f5', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
              🏷️️ Nombre de tu Espacio / Marca:
            </label>
            <input 
              type="text" 
              value={nombreNegocio} 
              onChange={e => setNombreNegocio(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', fontWeight: 'bold', color: '#2C4A3E' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setVistaActiva('agenda')}
            style={{
              padding: '10px 20px',
              backgroundColor: vistaActiva === 'agenda' ? '#2C4A3E' : '#ecf0f1',
              color: vistaActiva === 'agenda' ? '#fff' : '#333',
              border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            📅 Mi Agenda ({citas.length})
          </button>
          <button 
            onClick={() => setVistaActiva('disponibilidad')}
            style={{
              padding: '10px 20px',
              backgroundColor: vistaActiva === 'disponibilidad' ? '#2C4A3E' : '#ecf0f1',
              color: vistaActiva === 'disponibilidad' ? '#fff' : '#333',
              border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            🗓️ Días y Calendario de Turnos
          </button>
          <button 
            onClick={() => setVistaActiva('pacientes')}
            style={{
              padding: '10px 20px',
              backgroundColor: vistaActiva === 'pacientes' ? '#2C4A3E' : '#ecf0f1',
              color: vistaActiva === 'pacientes' ? '#fff' : '#333',
              border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            📂 Pacientes ({pacientes.length})
          </button>
        </div>
      </header>

      {/* VISTA 1: AGENDA GENERAL */}
      {vistaActiva === 'agenda' && (
        <section>
          <h2>Agenda de Turnos con Recordatorio por WhatsApp</h2>
          <form onSubmit={agendarCita} style={{ background: '#f4f6f5', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input 
              type="text" placeholder="Nombre del paciente" 
              value={nuevaCita.paciente} onChange={e => setNuevaCita({ ...nuevaCita, paciente: e.target.value })}
              style={{ padding: '10px', flex: '1.5', minWidth: '180px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="text" placeholder="Tel/WhatsApp (Ej: 549341...)" 
              value={nuevaCita.telefono} onChange={e => setNuevaCita({ ...nuevaCita, telefono: e.target.value })}
              style={{ padding: '10px', flex: '1', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <select 
              value={nuevaCita.tipo} onChange={e => setNuevaCita({ ...nuevaCita, tipo: e.target.value })}
              style={{ padding: '10px', flex: '1.5', minWidth: '200px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}
            >
              {LISTA_TERAPIAS.map((terapia, index) => (
                <option key={index} value={terapia}>{terapia}</option>
              ))}
            </select>
            <input 
              type="date" value={nuevaCita.fecha} onChange={e => setNuevaCita({ ...nuevaCita, fecha: e.target.value })}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="time" value={nuevaCita.hora} onChange={e => setNuevaCita({ ...nuevaCita, hora: e.target.value })}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ background: '#2C4A3E', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Agendar Turno 📅
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {citas.map(cita => (
              <div key={cita.id} style={{ background: '#fff', border: '1px solid #ddd', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: '#2C4A3E' }}>{cita.paciente}</strong> ➔ <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{cita.tipo}</span>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>📅 Fecha: {cita.fecha} a las {cita.hora} hs | 📞 {cita.telefono || 'Sin teléfono'}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {cita.telefono && (
                    <button 
                      onClick={() => enviarWhatsAppTurno(cita)}
                      style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      💬 Enviar WhatsApp
                    </button>
                  )}
                  <button 
                    onClick={() => eliminarCita(cita.id)}
                    style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 10px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VISTA 2: DÍAS, HORARIOS Y CALENDARIO INTERACTIVO DE TURNOS */}
      {vistaActiva === 'disponibilidad' && (
        <section>
          <h2>Configuración de Días y Horarios Laborales</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Establece tus jornadas de atención para organizarte mejor.</p>

          <form onSubmit={agregarHorarioTrabajo} style={{ background: '#f4f6f5', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select 
              value={nuevoHorario.dia} onChange={e => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', fontWeight: 'bold' }}
            >
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos', 'Lunes a Viernes'].map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '13px', color: '#333' }}>De:</span>
              <input 
                type="time" value={nuevoHorario.horaInicio} onChange={e => setNuevoHorario({ ...nuevoHorario, horaInicio: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '13px', color: '#333' }}>A:</span>
              <input 
                type="time" value={nuevoHorario.horaFin} onChange={e => setNuevoHorario({ ...nuevoHorario, horaFin: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ background: '#2C4A3E', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Agregar Franja ➕
            </button>
          </form>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {horariosTrabajo.map(horario => (
              <div key={horario.id} style={{ background: '#eef2f1', border: '1px solid #bdc3c7', padding: '10px 15px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div>
                  <strong>{horario.dia}</strong>
                  <div style={{ fontSize: '12px', color: '#555' }}>⏰ {horario.hora_inicio || horario.horaInicio} a {horario.hora_fin || horario.horaFin} hs</div>
                </div>
                <button 
                  onClick={() => eliminarHorarioTrabajo(horario.id)}
                  style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <hr style={{ border: '0', borderTop: '2px solid #eaeaea', margin: '25px 0' }}/>

          {/* Calendario Detallado */}
          <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#2C4A3E' }}>🗓️ Calendario Detallado de Turnos</h3>
              <div>
                <label style={{ marginRight: '10px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Ver Día:</label>
                <input 
                  type="date" value={fechaSeleccionada} onChange={e => setFechaSeleccionada(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 'bold', color: '#2C4A3E' }}
                />
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>
              Turnos asignados y franjas horarias para el día: <strong>{fechaSeleccionada}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {horasPosiblesDelDia.map((hora, index) => {
                const citaEnEstaHora = citasDelDiaSeleccionado.find(c => c.hora && c.hora.startsWith(hora.substring(0, 2)));
                const estaOcupado = Boolean(citaEnEstaHora);

                return (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 18px',
                    borderRadius: '6px',
                    border: '1px solid',
                    backgroundColor: estaOcupado ? '#fef9e7' : '#f4fcf7',
                    borderColor: estaOcupado ? '#f9e79f' : '#a3e4d7'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{hora} hs</span>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        backgroundColor: estaOcupado ? '#f1c40f' : '#27ae60',
                        color: '#fff'
                      }}>
                        {estaOcupado ? 'OCUPADO' : 'DISPONIBLE'}
                      </span>
                    </div>

                    <div>
                      {estaOcupado ? (
                        <div style={{ fontSize: '14px', color: '#2C4A3E', textAlign: 'right' }}>
                          <strong>{citaEnEstaHora?.paciente}</strong> ➔ <em>{citaEnEstaHora?.tipo}</em> ({citaEnEstaHora?.telefono || 'Sin tel'})
                        </div>
                      ) : (
                        <button 
                          onClick={() => agendarEnFranja(hora)}
                          style={{ background: '#2C4A3E', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                          + Agendar en este horario
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* VISTA 3: GESTIÓN DE PACIENTES */}
      {vistaActiva === 'pacientes' && (
        <section>
          <h2>Historias Clínicas y Gestión de Pacientes</h2>
          <form onSubmit={agregarPaciente} style={{ background: '#f4f6f5', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input 
                type="text" placeholder="Nombre y Apellido del Paciente" 
                value={nuevoPaciente.nombre} onChange={e => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
                style={{ padding: '10px', flex: '2', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input 
                type="text" placeholder="Teléfono / WhatsApp" 
                value={nuevoPaciente.telefono} onChange={e => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
                style={{ padding: '10px', flex: '1', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <select 
                value={nuevoPaciente.terapiaPrincipal} onChange={e => setNuevoPaciente({ ...nuevoPaciente, terapiaPrincipal: e.target.value, datoEspecifico: '' })}
                style={{ padding: '10px', flex: '1.5', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', fontWeight: 'bold', color: '#2C4A3E' }}
              >
                {LISTA_TERAPIAS.map((terapia, index) => (
                  <option key={index} value={terapia}>Terapia: {terapia}</option>
                ))}
              </select>
            </div>

            <div style={{ background: '#eef2f1', padding: '12px', borderRadius: '6px', border: '1px dashed #2C4A3E' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#2C4A3E', marginBottom: '5px' }}>
                ✨ Parámetro específico para {nuevoPaciente.terapiaPrincipal}: <em>({configActual.campoEspecifico})</em>
              </label>
              <input 
                type="text" placeholder={configActual.placeholder} 
                value={nuevoPaciente.datoEspecifico} onChange={e => setNuevoPaciente({ ...nuevoPaciente, datoEspecifico: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                📝 Notas Generales y Evolución del Consultante:
              </label>
              <textarea 
                placeholder="Panorama general, observaciones emocionales o pautas para la próxima sesión..." 
                value={nuevoPaciente.notasGenerales} onChange={e => setNuevoPaciente({ ...nuevoPaciente, notasGenerales: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', minHeight: '80px', boxSizing: 'border-box' }}
              />
            </div>

            <button type="submit" style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-end' }}>
              Guardar Nuevo Paciente ➕
            </button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {pacientes.map(paciente => (
              <div key={paciente.id} style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2C4A3E' }}>{paciente.nombre}</h3>
                  <button 
                    onClick={() => eliminarPaciente(paciente.id)}
                    title="Eliminar paciente"
                    style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#555' }}>📞 <strong>Tel:</strong> {paciente.telefono || 'No especificado'}</p>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#27ae60' }}>✨ <strong>Disciplina:</strong> {paciente.terapia_principal || paciente.terapiaPrincipal}</p>
                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }}/>
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#333' }}>🎯 <strong>Específico:</strong> {paciente.dato_especifico || paciente.datoEspecifico || 'Sin registrar'}</p>
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#333' }}>📝 <strong>Panorama / Evolución:</strong> {paciente.notas_generales || paciente.notasGenerales || 'Sin notas'}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};