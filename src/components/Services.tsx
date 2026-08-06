import React, { useEffect, useState } from 'react';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

import { 
  Flower, 
  Heart, 
  Sun, 
  Moon, 
  Star, 
  Ear, 
  Leaf, 
  Eye,
  CandlestickChart,
  Hand,
  Magnet,
  Home,
  Brain,
  Sparkles,
  MoonIcon,
  Music,
  Search,
  Lock,
  UserPlus,
  Info,
  CreditCard,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronUp
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

export const Services: React.FC<ServicesProps> = ({
  session,
  onAbrirAuth
}) => {
  const [comprasIds, setComprasIds] = useState<number[]>([]);
  const [cursosBD, setCursosBD] = useState<CursoBD[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarListaPack, setMostrarListaPack] = useState(false);
  
  const [cursoSeleccionadoCompra, setCursoSeleccionadoCompra] = useState<any | null>(null);

  useEffect(() => {
    cargarDatosSupabase();
  }, [session]);

  const cargarDatosSupabase = async () => {
    try {
      const { data: dataCursos, error: cursosError } = await supabase
        .from('cursos')
        .select('*');

      if (cursosError) {
        console.error(cursosError);
      }

      if (dataCursos) {
        setCursosBD(dataCursos);
      }

      if (session?.user) {
        const { data: dataCompras, error: comprasError } = await supabase
          .from('compras')
          .select('curso_id')
          .eq('user_id', session.user.id)
          .eq('estado', 'approved');

        if (comprasError) {
          console.error(comprasError);
        }

        if (dataCompras) {
          setComprasIds(
            dataCompras.map(
              (item: any) => Number(item.curso_id)
            )
          );
        }
      } else {
        setComprasIds([]);
      }
    } catch (error) {
      console.error(
        "Error cargando datos:",
        error
      );
    }
  };

  // ======================================
  // LINKS DEL PACK HOLISTICO (22 CURSOS)
  // ======================================
  const linksPackHolistico = [
    { titulo: "Pendulo hebreo", link: "https://drive.google.com/drive/folders/11qPSJYe26Q26KLkc4Ca4rQtDA03me3R" },
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
      icon: <Flower className="h-6 w-6 text-purple-600"/>,
      title: "Pack holístico 22 cursos",
      precioARS: 3500,
      precioUSD: 5,
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
          <li>🎁 +78 Libros PDF</li>
        </ul>
      )
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600"/>,
      title: "Taller aprender a meditar",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1O1H5-MqV2LcmcMcpYfAmUf0ENkLIV83n?usp=drive_link",
      description: "Técnicas simples para calmar la mente, reducir el estrés y conectar con tu ser."
    },
    {
      icon: <Sun className="h-6 w-6 text-purple-600"/>,
      title: "Yoga",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1F4rkztkPyyM_x6yYcOC1TsWWttwDqTDb?usp=drive_link",
      description: "Técnicas posturales y respiratorias para equilibrar cuerpo, mente y energía."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Barras de access",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1XaIvZ0Opzlfgng1rFwCngO4i4eUOcvhq?usp=sharing",
      description: "Libera bloqueos limitantes, relaja la mente y potencia tu bienestar integral."
    },
    {
      icon: <Sun className="h-6 w-6 text-purple-600"/>,
      title: "Astrología y Numerología",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1r3_Z-N6jInHSr86SOAPPejpPB1ZlX0Hk?usp=drive_link",
      description: "Comprende tu mapa energético, carta natal y propósito de vida."
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600"/>,
      title: "Reiki",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/18zzzeE8mQYvq35RSlS2zmsbhiKtJZicm?usp=drive_link",
      description: "Canalización de energía vital para armonizar tus centros energéticos."
    },
    {
      icon: <Flower className="h-6 w-6 text-purple-600"/>,
      title: "Reflexología",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/19n0e1x04jEioAch9Grzf7JGKjNJsPmnr?usp=drive_link",
      description: "Estimulación de zonas reflejas para aliviar tensiones y restaurar el equilibrio."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Mesa Radiónica y Radiestesia",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1n8HzZdNR9YH_6vQuYY4Vc3Op7OVRVSu2?usp=sharing",
      description: "Herramientas de diagnóstico e intervención energética a distancia."
    },
    {
      icon: <Music className="h-6 w-6 text-purple-600"/>,
      title: "Cuencos Tibetanos y Musicoterapia",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1_0fCTAd_WQhQQ7iQq58YD4Wu_ob8NKTT?usp=drive_link",
      description: "Sanación a través de la frecuencia y vibración sonora sagrada."
    },
    {
      icon: <MoonIcon className="h-6 w-6 text-purple-600"/>,
      title: "Tarot Marsella",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jZLfTCYuzDXJIs_4_wM_5_t_BsSS8J7u?usp=sharing",
      description: "Guía arquetípica para obtener claridad espiritual y perspectiva en tu camino."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600"/>,
      title: "Sanación Pránica",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/12OQ8pS9FjE6sbrM30TtOegiIly4jYSVl?usp=sharing",
      description: "Limpieza y fortalecimiento del campo electromagnético personal."
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600"/>,
      title: "Hipnosis y Regresiones",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1La_aCBPE70DfgWnsJXlX42FngZSw3g-G?usp=sharing",
      description: "Acceso a memorias subconscientes para liberar patrones emocionales."
    },
    {
      icon: <Home className="h-6 w-6 text-purple-600"/>,
      title: "Feng Shui",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jPMvf0vPOtAtGbR5s0osTw6DUq4fgJuP?usp=sharing",
      description: "Armonización del flujo energético en tus espacios de convivencia y trabajo."
    },
    {
      icon: <Magnet className="h-6 w-6 text-purple-600"/>,
      title: "Biomagnetismo",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/194prwvnqY1_QA12B8taG-eZBot79HlGd?usp=drive_link",
      description: "Equilibrio energético mediante campos magnéticos."
    },
    {
      icon: <Hand className="h-6 w-6 text-purple-600"/>,
      title: "Tapping EFT",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/14g7t5G5RJthE-3e6jyJNKQjCPECmBpPc?usp=drive_link",
      description: "Liberación emocional mediante estimulación de puntos de acupuntura."
    },
    {
      icon: <CandlestickChart className="h-6 w-6 text-purple-600"/>,
      title: "Velomancia",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1j3BUOMaYborzfxt02u4exm7PARaCJEoG?usp=drive_link",
      description: "Interpretación del fuego y las ceras para potenciar intenciones sanadoras."
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-600"/>,
      title: "Activación Glándula Pineal",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1cgj6E8nEquj-ffmX38R0lbYjMw9drE01?usp=drive_link",
      description: "Expansión de la percepción intuitiva y elevación de la conciencia."
    },
    {
      icon: <Leaf className="h-6 w-6 text-purple-600"/>,
      title: "Medicina China",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1rBEu100G6RY28KWxT00QPdB35yzG1KCl",
      description: "Fundamentos milenarios para preservar la salud integral y el Qi."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Método Yuen",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1TdjrV-b_Wkwh1cT9jreBC-w82L2DmzGC?usp=sharing",
      description: "Corrección rápida de debilidades energéticas a nivel físico y mental."
    },
    {
      icon: <Ear className="h-6 w-6 text-purple-600"/>,
      title: "Auriculoterapia",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/19zopDYZEWjchRFK5ULM3MloMHWhmaKkI?usp=drive_link",
      description: "Estimulación de microsistemas auriculares para el alivio sintomático."
    },
    {
      icon: <Star className="h-6 w-6 text-purple-600"/>,
      title: "Cirugía Astral",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/17aJ7QNbN8XzcIJtha-isVbkBR4AIXlIX?usp=sharing",
      description: "Remoción de bloqueos profundos en la anatomía sutil."
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-600"/>,
      title: "Parapsicologia",
      precioARS: 5000,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1-OmDz_SjPAJ2zk-jTQRP4Doa3RoJ_UBZ?usp=drive_link",
      description: "Desarrollo de capacidades extrasensoriales e investigación de la mente."
    }
  ];

  const filtrados = servicesList.filter((service) =>
    service.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cursoSeleccionadoCompra) {
    const tuNumeroWhatsApp = "5493413375533";
    const mensajeTransferencia = encodeURIComponent(`¡Hola! Acabo de realizar la transferencia local por ARS $${cursoSeleccionadoCompra.precioARS.toLocaleString()} para el curso "${cursoSeleccionadoCompra.title}". Te adjunto el comprobante.`);
    const mensajePaypal = encodeURIComponent(`¡Hola! Quisiera abonar por PayPal (US $${cursoSeleccionadoCompra.precioUSD}) el curso "${cursoSeleccionadoCompra.title}". Por favor envíenme el link de pago.`);

    return (
      <section id="servicios" className="py-8 px-4 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full border border-purple-100">
          <h2 className="text-2xl font-bold text-center mb-1 text-purple-900">Métodos de Pago</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Curso: <span className="font-semibold text-indigo-600">{cursoSeleccionadoCompra.title}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2 mb-4 border border-gray-200">
            <h3 className="font-bold text-sm text-purple-900 flex items-center gap-1">🇦🇷 Pago Local (Argentina)</h3>
            <div className="text-xs space-y-1">
              <p><span className="text-gray-500">Titular:</span> Diego Martin Fragnito</p>
              <p><span className="text-gray-500">CBU:</span> <span className="font-mono font-bold text-indigo-600 select-all">4530000800012708764665</span></p>
              <p><span className="text-gray-500">Alias:</span> <span className="font-mono font-bold text-indigo-600 select-all">HOLISTICA.DMF</span></p>
              <p><span className="text-gray-500">Monto:</span> <strong>ARS ${cursoSeleccionadoCompra.precioARS.toLocaleString()}</strong></p>
            </div>
            <a
              href={`https://wa.me/${tuNumeroWhatsApp}?text=${mensajeTransferencia}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs transition duration-200"
            >
              <span>💬 Enviar comprobante por WhatsApp</span>
            </a>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl space-y-2 mb-6 border border-amber-200">
            <h3 className="font-bold text-sm text-amber-900 flex items-center gap-1">🌐 Pago Internacional (PayPal)</h3>
            <div className="text-xs space-y-1">
              <p><span className="text-gray-600">Monto:</span> <strong>US ${cursoSeleccionadoCompra.precioUSD}</strong></p>
              <p className="text-gray-600 text-[11px]">Contactanos por WhatsApp para solicitar el link de pago o transferir directamente.</p>
            </div>
            <a
              href={`https://wa.me/${tuNumeroWhatsApp}?text=${mensajePaypal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs transition duration-200"
            >
              <Globe className="w-4 h-4"/>
              <span>Pedir link de PayPal por WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => setCursoSeleccionadoCompra(null)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-xl text-center text-xs transition-colors"
          >
            ← Volver al catálogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="servicios" className="py-8 px-4 max-w-7xl mx-auto">
      {!session && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Info className="w-5 h-5"/>
            </div>
            <div>
              <p className="font-semibold text-sm">¿Cómo comprar un curso?</p>
              <p className="text-xs">Primero debés registrarte o iniciar sesión para comprar y acceder al material.</p>
            </div>
          </div>
          <button
            onClick={onAbrirAuth}
            className="bg-purple-700 text-white px-5 py-2 rounded-xl text-xs font-bold"
          >
            <UserPlus className="inline w-4 h-4 mr-1"/>
            Registrarme / Ingresar
          </button>
        </div>
      )}

      <div className="mb-10 max-w-md mx-auto relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"/>
        <input
          type="text"
          placeholder="Buscar un curso..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border shadow-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtrados.map((service, index) => {
          const cursoBD = cursosBD.find(
            (c) => c.titulo.toLowerCase().trim() === service.title.toLowerCase().trim()
          );

          const cursoIdReal = cursoBD ? cursoBD.id : index + 1;
          const estaComprado = comprasIds.includes(cursoIdReal);

          return (
            <Card key={index} className="rounded-2xl overflow-hidden flex flex-col justify-between">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  {service.icon}
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <div className="text-sm text-slate-600">
                  {service.description}
                </div>
              </CardHeader>

              <CardContent>
                {estaComprado ? (
                  service.esPack ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setMostrarListaPack(!mostrarListaPack)}
                        className="w-full flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold transition-colors text-sm"
                      >
                        <span>✨ Acceder a los 22 Cursos</span>
                        {mostrarListaPack ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                      </button>

                      {mostrarListaPack && (
                        <div className="max-h-60 overflow-y-auto space-y-1.5 p-2 bg-slate-50 border rounded-xl">
                          {linksPackHolistico.map((item, idx) => (
                            <a
                              key={idx}
                              href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 text-xs bg-white hover:bg-purple-50 border rounded-lg text-slate-700 font-medium transition-colors"
                            >
                              <span>{item.titulo}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 ml-1"/>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={service.linkDriveDirecto || cursoBD?.link_drive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
                    >
                      Acceder al Material
                    </a>
                  )
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500">Argentina</span>
                        <div className="font-bold text-purple-900 text-base">
                          ${service.precioARS.toLocaleString()} ARS
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Internacional</span>
                        <div className="font-bold text-amber-700 text-base">
                          US ${service.precioUSD}
                        </div>
                      </div>
                    </div>

                    {session ? (
                      <button
                        onClick={() => setCursoSeleccionadoCompra(service)}
                        className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4"/>
                        Comprar Curso 🏦 / 🌐
                      </button>
                    ) : (
                      <button
                        onClick={onAbrirAuth}
                        className="w-full bg-purple-900 hover:bg-purple-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Lock className="w-4 h-4 inline mr-1"/>
                        Ingresar para Comprar
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