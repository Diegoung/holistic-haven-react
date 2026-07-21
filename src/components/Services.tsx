import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flower, Heart, Sun, Moon, HeartPulse, Star, Ear, Leaf, Eye, 
  CandlestickChart, Hand, Magnet, Home, Brain, Sparkles, Music, MoonIcon, 
  CheckCircle2, Search, ExternalLink, CreditCard, Lock, UserPlus, Info
} from 'lucide-react';
import { supabase } from '../supabaseClient';

interface ServicesProps {
  session?: any;
  onAbrirAuth?: () => void;
}

interface CursoBD {
  id: number;
  titulo: string;
  link_drive: string;
  link_pago?: string;
  precio?: number;
}

export const Services: React.FC<ServicesProps> = ({ session, onAbrirAuth }) => {
  const [compras, setCompras] = useState<number[]>([]);
  const [cursosBD, setCursosBD] = useState<CursoBD[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  const LINK_DEFAULT_MP = "https://www.mercadopago.com.ar"; 

  useEffect(() => {
    cargarDatosSupabase();
  }, [session]);

  const cargarDatosSupabase = async () => {
    try {
      const { data: dataCursos } = await supabase.from('cursos').select('*');
      if (dataCursos) setCursosBD(dataCursos);

      if (session?.user) {
        const { data: dataCompras } = await supabase
          .from('compras')
          .select('curso_id')
          .eq('user_id', session.user.id);

        if (dataCompras) {
          setCompras(dataCompras.map((c) => c.curso_id));
        }
      } else {
        setCompras([]);
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  };

  // 🔗 Lista de cursos con sus links exactos de Mercado Pago
  const servicesList = [
    {
      icon: <Flower className="h-6 w-6 text-purple-600" />,
      title: "Pack holístico 22 cursos",
      precioFijo: 3500,
      linkMercadoPago: "https://mpago.la/1q3yBXq",
      description: (
        <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mt-2">
          <li>✨ Runas</li>
          <li>✨ Velomancia</li>
          <li>✨ Reg. Akáshicos</li>
          <li>✨ Vidas Pasadas</li>
          <li>✨ Limpieza Energ.</li>
          <li>✨ Constelaciones</li>
          <li>✨ Chakras y Aura</li>
          <li>✨ Radiestesia</li>
          <li>✨ Ho'oponopono</li>
          <li>✨ Gemoterapia</li>
          <li>✨ Sanación Ángeles</li>
          <li>✨ Péndulo Hebreo</li>
          <li>✨ Flores de Bach</li>
          <li>✨ Biodescodificación</li>
        </ul>
      )
    },
    { icon: <Heart className="h-6 w-6 text-purple-600" />, title: "Taller aprender a meditar", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1LbCpZn", description: "Técnicas simples para calmar la mente, reducir el estrés y conectar con tu ser." },
    { icon: <Sun className="h-6 w-6 text-purple-600" />, title: "Yoga", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1m6KVs8", description: "Técnicas posturales y respiratorias para equilibrar cuerpo, mente y energía." },
    { icon: <Moon className="h-6 w-6 text-purple-600" />, title: "Barras de access", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1ArdBA7", description: "Libera bloqueos limitantes, relaja la mente y potencia tu bienestar integral." },
    { icon: <Sun className="h-6 w-6 text-purple-600" />, title: "Astrología y Numerología", precioFijo: 5000, linkMercadoPago: "https://mpago.la/19pGEFj", description: "Comprende tu mapa energético, carta natal y propósito de vida." },
    { icon: <Heart className="h-6 w-6 text-purple-600" />, title: "Reiki", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2tH8L2Y", description: "Canalización de energía vital para armonizar tus centros energéticos." },
    { icon: <Flower className="h-6 w-6 text-purple-600" />, title: "Reflexología", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2zeA5gB", description: "Estimulación de zonas reflejas para aliviar tensiones y restaurar el equilibrio." },
    { icon: <Moon className="h-6 w-6 text-purple-600" />, title: "Mesa Radiónica y Radiestesia", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1DsFHU4", description: "Herramientas de diagnóstico e intervención energética a distancia." },
    { icon: <Music className="h-6 w-6 text-purple-600" />, title: "Cuencos Tibetanos y Musicoterapia", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1bZNBFQ", description: "Sanación a través de la frecuencia y vibración sonora sagrada." },
    { icon: <MoonIcon className="h-6 w-6 text-purple-600" />, title: "Tarot Marsella", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1iZ8EHP", description: "Guía arquetípica para obtener claridad espiritual y perspectiva en tu camino." },
    { icon: <Sparkles className="h-6 w-6 text-purple-600" />, title: "Sanación Pránica", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2ah1U7Z", description: "Limpieza y fortalecimiento del campo electromagnético personal." },
    { icon: <Brain className="h-6 w-6 text-purple-600" />, title: "Hipnosis y Regresiones", precioFijo: 5000, linkMercadoPago: "https://mpago.la/13rE4MZ", description: "Acceso a memorias subconscientes para liberar patrones emocionales." },
    { icon: <Home className="h-6 w-6 text-purple-600" />, title: "Feng Shui", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1YYLDtH", description: "Armonización del flujo energético en tus espacios de convivencia y trabajo." },
    { icon: <Magnet className="h-6 w-6 text-purple-600" />, title: "Biomagnetismo", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1oADvtX", description: "Equilibrio del pH corporal y eliminación de cargas disfuncionales." },
    { icon: <Hand className="h-6 w-6 text-purple-600" />, title: "Tapping EFT", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2THH2PU", description: "Liberación emocional mediante estimulación de puntos de acupuntura." },
    { icon: <CandlestickChart className="h-6 w-6 text-purple-600" />, title: "Velomancia", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2dvGCpp", description: "Interpretación del fuego y las ceras para potenciar intenciones sanadoras." },
    { icon: <Eye className="h-6 w-6 text-purple-600" />, title: "Activación Glándula Pineal", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1m6AeRg", description: "Expansión de la percepción intuitiva y elevación de la conciencia." },
    { icon: <Leaf className="h-6 w-6 text-purple-600" />, title: "Medicina China", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2JoXxHt", description: "Fundamentos milenarios para preservar la salud integral y el Qi." },
    { icon: <Moon className="h-6 w-6 text-purple-600" />, title: "Método Yuen", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2krzPyc", description: "Corrección rápida de debilidades energéticas a nivel físico y mental." },
    { icon: <Ear className="h-6 w-6 text-purple-600" />, title: "Auriculoterapia", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1AyFDN3", description: "Estimulación de microsistemas auriculares para el alivio sintomático." },
    { icon: <Star className="h-6 w-6 text-purple-600" />, title: "Cirugía Astral", precioFijo: 5000, linkMercadoPago: "https://mpago.la/1PATZii", description: "Remoción de bloqueos profundos en la anatomía sutil." },
    { icon: <Eye className="h-6 w-6 text-purple-600" />, title: "Parapsicologia", precioFijo: 5000, linkMercadoPago: "https://mpago.la/2C66Zk2", description: "Desarrollo de capacidades extrasensoriales e investigación de la mente." }
  ];

  const filtrados = servicesList.filter(s => 
    s.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section id="servicios" className="py-8 px-4 max-w-7xl mx-auto">
      
      {/* Cartel Informativo */}
      {!session && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700 flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">¿Cómo comprar un curso?</p>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Para realizar la compra y habilitar el acceso al material en Google Drive, primero debés <strong>registrate o iniciar sesión</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onAbrirAuth}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-md flex-shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Registrarme / Ingresar</span>
          </button>
        </div>
      )}

      {/* Buscador */}
      <div className="mb-10 max-w-md mx-auto relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar un curso (ej. Reiki, Tarot, Yoga)..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 border border-purple-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>

      {/* Grilla de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((service, index) => {
          const cursoBD = cursosBD.find(
            (c) => c.titulo.toLowerCase().trim() === service.title.toLowerCase().trim()
          );

          const cursoId = cursoBD ? cursoBD.id : index + 1; 
          const estaComprado = compras.includes(cursoId);
          const linkDrive = cursoBD?.link_drive || "#";
          
          const precioMostrar = service.precioFijo;
          const linkPagoFinal = cursoBD?.link_pago || service.linkMercadoPago || LINK_DEFAULT_MP;

          return (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-2xl border-0 glass-card flex flex-col justify-between ${
                estaComprado ? 'ring-2 ring-emerald-500/80 bg-emerald-50/20' : ''
              }`}
            >
              {estaComprado && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow">
                  <CheckCircle2 className="w-3 h-3" /> Adquirido
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100/80 flex items-center justify-center mb-3 text-purple-700 shadow-inner">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">
                  {service.title}
                </CardTitle>
                <div className="text-slate-600 text-sm leading-relaxed mt-1">
                  {service.description}
                </div>
              </CardHeader>
              
              <CardContent className="pt-4 border-t border-slate-100/80">
                {estaComprado ? (
                  <div>
                    <a
                      href={linkDrive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all text-sm shadow-md hover:shadow-lg"
                    >
                      <span>Acceder al Material</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Inversión</span>
                      <span className="text-lg font-extrabold text-purple-900">
                        ${precioMostrar.toLocaleString('es-AR')} <span className="text-xs font-normal">ARS</span>
                      </span>
                    </div>

                    {session ? (
                      <a
                        href={linkPagoFinal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-xs shadow-md"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Comprar</span>
                      </a>
                    ) : (
                      <button
                        onClick={onAbrirAuth}
                        className="flex items-center gap-1.5 bg-purple-900 hover:bg-purple-950 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-xs shadow-md"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Registrarse para Comprar</span>
                      </button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Services;