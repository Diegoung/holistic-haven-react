import React, { useState, useEffect } from 'react';

export default function PruebaPackHolistico() {
  const listaPackYLibros = [
    { titulo: "Péndulo hebreo", link: "https://drive.google.com/embeddedfolderview?id=11qPSJYe26Q26KLkc4Ca4rQtDA03me3Rj#list" },
    { titulo: "Radiestesia", link: "https://drive.google.com/embeddedfolderview?id=1A1Q6cwE_gU4On6OkUyyCieNNG2RQJFC5#list" },
    { titulo: "Biodescodificación", link: "https://drive.google.com/embeddedfolderview?id=14HFFAGggn8GCGcevguLfCyAhAJpHQ6FQ#list" },
    { titulo: "Chakras y aura", link: "https://drive.google.com/embeddedfolderview?id=19RKt9wif1UUmejPpO1JAt4mrIHB5Vyt3#list" },
    { titulo: "Hoponopono", link: "https://drive.google.com/embeddedfolderview?id=19H2OWgqm4xZTsL2Ls3SxlvhVeckX0ouo#list" },
    { titulo: "Flores de Bach", link: "https://drive.google.com/embeddedfolderview?id=1A-2jX4bcdvO8KkC6Cy0lyRlb-bUB9An2#list" },
    { titulo: "Sanación árbol genealógico", link: "https://drive.google.com/embeddedfolderview?id=19Qh8yloSECFFhZkS_KEQLIqY5RqKW4u9#list" },
    { titulo: "Sanación niño interior", link: "https://drive.google.com/embeddedfolderview?id=19JQoaeNjmblabPRMbd6mgQisFBubGob1#list" },
    { titulo: "Sanación linaje femenino y rito del útero", link: "https://drive.google.com/embeddedfolderview?id=19wU0zkTgs1-EazAXMcq-QWF6CH86su7c#list" },
    { titulo: "Sanación con ángeles", link: "https://drive.google.com/embeddedfolderview?id=19vliliO_51xjtt8JR-rsRJJ7YfJ9lfGD#list" },
    { titulo: "Magia wicca", link: "https://drive.google.com/embeddedfolderview?id=19VgXBuIOYBotS-jiDtWu8yLiq_pACQBE#list" },
    { titulo: "Sanación popular", link: "https://drive.google.com/embeddedfolderview?id=19F6PsBIlf75FHng-YntOimI8LYKyTp4g#list" },
    { titulo: "Limpieza energética", link: "https://drive.google.com/embeddedfolderview?id=19SmfGYSLv0rYIjR-8w7ik0my7HHc058M#list" },
    { titulo: "Gemoterapia", link: "https://drive.google.com/embeddedfolderview?id=19Earq10AczmdFuNNTdlOCyYx_M_f-rtz#list" },
    { titulo: "Rocíos áuricos y sahumos", link: "https://drive.google.com/embeddedfolderview?id=1A33zQCDti8LRYl7OY8COa0Opq56Ul4AM#list" },
    { titulo: "Cortes de cordones energéticos", link: "https://drive.google.com/embeddedfolderview?id=1A-FycNtAsuCd5n30RBNNFhiAWm0jIbRy#list" },
    { titulo: "Runas", link: "https://drive.google.com/embeddedfolderview?id=19sOOHPbMrIqEcYyYFw_wHE3LL3wIoV-j#list" },
    { titulo: "Magia e interpretación con velas", link: "https://drive.google.com/embeddedfolderview?id=19n9orshqd7SG0Ad3MzofkibDOdXXG3FW#list" },
    { titulo: "Registros akáshicos", link: "https://drive.google.com/embeddedfolderview?id=14Glh5lQ2LtXi_ppQEvlHzf57iCMXLrc3#list" },
    { titulo: "Ayurveda", link: "https://drive.google.com/embeddedfolderview?id=14CMJGg0BTK-ZLbcZqGd1vpBPKsS7qac4#list" },
    { titulo: "Constelaciones familiares", link: "https://drive.google.com/embeddedfolderview?id=163_eHVuMcVheZlEX-V7S0r6Css9pVaUs#list" },
    { titulo: "Vidas pasadas Kharma y Dharma", link: "https://drive.google.com/embeddedfolderview?id=19c7sQcZJfxNSCs6LOKh5GHg5ahXJt9Yf#list" },
    { titulo: "DE REGALO: 78 LIBROS EN PDF", link: "https://drive.google.com/embeddedfolderview?id=1jM8hOwePh4EIZOVXXIvYfDcsLtOAbMKv#list" }
  ];

  const todosLosCursos = [
    { titulo: "Pack holístico 22 cursos", link: "https://drive.google.com/embeddedfolderview?id=11qPSJYe26Q26KLkc4Ca4rQtDA03me3Rj#list", esPack: true },
    ...listaPackYLibros.map(item => ({ ...item, esPack: false })),
    { titulo: "Taller aprender a meditar", link: "https://drive.google.com/embeddedfolderview?id=1O1H5-MqV2LcmcMcpYfAmUf0ENkLIV83n#list", esPack: false },
    { titulo: "Yoga", link: "https://drive.google.com/embeddedfolderview?id=1F4rkztkPyyM_x6yYcOC1TsWWttwDqTDb#list", esPack: false },
    { titulo: "Barras de access", link: "https://drive.google.com/embeddedfolderview?id=1XaIvZ0Opzlfgng1rFwCngO4i4eUOcvhq#list", esPack: false },
    { titulo: "Astrología y Numerología", link: "https://drive.google.com/embeddedfolderview?id=1r3_Z-N6jInHSr86SOAPPejpPB1ZlX0Hk#list", esPack: false },
    { titulo: "Reiki", link: "https://drive.google.com/embeddedfolderview?id=18zzzeE8mQYvq35RSlS2zmsbhiKtJZicm#list", esPack: false },
    { titulo: "Reflexología", link: "https://drive.google.com/embeddedfolderview?id=19n0e1x04jEioAch9Grzf7JGKjNJsPmnr#list", esPack: false },
    { titulo: "Mesa Radiónica y Radiestesia", link: "https://drive.google.com/embeddedfolderview?id=1n8HzZdNR9YH_6vQuYY4Vc3Op7OVRVSu2#list", esPack: false },
    { titulo: "Cuencos Tibetanos y Musicoterapia", link: "https://drive.google.com/embeddedfolderview?id=1_0fCTAd_WQhQQ7iQq58YD4Wu_ob8NKTT#list", esPack: false },
    { titulo: "Tarot Marsella", link: "https://drive.google.com/embeddedfolderview?id=1jZLfTCYuzDXJIs_4_wM_5_t_BsSS8J7u#list", esPack: false },
    { titulo: "Sanación Pránica", link: "https://drive.google.com/embeddedfolderview?id=12OQ8pS9FjE6sbrM30TtOegiIly4jYSVl#list", esPack: false },
    { titulo: "Hipnosis y Regresiones", link: "https://drive.google.com/embeddedfolderview?id=1La_aCBPE70DfgWnsJXlX42FngZSw3g-G#list", esPack: false },
    { titulo: "Feng Shui", link: "https://drive.google.com/embeddedfolderview?id=1jPMvf0vPOtAtGbR5s0osTw6DUq4fgJuP#list", esPack: false },
    { titulo: "Biomagnetismo", link: "https://drive.google.com/embeddedfolderview?id=194prwvnqY1_QA12B8taG-eZBot79HlGd#list", esPack: false },
    { titulo: "Tapping EFT", link: "https://drive.google.com/embeddedfolderview?id=14g7t5G5RJthE-3e6jyJNKQjCPECmBpPc#list", esPack: false },
    { titulo: "Velomancia", link: "https://drive.google.com/embeddedfolderview?id=1j3BUOMaYborzfxt02u4exm7PARaCJEoG#list", esPack: false },
    { titulo: "Activación Glándula Pineal", link: "https://drive.google.com/embeddedfolderview?id=1cgj6E8nEquj-ffmX38R0lbYjMw9drE01#list", esPack: false },
    { titulo: "Medicina China", link: "https://drive.google.com/embeddedfolderview?id=1rBEu100G6RY28KWxT00QPdB35yzG1KCl#list", esPack: false },
    { titulo: "Método Yuen", link: "https://drive.google.com/embeddedfolderview?id=1TdjrV-b_Wkwh1cT9jreBC-w82L2DmzGC#list", esPack: false },
    { titulo: "Auriculoterapia", link: "https://drive.google.com/embeddedfolderview?id=19zopDYZEWjchRFK5ULM3MloMHWhmaKkI#list", esPack: false },
    { titulo: "Cirugía Astral", link: "https://drive.google.com/embeddedfolderview?id=17aJ7QNbN8XzcIJtha-isVbkBR4AIXlIX#list", esPack: false },
    { titulo: "Parapsicología", link: "https://drive.google.com/embeddedfolderview?id=1-OmDz_SjPAJ2zk-jTQRP4Doa3RoJ_UBZ#list", esPack: false }
  ];

  const [cursoActivo, setCursoActivo] = useState<any>(null);
  const [cursoSubActivo, setCursoSubActivo] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cursoParam = params.get('curso');
    
    if (cursoParam) {
      const encontrado = todosLosCursos.find(
        item => item.titulo.toLowerCase().trim() === decodeURIComponent(cursoParam).toLowerCase().trim()
      );
      if (encontrado) {
        setCursoActivo(encontrado);
        if (encontrado.esPack) {
          setCursoSubActivo(listaPackYLibros[0]);
        }
      } else {
        setCursoActivo(todosLosCursos[1]); // Default a un curso individual si no se encuentra
      }
    } else {
      setCursoActivo(todosLosCursos[0]); // Pack por defecto si entra limpio
      setCursoSubActivo(listaPackYLibros[0]);
    }
  }, []);

  const linkActual = cursoActivo?.esPack 
    ? (cursoSubActivo ? cursoSubActivo.link : listaPackYLibros[0].link) 
    : cursoActivo?.link;

  const tituloActual = cursoActivo?.esPack 
    ? (cursoSubActivo ? cursoSubActivo.titulo : 'Pack Holístico') 
    : cursoActivo?.titulo;

  return (
    <div className="max-w-6xl mx-auto my-6 px-3 sm:px-6 bg-white rounded-2xl shadow-xl py-6 border border-purple-200">
      <div className="text-center mb-6">
        <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">✨ Demostración Interactiva Protegida</span>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mt-2">
          {cursoActivo ? cursoActivo.titulo : 'Vista Previa del Contenido'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Examinando el material exclusivo seleccionado de forma protegida.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-xl font-medium text-center text-xs shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🛡️ Estás viendo de forma protegida: <strong>{cursoActivo?.titulo}</strong></span>
          <a href="/#servicios" className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors">
            ← Volver al catálogo de cursos
          </a>
        </div>

        {cursoActivo?.esPack ? (
          /* Si es el Pack Holístico, mostramos los 22 cursos y libros en un menú lateral interactivo */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 px-1">Contenido del Pack (22 Cursos + Libros):</h3>
              <div className="space-y-1.5 max-h-[350px] lg:max-h-[500px] overflow-y-auto pr-1">
                {listaPackYLibros.map((item, index) => {
                  const esSeleccionado = cursoSubActivo?.titulo === item.titulo;
                  return (
                    <button
                      key={index}
                      onClick={() => setCursoSubActivo(item)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                        esSeleccionado
                          ? 'bg-purple-700 text-white shadow-md'
                          : item.titulo.includes('REGALO')
                            ? 'bg-amber-100 text-amber-900 font-bold hover:bg-amber-200 border border-amber-300'
                            : 'bg-white text-slate-700 hover:bg-purple-100 hover:text-purple-900 border border-slate-100'
                      }`}
                    >
                      <span className="truncate pr-2">{item.titulo}</span>
                      <span className="text-[10px] whitespace-nowrap">{esSeleccionado ? '👁️ Viendo' : 'Ver ➔'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-[520px] sm:h-[580px] shadow-sm relative">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <h4 className="text-xs sm:text-sm font-bold text-purple-900 truncate pr-2">
                  📂 {tituloActual}
                </h4>
                <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">🔒 Solo Vista Protegida</span>
              </div>

              <div className="flex-1 w-full h-full rounded-xl overflow-y-auto border border-slate-200 bg-slate-50 relative custom-scrollbar">
                <div className="w-full h-[650px] relative">
                  <iframe
                    src={linkActual}
                    title={tituloActual}
                    className="w-full h-full border-0 pointer-events-auto"
                  />
                  <div 
                    className="absolute top-0 bottom-0 left-0 right-[35px] bg-transparent z-20"
                    style={{ touchAction: 'pan-y' }}
                    title="Contenido protegido"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Si es un curso individual (ej. Yoga), mostramos SOLO ese curso a pantalla completa dentro del visor protegido */
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-[520px] sm:h-[580px] shadow-sm relative">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h4 className="text-xs sm:text-sm font-bold text-purple-900 truncate pr-2">
                📂 {cursoActivo?.titulo}
              </h4>
              <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">🔒 Solo Vista Protegida</span>
            </div>

            {cursoActivo ? (
              <div className="flex-1 w-full h-full rounded-xl overflow-y-auto border border-slate-200 bg-slate-50 relative custom-scrollbar">
                <div className="w-full h-[650px] relative">
                  <iframe
                    src={cursoActivo.link}
                    title={cursoActivo.titulo}
                    className="w-full h-full border-0 pointer-events-auto"
                  />
                  <div 
                    className="absolute top-0 bottom-0 left-0 right-[35px] bg-transparent z-20"
                    style={{ touchAction: 'pan-y' }}
                    title="Contenido protegido"
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs text-center p-6">
                Cargando contenido...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}