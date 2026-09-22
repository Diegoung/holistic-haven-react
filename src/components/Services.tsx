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
  ChevronUp,
  Award
} from 'lucide-react';

import { supabase } from '../supabaseClient';

interface ServicesProps {
  session?: any;
  onAbrirAuth?: () => void;
  onAbrirCertificado?: (curso: any) => void;
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
  onAbrirAuth,
  onAbrirCertificado
}) => {
  const [comprasIds, setComprasIds] = useState<number[]>([]);
  const [comprasTitulos, setComprasTitulos] = useState<string[]>([]);
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
          const ids = dataCompras.map((item: any) => Number(item.curso_id));
          setComprasIds(ids);

          if (dataCursos) {
            const titulosComprados = dataCursos
              .filter((c: any) => ids.includes(Number(c.id)))
              .map((c: any) => c.titulo.toLowerCase().trim());
            setComprasTitulos(titulosComprados);
          }
        }
      } else {
        setComprasIds([]);
        setComprasTitulos([]);
      }
    } catch (error) {
      console.error(
        "Error cargando datos:",
        error
      );
    }
  };

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
      icon: <Flower className="h-6 w-6 text-purple-600"/>,
      title: "Pack holístico 22 cursos",
      precioARS: 2500,
      precioPEN: 38,
      precioUYU: 405,
      precioUSD: 10,
      esPack: true,
      description: (
        <div className="mt-2 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
          <p className="text-[11px] font-semibold text-purple-900 mb-1.5 uppercase tracking-wider">Incluye 22 formaciones:</p>
          <ul className="space-y-1 text-xs text-slate-700 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
            {linksPackHolistico.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-purple-600">✨</span>
                <span className="truncate">{item.titulo}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600"/>,
      title: "Taller aprender a meditar",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1O1H5-MqV2LcmcMcpYfAmUf0ENkLIV83n?usp=drive_link",
      description: "Técnicas simples para calmar la mente, reducir el estrés y conectar con tu ser."
    },
    {
      icon: <Sun className="h-6 w-6 text-purple-600"/>,
      title: "Yoga",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1F4rkztkPyyM_x6yYcOC1TsWWttwDqTDb?usp=drive_link",
      description: "Técnicas posturales y respiratorias para equilibrar cuerpo, mente y energía."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Barras de access",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1XaIvZ0Opzlfgng1rFwCngO4i4eUOcvhq?usp=sharing",
      description: "Libera bloqueos limitantes, relaja la mente y potencia tu bienestar integral."
    },
    {
      icon: <Sun className="h-6 w-6 text-purple-600"/>,
      title: "Astrología y Numerología",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1r3_Z-N6jInHSr86SOAPPejpPB1ZlX0Hk?usp=drive_link",
      description: "Comprende tu mapa energético, carta natal y propósito de vida."
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-600"/>,
      title: "Reiki",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/18zzzeE8mQYvq35RSlS2zmsbhiKtJZicm?usp=drive_link",
      description: "Canalización de energía vital para armonizar tus centros energéticos."
    },
    {
      icon: <Flower className="h-6 w-6 text-purple-600"/>,
      title: "Reflexología",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/19n0e1x04jEioAch9Grzf7JGKjNJsPmnr?usp=drive_link",
      description: "Estimulación de zonas reflejas para aliviar tensiones y restaurar el equilibrio."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Mesa Radiónica y Radiestesia",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1n8HzZdNR9YH_6vQuYY4Vc3Op7OVRVSu2?usp=sharing",
      description: "Herramientas de diagnóstico e intervención energética a distancia."
    },
    {
      icon: <Music className="h-6 w-6 text-purple-600"/>,
      title: "Cuencos Tibetanos y Musicoterapia",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1_0fCTAd_WQhQQ7iQq58YD4Wu_ob8NKTT?usp=drive_link",
      description: "Sanación a través de la frecuencia y vibración sonora sagrada."
    },
    {
      icon: <MoonIcon className="h-6 w-6 text-purple-600"/>,
      title: "Tarot Marsella",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jZLfTCYuzDXJIs_4_wM_5_t_BsSS8J7u?usp=sharing",
      description: "Guía arquetípica para obtener claridad espiritual y perspectiva en tu camino."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600"/>,
      title: "Sanación Pránica",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/12OQ8pS9FjE6sbrM30TtOegiIly4jYSVl?usp=sharing",
      description: "Limpieza y fortalecimiento del campo electromagnético personal."
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600"/>,
      title: "Hipnosis y Regresiones",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1La_aCBPE70DfgWnsJXlX42FngZSw3g-G?usp=sharing",
      description: "Acceso a memorias subconscientes para liberar patrones emocionales."
    },
    {
      icon: <Home className="h-6 w-6 text-purple-600"/>,
      title: "Feng Shui",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1jPMvf0vPOtAtGbR5s0osTw6DUq4fgJuP?usp=sharing",
      description: "Armonización del flujo energético en tus espacios de convivencia y trabajo."
    },
    {
      icon: <Magnet className="h-6 w-6 text-purple-600"/>,
      title: "Biomagnetismo",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/194prwvnqY1_QA12B8taG-eZBot79HlGd?usp=drive_link",
      description: "Equilibrio energético mediante campos magnéticos."
    },
    {
      icon: <Hand className="h-6 w-6 text-purple-600"/>,
      title: "Tapping EFT",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/14g7t5G5RJthE-3e6jyJNKQjCPECmBpPc?usp=drive_link",
      description: "Liberación emocional mediante estimulación de puntos de acupuntura."
    },
    {
      icon: <CandlestickChart className="h-6 w-6 text-purple-600"/>,
      title: "Velomancia",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1j3BUOMaYborzfxt02u4exm7PARaCJEoG?usp=drive_link",
      description: "Interpretación del fuego y las ceras para potenciar intenciones sanadoras."
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-600"/>,
      title: "Activación Glándula Pineal",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1cgj6E8nEquj-ffmX38R0lbYjMw9drE01?usp=drive_link",
      description: "Expansión de la percepción intuitiva y elevación de la conciencia."
    },
    {
      icon: <Leaf className="h-6 w-6 text-purple-600"/>,
      title: "Medicina China",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1rBEu100G6RY28KWxT00QPdB35yzG1KCl",
      description: "Fundamentos milenarios para preservar la salud integral y el Qi."
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-600"/>,
      title: "Método Yuen",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/1TdjrV-b_Wkwh1cT9jreBC-w82L2DmzGC?usp=sharing",
      description: "Corrección rápida de debilidades energéticas a nivel físico y mental."
    },
    {
      icon: <Ear className="h-6 w-6 text-purple-600"/>,
      title: "Auriculoterapia",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/19zopDYZEWjchRFK5ULM3MloMHWhmaKkI?usp=drive_link",
      description: "Estimulación de microsistemas auriculares para el alivio sintomático."
    },
    {
      icon: <Star className="h-6 w-6 text-purple-600"/>,
      title: "Cirugía Astral",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
      precioUSD: 7,
      linkDriveDirecto: "https://drive.google.com/drive/folders/17aJ7QNbN8XzcIJtha-isVbkBR4AIXlIX?usp=sharing",
      description: "Remoción de bloqueos profundos en la anatomía sutil."
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-600"/>,
      title: "Parapsicologia",
      precioARS: 5000,
      precioPEN: 26,
      precioUYU: 282,
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
    const mensajeWpGral = encodeURIComponent(`¡Hola! Acabo de realizar el pago para el curso "${cursoSeleccionadoCompra.title}". Te adjunto el comprobante. Dejo mis datos (Nombre y correo con el que me registré) para que puedas habilitarme el acceso.`);

    return (
      <section id="servicios" className="py-8 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full border border-purple-100 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-900">Métodos de Pago Internacionales y Locales</h2>
            <p className="text-sm text-gray-600 mt-1">
              Curso seleccionado: <span className="font-semibold text-indigo-600">{cursoSeleccionadoCompra.title}</span>
            </p>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* ARGENTINA */}
            <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100 space-y-2">
              <h3 className="font-bold text-sm text-purple-900 flex items-center gap-1.5">🇦🇷 Argentina (Monto: ARS ${cursoSeleccionadoCompra.precioARS.toLocaleString()})</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p><span className="text-gray-500">Titular:</span> Diego Martin Fragnito</p>
                <p><span className="text-gray-500">CBU:</span> <span className="font-mono font-bold text-indigo-600 select-all">4530000800012708764665</span></p>
                <p><span className="text-gray-500">Alias:</span> <span className="font-mono font-bold text-indigo-600 select-all">HOLISTICA.DMF</span></p>
              </div>
            </div>

            {/* PERÚ */}
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 flex items-center gap-1.5">🇵🇪 Perú (Monto: {cursoSeleccionadoCompra.precioPEN} Soles)</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p><span className="text-gray-500">Titular:</span> Jessica Martinez Castillo</p>
                <p><span className="text-gray-500">Interbank:</span> <span className="font-mono font-bold select-all">1083324352314</span></p>
                <p><span className="text-gray-500">BCP Soles:</span> <span className="font-mono font-bold select-all">19496268797006</span></p>
                <p><span className="text-gray-500">Interbancaria:</span> <span className="font-mono font-bold select-all">00219419626879700691</span></p>
                <p><span className="text-gray-500">Plin o Yape:</span> <span className="font-mono font-bold text-emerald-700 select-all">999167163</span></p>
              </div>
            </div>

            {/* ECUADOR */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 space-y-2">
              <h3 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">🇪🇨 Ecuador (Monto: ${cursoSeleccionadoCompra.precioUSD} USD)</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p><span className="text-gray-500">Nombre:</span> David Israel Acosta</p>
                <p><span className="text-gray-500">Cuenta de Ahorros Banco Pichincha:</span> <span className="font-mono font-bold select-all">2204527510</span></p>
                <p><span className="text-gray-500">C.I.:</span> <span className="font-mono font-bold select-all">1725720062</span></p>
              </div>
            </div>

            {/* URUGUAY */}
            <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 space-y-2">
              <h3 className="font-bold text-sm text-sky-900 flex items-center gap-1.5">🇺🇾 Uruguay (Monto: {cursoSeleccionadoCompra.precioUYU} UYU)</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p><span className="text-gray-500">Titular:</span> Diego Martin Fragnito</p>
                <p><span className="text-gray-500">PREX Uruguay:</span> <span className="font-mono font-bold select-all">1577930</span></p>
                <p><span className="text-gray-500">Cédula / DNI:</span> <span className="font-mono font-bold select-all">32139800</span></p>
              </div>
            </div>

            {/* PAYPAL */}
            <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 space-y-2">
              <h3 className="font-bold text-sm text-indigo-900 flex items-center gap-1.5">🌍 PayPal (Monto: ${cursoSeleccionadoCompra.precioUSD} USD)</h3>
              <div className="text-xs space-y-1 text-gray-700">
                <p><span className="text-gray-500">Titular:</span> Diego Martin Fragnito</p>
                <p><span className="text-gray-500">Correo PayPal:</span> <span className="font-mono font-bold text-indigo-600 select-all">Diegomfragnito@gmail.com</span></p>
                <p className="text-[11px] text-gray-600 pt-1">
                  💡 También podés indicar tu correo vinculado de PayPal al enviar el comprobante para recibir el enlace de pago directo.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${tuNumeroWhatsApp}?text=${mensajeWpGral}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition duration-200"
            >
              <span>💬 Enviar comprobante por WhatsApp</span>
            </a>

            <button
              onClick={() => setCursoSeleccionadoCompra(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-xl text-center text-xs transition-colors"
            >
              ← Volver al catálogo
            </button>
          </div>
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
          
          const tituloLimpio = service.title.toLowerCase().trim();
          const estaComprado = comprasIds.includes(cursoIdReal) || 
                               comprasTitulos.includes(tituloLimpio) ||
                               comprasTitulos.some(t => t.includes(tituloLimpio) || tituloLimpio.includes(t));

          return (
            <Card key={index} className="rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-1">
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

                      {onAbrirCertificado && (
                        <button
                          onClick={() => onAbrirCertificado(service)}
                          className="w-full mt-2 flex items-center justify-center gap-2 bg-[#2C4A3E] hover:bg-[#1B3026] text-white py-2.5 px-4 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                          Certificado 🎓
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <a
                        href={service.linkDriveDirecto || cursoBD?.link_drive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
                      >
                        Acceder al Material
                      </a>

                      {onAbrirCertificado && (
                        <button
                          onClick={() => onAbrirCertificado(service)}
                          className="w-full flex items-center justify-center gap-2 bg-[#2C4A3E] hover:bg-[#1B3026] text-white py-2.5 px-4 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                          Certificado 🎓
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-purple-50/60 p-2 rounded-lg border border-purple-100">
                          <span className="text-slate-500 block text-[10px]">🇦🇷 Argentina</span>
                          <span className="font-bold text-purple-900">${service.precioARS.toLocaleString()} ARS</span>
                        </div>
                        <div className="bg-purple-50/60 p-2 rounded-lg border border-purple-100">
                          <span className="text-slate-500 block text-[10px]">🇵🇪 Perú</span>
                          <span className="font-bold text-purple-900">{service.precioPEN} Soles</span>
                        </div>
                        <div className="bg-purple-50/60 p-2 rounded-lg border border-purple-100">
                          <span className="text-slate-500 block text-[10px]">🇺🇾 Uruguay</span>
                          <span className="font-bold text-purple-900">{service.precioUYU} UYU</span>
                        </div>
                        <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                          <span className="text-slate-500 block text-[10px]">🇪🇨 Ecuador / PayPal</span>
                          <span className="font-bold text-amber-800">${service.precioUSD} USD</span>
                        </div>
                      </div>
                    </div>

                    {session ? (
                      <button
                        onClick={() => setCursoSeleccionadoCompra(service)}
                        className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4"/>
                        Ver Datos de Pago 🌍
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