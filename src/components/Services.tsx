import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flower, Heart, Sun, Moon, Star, Ear, Leaf, Eye, 
  CandlestickChart, Hand, Magnet, Home, Brain, Sparkles, Music, MoonIcon, 
  CheckCircle2, Search, ExternalLink, CreditCard, Lock, UserPlus, Info, ChevronDown, ChevronUp, Gift
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
  const [mostrarListaPack, setMostrarListaPack] = useState<boolean>(false);

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
          .eq('user_id', session.user.id)
          .eq('estado', 'approved');

        if (dataCompras) {
          setCompras(dataCompras.map((c) => Number(c.curso_id)));
        }
      } else {
        setCompras([]);
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  };

  // 📚 Links exactos para el desplegable del Pack Holístico (22 cursos + regalo)
  const linksPackHolistico = [
    { titulo: "Pendulo hebreo", link: "https://drive.google.com/drive/folders/11qPSJYe26Q26KLkc4Ca4rQtDA03me3Rj" },
    { titulo: "Radiestesia", link: "https://drive.google.com/drive/folders/1A1Q6cwE_gU4On6OkUyyCieNNG2RQJFC5" },
    { titulo: "Biodescodificacion", link: "https://drive.google.com/drive/folders/14HFFAGggn8GCGcevguLfCyAhAJpHQ6FQ" },
    { titulo: "Chakras y aura", link: "https://drive.google.com/drive/folders/19RKt9wif1UUmejPpO1JAt4mrIHB5Vyt3" },
    { titulo: "Hoponopono", link: "https://drive.google.com/drive/folders/19H2OWgqm4xZTsL2Ls3SxlvhVeckX0ouo" },
    { titulo: "Flores de Bach", link: "https://drive.google.com/drive/folders/1A-2jX4bcdvO8KkC6Cy0lyRlb-bUB9An2" },
    { titulo: "Sanación árbol genealógico", link: "https://drive.google.com/drive/folders/19Qh8yloSECFFhZkS_KEQLIqY5RqKW4u9" },
    { titulo: "Sanación niño interior", link: "https://drive.google.com/drive/folders/19JQoaeNjmblabPRMbd6mgQisFBubGob1" },
    { titulo: "Sanación linaje femenino y rito del útero", link: "https://drive.google.com/drive/folders/19wU0zkTgs1-EazAXMcq-QWF6CH86su7c" },
    { titulo: "Sanación con ángeles", link: "https://drive.google.com/drive/folders/19vliliO_51xjtt8JR-rsRJJ7YfJ9lfGD" },
    { titulo: "Magia wicca", link: "https://drive.google.com/drive/folders/19VgXBuIOYBotS-jiDtWu8yLiq_pACQBE" },
    { titulo: "Sanación popular", link: "https://drive.google.com/drive/folders/19F6PsBIlf75FHng-YntOimI8LYKyTp4g" },
    { titulo: "Limpieza energética", link: "https://drive.google.com/drive/folders/19SmfGYSLv0rYIjR-8w7ik0my7HHc058M" },
    { titulo: "Gemoterapia", link: "https://drive.google.com/drive/folders/19Earq10AczmdFuNNTdlOCyYx_M_f-rtz" },
    { titulo: "Rocíos auricos y sahumos", link: "https://drive.google.com/drive/folders/1A33zQCDti8LRYl7OY8COa0Opq56Ul4AM" },
    { titulo: "Cortes de cordones energéticos", link: "https://drive.google.com/drive/folders/1A-FycNtAsuCd5n30RBNNFhiAWm0jIbRy" },
    { titulo: "Runas", link: "https://drive.google.com/drive/folders/19sOOHPbMrIqEcYyYFw_wHE3LL3wIoV-j" },
    { titulo: "Magia e interpretación con velas", link: "https://drive.google.com/drive/folders/19n9orshqd7SG0Ad3MzofkibDOdXXG3FW" },
    { titulo: "Registros akashicos", link: "https://drive.google.com/drive/folders/14Glh5lQ2LtXi_ppQEvlHzf57iCMXLrc3" },
    { titulo: "Ayurveda", link: "https://drive.google.com/drive/folders/14CMJGg0BTK-ZLbcZqGd1vpBPKsS7qac4" },
    { titulo: "Constelaciones familiares", link: "https://drive.google.com/drive/folders/163_eHVuMcVheZlEX-V7S0r6Css9pVaUs" },
    { titulo: "Vidas pasadas Kharma y Dharma", link: "https://drive.google.com/drive/folders/19c7sQcZJfxNSCs6LOKh5GHg5ahXJt9Yf" },
    { titulo: "DE REGALO: 78 LIBROS EN PDF", link: "https://drive.google.com/drive/folders/1jM8hOwePh4EIZOVXXIvYfDcsLtOAbMKv" }
  ];

  const servicesList = [
    {
      icon: <Flower className="h-6 w-6 text-purple-600" />,
      title: "Pack holístico 22 cursos",
      precioFijo: 3500,
      linkMercadoPago: "https://mpago.la/1q3yBXq",
      esPack: true,
      description: (
        <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mt-2">
          <li>✨ Péndulo Hebreo</li>
          <li>✨ Radiestesia</li>
          <li>✨ Biodescodificación</li>
          <li>✨ Chakras y Aura</li>
          <li>✨ Ho'oponopono</li>
          <li>✨ Flores de Bach</li>
          <li>✨ Árbol Genealógico</li>
          <li>✨ Niño Interior</li>
          <li>✨ Linaje Femenino</li>
          <li>✨ Sanación Ángeles</li>
          <li>✨ Magia Wicca</li>
          <li>✨ Limpieza Energética</li>
          <li>✨ Gemoterapia</li>
          <li>🎁 + 78 Libros PDF</li>
        </ul>
      )
    },
    { 
      icon: <Heart className="h-6 w-6 text-purple-600" />, 
      title: "Taller aprender a meditar", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1LbCpZn", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1O1H5-MqV2LcmcMcpYfAmUf0ENkLIV83n?usp=drive_link",
      description: "Técnicas simples para calmar la mente, reducir el estrés y conectar con tu ser." 
    },
    { 
      icon: <Sun className="h-6 w-6 text-purple-600" />, 
      title: "Yoga", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1m6KVs8", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1F4rkztkPyyM_x6yYcOC1TsWWttwDqTDb?usp=drive_link",
      description: "Técnicas posturales y respiratorias para equilibrar cuerpo, mente y energía." 
    },
    { 
      icon: <Moon className="h-6 w-6 text-purple-600" />, 
      title: "Barras de access", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1ArdBA7", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1XaIvZ0Opzlfgng1rFwCngO4i4eUOcvhq?usp=sharing",
      description: "Libera bloqueos limitantes, relaja la mente y potencia tu bienestar integral." 
    },
    { 
      icon: <Sun className="h-6 w-6 text-purple-600" />, 
      title: "Astrología y Numerología", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/19pGEFj", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1r3_Z-N6jInHSr86SOAPPejpPB1ZlX0Hk?usp=drive_link",
      description: "Comprende tu mapa energético, carta natal y propósito de vida." 
    },
    { 
      icon: <Heart className="h-6 w-6 text-purple-600" />, 
      title: "Reiki", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2tH8L2Y", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/18zzzeE8mQYvq35RSlS2zmsbhiKtJZicm?usp=drive_link",
      description: "Canalización de energía vital para armonizar tus centros energéticos." 
    },
    { 
      icon: <Flower className="h-6 w-6 text-purple-600" />, 
      title: "Reflexología", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2zeA5gB", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/19n0e1x04jEioAch9Grzf7JGKjNJsPmnr?usp=drive_link",
      description: "Estimulación de zonas reflejas para aliviar tensiones y restaurar el equilibrio." 
    },
    { 
      icon: <Moon className="h-6 w-6 text-purple-600" />, 
      title: "Mesa Radiónica y Radiestesia", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1DsFHU4", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1n8HzZdNR9YH_6vQuYY4Vc3Op7OVRVSu2?usp=sharing",
      description: "Herramientas de diagnóstico e intervención energética a distancia." 
    },
    { 
      icon: <Music className="h-6 w-6 text-purple-600" />, 
      title: "Cuencos Tibetanos y Musicoterapia", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1bZNBFQ", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1_0fCTAd_WQhQQ7iQq58YD4Wu_ob8NKTT?usp=drive_link",
      description: "Sanación a través de la frecuencia y vibración sonora sagrada." 
    },
    { 
      icon: <MoonIcon className="h-6 w-6 text-purple-600" />, 
      title: "Tarot Marsella", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1iZ8EHP", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jZLfTCYuzDXJIs_4_wM_5_t_BsSS8J7u?usp=sharing",
      description: "Guía arquetípica para obtener claridad espiritual y perspectiva en tu camino." 
    },
    { 
      icon: <Sparkles className="h-6 w-6 text-purple-600" />, 
      title: "Sanación Pránica", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2ah1U7Z", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/12OQ8pS9FjE6sbrM30TtOegiIly4jYSVl?usp=sharing",
      description: "Limpieza y fortalecimiento del campo electromagnético personal." 
    },
    { 
      icon: <Brain className="h-6 w-6 text-purple-600" />, 
      title: "Hipnosis y Regresiones", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/13rE4MZ", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1La_aCBPE70DfgWnsJXlX42FngZSw3g-G?usp=sharing",
      description: "Acceso a memorias subconscientes para liberar patrones emocionales." 
    },
    { 
      icon: <Home className="h-6 w-6 text-purple-600" />, 
      title: "Feng Shui", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1YYLDtH", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jPMvf0vPOtAtGbR5s0osTw6DUq4fgJuP?usp=sharing",
      description: "Armonización del flujo energético en tus espacios de convivencia y trabajo." 
    },
    { 
      icon: <Magnet className="h-6 w-6 text-purple-600" />, 
      title: "Biomagnetismo", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1oADvtX", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/194prwvnqY1_QA12B8taG-eZBot79HlGd?usp=drive_link",
      description: "Equilibrio del pH corporal y eliminación de cargas disfuncionales." 
    },
    { 
      icon: <Hand className="h-6 w-6 text-purple-600" />, 
      title: "Tapping EFT", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2THH2PU", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/14g7t5G5RJthE-3e6jyJNKQjCPECmBpPc?usp=drive_link",
      description: "Liberación emocional mediante estimulación de puntos de acupuntura." 
    },
    { 
      icon: <CandlestickChart className="h-6 w-6 text-purple-600" />, 
      title: "Velomancia", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2dvGCpp", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1j3BUOMaYborzfxt02u4exm7PARaCJEoG?usp=drive_link",
      description: "Interpretación del fuego y las ceras para potenciar intenciones sanadoras." 
    },
    { 
      icon: <Eye className="h-6 w-6 text-purple-600" />, 
      title: "Activación Glándula Pineal", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1m6AeRg", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1cgj6E8nEquj-ffmX38R0lbYjMw9drE01?usp=drive_link",
      description: "Expansión de la percepción intuitiva y elevación de la conciencia." 
    },
    { 
      icon: <Leaf className="h-6 w-6 text-purple-600" />, 
      title: "Medicina China", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2JoXxHt", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1rBEu100G6RY28KWxT00QPdB35yzG1KCl",
      description: "Fundamentos milenarios para preservar la salud integral y el Qi." 
    },
    { 
      icon: <Moon className="h-6 w-6 text-purple-600" />, 
      title: "Método Yuen", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2krzPyc", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1TdjrV-b_Wkwh1cT9jreBC-w82L2DmzGC?usp=sharing",
      description: "Corrección rápida de debilidades energéticas a nivel físico y mental." 
    },
    { 
      icon: <Ear className="h-6 w-6 text-purple-600" />, 
      title: "Auriculoterapia", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1AyFDN3", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/19zopDYZEWjchRFK5ULM3MloMHWhmaKkI?usp=drive_link",
      description: "Estimulación de microsistemas auriculares para el alivio sintomático." 
    },
    { 
      icon: <Star className="h-6 w-6 text-purple-600" />, 
      title: "Cirugía Astral", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/1PATZii", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/17aJ7QNbN8XzcIJtha-isVbkBR4AIXlIX?usp=sharing",
      description: "Remoción de bloqueos profundos en la anatomía sutil." 
    },
    { 
      icon: <Eye className="h-6 w-6 text-purple-600" />, 
      title: "Parapsicologia", 
      precioFijo: 5000, 
      linkMercadoPago: "https://mpago.la/2C66Zk2", 
      linkDriveDirecto: "https://drive.google.com/drive/folders/1-OmDz_SjPAJ2zk-jTQRP4Doa3RoJ_UBZ?usp=drive_link",
      description: "Desarrollo de capacidades extrasensoriales e investigación de la mente." 
    }
  ];

  const filtrados = servicesList.filter(s => 
    s.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section id="servicios" className="py-8 px-4 max-w-7xl mx-auto">
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((service, index) => {
          const cursoBD = cursosBD.find(
            (c) => c.titulo.toLowerCase().trim() === service.title.toLowerCase().trim()
          );

          const cursoId = cursoBD ? cursoBD.id : index + 1; 
          const estaComprado = compras.includes(cursoId);
          
          // Prioriza el link directo que pasaste o busca en Supabase como respaldo
          const linkDrive = service.linkDriveDirecto || cursoBD?.link_drive || "#";
          
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
                    {service.esPack ? (
                      <div>
                        <button
                          onClick={() => setMostrarListaPack(!mostrarListaPack)}
                          className="w-full flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all text-sm shadow-md"
                        >
                          <span>Ver los 23 Accesos (Pack + Regalo)</span>
                          {mostrarListaPack ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {mostrarListaPack && (
                          <div className="mt-3 max-h-64 overflow-y-auto space-y-1.5 pr-1 bg-white/90 p-2 rounded-xl border border-emerald-200 shadow-inner">
                            {linksPackHolistico.map((item, i) => (
                              <a
                                key={i}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-between text-xs font-medium p-2 rounded-lg transition-all ${
                                  i === linksPackHolistico.length - 1
                                    ? 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 font-bold'
                                    : 'text-slate-700 hover:text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/80'
                                }`}
                              >
                                <span className="flex items-center gap-1.5 truncate">
                                  {i === linksPackHolistico.length - 1 ? <Gift className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" /> : null}
                                  <span>{i + 1}. {item.titulo}</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 ml-2" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={linkDrive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all text-sm shadow-md hover:shadow-lg"
                      >
                        <span>Acceder al Material</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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