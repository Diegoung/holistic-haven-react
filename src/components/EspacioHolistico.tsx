import React, { useState } from "react";
import { supabase } from "../supabaseClient";

// Base de datos de ejemplo con solo el "000"
const numerosAngelesBD: Record<string, string> = {
  "000": "Representa una conexión profunda con la fuente universal. Es una invitación a comenzar nuevamente con conciencia y confianza.",
  "1": "Se abre una nueva etapa. Confía en tu capacidad de iniciar aquello que tu corazón viene señalando.",
    "2": "La cooperación y la paciencia serán importantes. Permite que las situaciones se acomoden sin forzar sus tiempos.",
    "3": "Tu creatividad busca expresarse. Escucha tus ideas y permite que tu voz interior encuentre una forma de manifestarse.",
    "4": "Es tiempo de construir bases firmes. La constancia y el orden pueden ayudarte a convertir una intención en realidad.",
    "5": "Una transformación comienza a tomar forma. Mantente abierto/a a cambios que pueden ayudarte a crecer.",
    "6": "Busca equilibrio entre tus responsabilidades y tu bienestar interior. No olvides cuidar también de vos.",
    "7": "Tu intuición está especialmente activa. Observa las señales y confía más en aquello que percibes internamente.",
    "8": "Una energía de abundancia y expansión se encuentra presente. Reconoce tus recursos y utilízalos con sabiduría.",
    "9": "Una experiencia llega a su conclusión. Soltar lo que terminó puede abrir espacio para una nueva etapa.",
    "10": "Un nuevo comienzo necesita confianza. Da el primer paso sin esperar tener todas las respuestas.",
    "11": "Tus pensamientos tienen una fuerte influencia sobre tu dirección actual. Elige conscientemente aquello en lo que enfocas tu energía.",
    "12": "Avanzas paso a paso hacia una situación más equilibrada. Ten paciencia con el proceso.",
    "13": "La creatividad puede ayudarte a transformar una dificultad en una oportunidad de crecimiento.",
    "14": "La estabilidad llegará mediante pequeñas acciones sostenidas. No subestimes el poder de la constancia.",
    "015": "Una decisión puede iniciar una transformación importante. Escucha tu intuición antes de actuar.",
    "16": "Revisa aquello que está ocupando demasiado espacio en tu mente. El equilibrio interior comienza con pensamientos conscientes.",
    "17": "Una nueva dirección puede estar alineándose con tu crecimiento espiritual. Confía en tu percepción.",
    "18": "Tus esfuerzos pueden comenzar a mostrar resultados. Mantén una actitud consciente frente a la prosperidad.",
    "19": "Una etapa se está cerrando mientras otra comienza. Aceptar la transición permitirá que avances con mayor libertad.",
    "20": "La paciencia y la confianza son las claves de este momento. No todo necesita resolverse inmediatamente.",
    "21": "Una relación, proyecto o idea puede entrar en una etapa de crecimiento. Colaborar puede ayudarte a avanzar.",
    "22": "El equilibrio se fortalece cuando confías en tus propios tiempos. Evita compararte con el proceso de los demás.",
    "23": "La comunicación sincera puede abrir una puerta que parecía cerrada. Expresa aquello que realmente sentís.",
    "24": "Tus vínculos necesitan estabilidad y cuidado. Construye desde la confianza y no desde el temor.",
    "25": "Un cambio puede ayudarte a recuperar equilibrio. Observa qué hábitos ya no acompañan tu evolución.",
    "26": "Cuidar tus emociones será fundamental. Antes de resolver todo afuera, escucha aquello que sucede dentro.",
    "27": "Tu sensibilidad puede convertirse en una guía. Presta atención a las coincidencias y sensaciones que se repiten.",
    "28": "La cooperación puede abrir caminos hacia una mayor prosperidad. Permite que otros también aporten a tu proceso.",
    "29": "Una relación o situación puede estar llegando a una definición. Confía en aquello que ya aprendiste.",
    "30": "Tu expresión creativa tiene algo importante para mostrarte. Es momento de darle espacio.",
    "31": "Una idea puede convertirse en un nuevo comienzo. No esperes la perfección para empezar.",
    "32": "La creatividad y la cooperación pueden complementarse. Compartir tus ideas puede generar nuevas oportunidades.",
    "33": "Tu crecimiento espiritual se relaciona con tu capacidad de comunicar, crear y acompañar a otros.",
    "34": "La inspiración necesita una estructura para manifestarse. Organiza tus ideas y comienza a construir.",
    "35": "Una nueva experiencia puede despertar tu creatividad. Permítete explorar sin miedo al cambio.",
    "36": "Expresar tus emociones puede ayudarte a recuperar armonía. No guardes aquello que necesita ser comprendido.",
    "37": "Tu intuición puede señalarte una dirección creativa. Presta atención a las ideas que aparecen repetidamente.",
    "38": "Tu capacidad de crear y administrar recursos puede abrir una etapa de expansión.",
    "39": "Una etapa creativa puede estar llegando a su cierre. Conserva el aprendizaje y prepárate para lo nuevo.",
    "40": "La estabilidad se construye con paciencia. Volver a lo esencial puede ayudarte a recuperar seguridad.",
    "41": "Una iniciativa necesita organización. Convierte tus ideas en acciones concretas.",
    "42": "La armonía se fortalece cuando existe una base sólida. Trabaja primero en aquello que sostiene tu vida.",
    "43": "Tus ideas pueden materializarse si les das estructura. La creatividad necesita también disciplina.",
    "044": "Es una señal de protección, estabilidad y firmeza. Mantente enfocado/a en lo que realmente importa.",
    "45": "Una transformación puede ser positiva si está acompañada por planificación y prudencia.",
    "46": "El cuidado personal y la responsabilidad deben encontrar un punto de equilibrio.",
    "47": "La disciplina y la intuición pueden trabajar juntas. No ignores ninguna de las dos.",
    "48": "Tus esfuerzos sostenidos pueden generar crecimiento material. Avanza con responsabilidad.",
    "49": "Una estructura antigua puede estar llegando a su final. Lo aprendido servirá como base para lo siguiente.",
    "50": "Un cambio importante puede abrir una nueva posibilidad. Recíbelo con flexibilidad y conciencia.",
    "51": "Tu iniciativa puede impulsar una transformación. Confía en tu capacidad para tomar decisiones.",
    "52": "Los cambios necesitan equilibrio. No abandones tus necesidades emocionales mientras avanzás.",
    "53": "Una nueva experiencia puede despertar talentos que todavía no habías explorado.",
    "54": "Antes de avanzar hacia algo nuevo, asegúrate de tener una base estable.",
    "55": "La energía del cambio está muy presente. Libera viejos patrones y permite que una nueva versión de vos aparezca.",
    "56": "Una transformación personal puede mejorar tus vínculos y tu bienestar emocional.",
    "57": "Escucha tu intuición durante los cambios. Tu percepción puede ayudarte a reconocer el camino adecuado.",
    "58": "Una transformación puede relacionarse con tu abundancia y manera de administrar tus recursos.",
    "59": "Un cambio puede marcar el cierre de una etapa. No tengas miedo de dejar atrás lo que ya cumplió su función.",
    "60": "El equilibrio emocional comienza cuando dejas de cargar responsabilidades que no te corresponden.",
    "61": "Una nueva etapa necesita amor propio y cuidado interior. Elegite también a vos.",
    "62": "La armonía en tus relaciones se construye mediante escucha, respeto y reciprocidad.",
    "63": "Tus emociones pueden expresarse de una manera creativa. Darles voz puede favorecer tu bienestar.",
    "64": "La estabilidad familiar y emocional puede fortalecerse mediante pequeños actos de cuidado.",
    "65": "Un cambio en tu vida emocional puede ayudarte a recuperar libertad y autenticidad.",
    "66": "Es una invitación a equilibrar lo material con lo emocional y espiritual.",
    "67": "Tu intuición puede ayudarte a comprender mejor tus necesidades emocionales.",
    "68": "El equilibrio interior puede reflejarse también en tu relación con la abundancia.",
    "69": "Una etapa emocional puede llegar a su cierre. Perdonar y soltar puede abrir espacio para sanar.",
    "70": "La introspección puede revelar respuestas que no encontrarás buscando afuera.",
    "71": "Una nueva dirección espiritual puede comenzar a manifestarse. Confía en tus percepciones.",
    "72": "La intuición y la cooperación pueden ayudarte a comprender mejor una situación.",
    "73": "Tu crecimiento espiritual puede expresarse mediante creatividad, estudio o comunicación.",
    "74": "La práctica constante puede transformar una intuición en una verdadera herramienta personal.",
    "75": "Un cambio interior puede llevarte hacia una mayor conciencia espiritual.",
    "76": "Escuchar tus emociones puede revelar una enseñanza importante para tu crecimiento.",
    "77": "La intuición y la búsqueda espiritual se encuentran especialmente activas.",
    "78": "Tu crecimiento interior puede abrir una nueva comprensión sobre la abundancia y el propósito.",
    "79": "Una etapa de aprendizaje espiritual puede estar llegando a su conclusión.",
    "80": "La energía de expansión necesita equilibrio y responsabilidad. Utiliza tus recursos conscientemente.",
    "81": "Una iniciativa puede generar nuevas oportunidades materiales. Actúa con confianza.",
    "82": "La cooperación puede favorecer tu prosperidad. No todo tiene que hacerse en soledad.",
    "83": "Tu creatividad puede convertirse en una fuente de crecimiento y abundancia.",
    "84": "La prosperidad se fortalece cuando existe organización y constancia.",
    "85": "Un cambio puede transformar tu relación con el dinero, el trabajo o los recursos.",
    "86": "Busca equilibrio entre tus necesidades materiales y tu bienestar emocional.",
    "87": "Tu intuición puede ayudarte a reconocer una oportunidad de crecimiento.",
    "88": "La energía de abundancia se encuentra intensificada. Recibe con gratitud y administra con conciencia.",
    "89": "Una etapa de crecimiento material puede estar llegando a una conclusión importante.",
    "90": "El cierre de una etapa puede liberar energía para comenzar algo más alineado con tu propósito.",
    "91": "Una nueva dirección aparece después de una conclusión. Da espacio a lo que quiere comenzar.",
    "92": "Soltar una situación puede permitir que aparezca una relación o experiencia más equilibrada.",
    "93": "El cierre de un ciclo puede liberar tu creatividad y permitirte expresarte nuevamente.",
    "94": "Una etapa termina para dar paso a una estructura más estable y consciente.",
    "95": "El cambio es parte del cierre que estás atravesando. No tientes a aferrarte a aquello que ya terminó.",
    "96": "Una liberación emocional puede ser necesaria para comenzar un nuevo ciclo con mayor tranquilidad.",
    "97": "El aprendizaje espiritual de una etapa puede estar llegando a su integración.",
    "98": "Una transformación relacionada con la abundancia puede marcar el final de una etapa.",
    "99": "El cierre es profundo y significativo. Agradece lo aprendido y prepara espacio para un nuevo comienzo.",

    // 100 - 199
    "100": "Un nuevo comienzo se encuentra acompañado por una conexión profunda con tu intuición. Confía en la dirección que estás tomando.",
    "101": "Una nueva etapa comienza. Mantén tus pensamientos enfocados en aquello que deseas construir y no en aquello que deseas dejar atrás.",
    "102": "Tu camino necesita equilibrio entre iniciativa y cooperación. Avanza, pero permite también que las personas correctas te acompañen.",
    "103": "Una idea nueva puede convertirse en una experiencia de crecimiento. Expresa tu creatividad y confía en tu inspiración.",
    "104": "Tus nuevos proyectos necesitan bases sólidas. Organiza tus prioridades y construye paso a paso.",
    "105": "Una transformación importante puede comenzar con una decisión personal. Atrévete a cambiar aquello que ya no representa quién eres.",
    "106": "El amor propio debe acompañar tus nuevos comienzos. No olvides cuidar tus emociones mientras persigues tus objetivos.",
    "107": "Una nueva dirección puede estar relacionada con tu crecimiento espiritual. Escucha las señales que aparecen en tu camino.",
    "108": "Tu iniciativa puede abrir una etapa de mayor abundancia. Actúa con confianza y administra tus recursos con sabiduría.",
    "109": "Un nuevo comienzo nace después del cierre de una etapa. Lo que termina prepara el espacio para algo diferente.",
    "110": "Tus pensamientos están marcando una nueva dirección. Elige conscientemente aquello que quieres alimentar con tu energía.",
    "111": "Tus pensamientos y deseos adquieren especial fuerza. Es un momento para enfocar tu atención en lo que quieres manifestar.",
    "112": "Una nueva intención necesita paciencia y equilibrio. Confía en el proceso sin intentar controlar cada resultado.",
    "113": "La creatividad puede convertirse en el impulso de un nuevo ciclo. Expresa tus ideas y permite que evolucionen.",
    "114": "Tus nuevos proyectos necesitan disciplina. Una visión clara acompañada de constancia puede convertirse en una realidad estable.",
    "115": "Una transformación personal está tomando fuerza. Confía en tu capacidad de tomar decisiones diferentes.",
    "116": "El comienzo de una nueva etapa requiere equilibrio emocional. Escucha tus necesidades antes de tomar decisiones importantes.",
    "117": "Tu intuición puede estar indicando un nuevo camino. Presta atención a aquello que aparece repetidamente en tu vida.",
    "118": "Una iniciativa puede conducir hacia nuevas oportunidades materiales. Confía en tus capacidades y actúa con responsabilidad.",
    "119": "Una nueva etapa comienza mientras otra termina. Aceptar el cierre te permitirá avanzar con mayor claridad.",
    "120": "La paciencia es parte del nuevo comienzo. Permite que las situaciones se acomoden antes de tomar decisiones definitivas.",
    "121": "El equilibrio entre iniciativa y cooperación es la clave. Avanza con confianza sin perder de vista tus vínculos.",
    "122": "Confía en los tiempos de tu proceso. La estabilidad que buscas se construye mediante paciencia y perseverancia.",
    "123": "Estás avanzando paso a paso. Cada experiencia suma y te acerca a una nueva etapa de crecimiento.",
    "124": "Tus proyectos pueden prosperar si combinas cooperación con organización. Construye sobre bases firmes.",
    "125": "Una transformación puede llevarte hacia mayor libertad. Mantén el equilibrio mientras atraviesas los cambios.",
    "126": "Tus relaciones necesitan atención durante este nuevo ciclo. Cuida aquello que te brinda apoyo emocional verdadero.",
    "127": "Tu intuición puede confirmar que estás avanzando en una dirección importante. Confía en las señales internas.",
    "128": "La cooperación y la iniciativa pueden abrir oportunidades de crecimiento y abundancia.",
    "129": "Una relación o proyecto puede llegar a una etapa de conclusión. Aprende de la experiencia y continúa avanzando.",
    "130": "Una nueva idea necesita expresión. Permite que tu creatividad sea el puente hacia un comienzo diferente.",
    "131": "Tus pensamientos creativos pueden abrir una nueva puerta. Atrévete a confiar en tu propia visión.",
    "132": "Compartir tus ideas puede ayudarte a encontrar nuevas oportunidades. La creatividad crece cuando existe intercambio.",
    "133": "Tu expresión personal tiene un papel importante en tu crecimiento. Habla, crea y permite que tu esencia se manifieste.",
    "134": "La inspiración necesita estructura. Organiza tus ideas y convierte aquello que imaginas en acciones concretas.",
    "135": "Una nueva experiencia puede transformar tu manera de expresarte. Permítete explorar caminos diferentes.",
    "136": "La creatividad puede ayudarte a procesar emociones. Expresar lo que sientes puede traer mayor claridad.",
    "137": "Una intuición creativa puede señalarte una dirección significativa. Escucha esa voz interior.",
    "138": "Tus talentos pueden convertirse en una fuente de crecimiento. Reconoce tu capacidad para crear nuevas oportunidades.",
    "139": "Una etapa creativa llega a su conclusión. Conserva la inspiración y úsala como base para lo que viene.",
    "140": "Un nuevo comienzo necesita orden. Establecer prioridades te permitirá avanzar con mayor seguridad.",
    "141": "Tu iniciativa puede prosperar cuando está acompañada de planificación. No tengas miedo de comenzar desde cero.",
    "142": "La cooperación y la organización pueden ayudarte a construir algo duradero.",
    "143": "Una idea comienza a tomar forma. Dale estructura y permite que tu creatividad encuentre un camino concreto.",
    "144": "La estabilidad se fortalece mediante disciplina y constancia. Mantén los pies en la tierra mientras persigues tus sueños.",
    "145": "Una transformación necesita planificación. El cambio puede ser positivo cuando sabes hacia dónde quieres dirigirte.",
    "146": "Tu bienestar emocional necesita formar parte de tus planes. Construye una vida que también sea saludable para vos.",
    "147": "La disciplina y la intuición pueden trabajar juntas. Confía en tu percepción, pero acompáñala con acciones concretas.",
    "148": "Tus esfuerzos pueden comenzar a generar resultados materiales. Continúa construyendo con responsabilidad.",
    "149": "Una estructura antigua puede estar llegando a su final. Prepárate para construir sobre nuevas bases.",
    "150": "Un cambio de dirección puede abrir nuevas posibilidades. Escucha tu intuición antes de dar el siguiente paso.",
    "151": "Tu capacidad de decidir está creciendo. Una elección consciente puede iniciar una transformación importante.",
    "152": "El cambio será más favorable cuando mantengas equilibrio y paciencia. No necesitas apresurar el proceso.",
    "153": "Una experiencia nueva puede despertar tu creatividad y ayudarte a descubrir una faceta diferente de vos.",
    "154": "Los cambios necesitan una estructura estable. Planifica antes de actuar y evita decisiones impulsivas.",
    "155": "La transformación está intensificada. Es momento de liberar viejos patrones y permitir una evolución personal.",
    "156": "Un cambio en tus prioridades puede mejorar tu bienestar emocional. Elegí aquello que realmente te nutre.",
    "157": "Tu intuición puede acompañarte durante una transformación importante. Confía en aquello que internamente ya sabes.",
    "158": "Una nueva dirección puede generar crecimiento material. Utiliza tu iniciativa de manera consciente.",
    "159": "El cambio está relacionado con el cierre de una etapa. Soltar puede permitirte comenzar con mayor libertad.",
    "160": "Un nuevo comienzo necesita equilibrio emocional. Antes de avanzar, revisa qué necesitas sanar.",
    "161": "Tu autoestima puede ser la base de una nueva etapa. Reconoce tu valor y comienza desde ese lugar.",
    "162": "El equilibrio en tus vínculos puede favorecer un nuevo comienzo. Rodéate de relaciones basadas en reciprocidad.",
    "163": "Tu creatividad puede ayudarte a expresar emociones que estaban esperando ser reconocidas.",
    "164": "Una nueva etapa familiar o emocional puede beneficiarse de mayor estabilidad y organización.",
    "165": "Una transformación emocional puede ayudarte a recuperar autenticidad. Permítete cambiar de opinión y crecer.",
    "166": "Busca armonía entre tus necesidades materiales y emocionales. Ninguna de las dos debe quedar olvidada.",
    "167": "Una etapa puede despertar mayor sensibilidad espiritual. Escucha tus emociones como fuente de información.",
    "168": "El amor propio y una buena administración de tus recursos pueden abrir una etapa de mayor estabilidad.",
    "169": "Una situación emocional puede estar llegando a su cierre. Agradece lo aprendido y avanza sin cargar con el pasado.",
    "170": "Una nueva dirección espiritual comienza a tomar forma. Dedica tiempo a la introspección.",
    "171": "Tu intuición confirma la necesidad de iniciar algo nuevo. Confía en la guía que surge desde tu interior.",
    "172": "La cooperación puede acompañar un importante crecimiento personal. No tengas miedo de pedir apoyo.",
    "173": "Tus conocimientos y creatividad pueden convertirse en herramientas para tu evolución espiritual.",
    "174": "La disciplina puede ayudarte a desarrollar una práctica espiritual más estable.",
    "175": "Una transformación interior puede cambiar tu manera de comprender el mundo. Permite que nuevas ideas entren en tu vida.",
    "176": "Escuchar tus emociones puede revelar una enseñanza espiritual importante.",
    "177": "Tu intuición está especialmente activa. Presta atención a sueños, coincidencias y sensaciones repetidas.",
    "178": "El crecimiento espiritual puede acompañar una etapa de expansión material. Mantén ambos aspectos equilibrados.",
    "179": "Un aprendizaje espiritual llega a una conclusión. Lo vivido puede convertirse ahora en sabiduría.",
    "180": "Una nueva etapa relacionada con la abundancia comienza. Utiliza tus recursos con conciencia.",
    "181": "Tu iniciativa puede abrir una oportunidad de crecimiento material. Confía en tus capacidades.",
    "182": "La colaboración puede favorecer tu prosperidad. Aprende a recibir tanto como das.",
    "183": "Tus talentos creativos pueden convertirse en una nueva fuente de oportunidades.",
    "184": "La organización y el trabajo constante pueden fortalecer tu estabilidad económica.",
    "185": "Una transformación puede modificar tu relación con el dinero y el trabajo. Adáptate sin perder tus valores.",
    "186": "El bienestar emocional y la prosperidad necesitan encontrar equilibrio. No sacrifiques uno por perseguir el otro.",
    "187": "Tu intuición puede ayudarte a reconocer una oportunidad que parecía pequeña pero tiene potencial de crecimiento.",
    "188": "La energía de abundancia se encuentra especialmente marcada. Recibe con gratitud y administra con responsabilidad.",
    "189": "Una etapa de crecimiento material puede llegar a su conclusión. Prepara una nueva estrategia para el futuro.",
    "190": "El cierre de una etapa abre una oportunidad para comenzar nuevamente con mayor claridad.",
    "191": "Una nueva dirección aparece después de un aprendizaje importante. Confía en tus propias decisiones.",
    "192": "Una conclusión puede mejorar el equilibrio de una relación o proyecto. Permite que cada experiencia cumpla su ciclo.",
    "193": "El cierre de una etapa puede liberar tu creatividad. Utiliza esa energía para crear algo nuevo.",
    "194": "Una estructura anterior está llegando a su final. Lo aprendido será la base de tu próxima construcción.",
    "195": "El cambio acompaña el cierre de una etapa. No te aferres a aquello que ya cumplió su propósito.",
    "196": "Una liberación emocional puede ayudarte a cerrar un ciclo y recuperar tranquilidad.",
    "197": "El aprendizaje espiritual de una experiencia comienza a integrarse. Confía en lo que has comprendido.",
    "198": "Una etapa de crecimiento material puede concluir para dar lugar a una nueva forma de prosperidad.",
    "199": "Un ciclo importante llega a su final. Libera el pasado con gratitud y permite que una nueva etapa comience.",

    // 200 - 299
    "200": "La paciencia y la confianza son fundamentales. Aunque todavía no veas resultados, el proceso continúa desarrollándose.",
    "201": "Una nueva oportunidad puede surgir mediante una relación o colaboración. Mantén abierta la comunicación.",
    "202": "El equilibrio es el mensaje central. Confía en que aquello que estás construyendo necesita tiempo para desarrollarse.",
    "203": "La comunicación y la creatividad pueden ayudarte a resolver una situación compleja de manera armónica.",
    "204": "Tus vínculos y proyectos necesitan bases sólidas. Construye paso a paso con constancia y dedicación.",
    "205": "Una transformación en tu entorno o en tus relaciones puede abrir un espacio de renovación.",
    "206": "El cuidado mutuo y la empatía fortalecen tus vínculos afectivos. Escucha a quienes te rodean.",
    "207": "La intuición compartida o la sincronicidad en tus relaciones te guían por un buen camino.",
    "208": "La cooperación puede generar estabilidad y prosperidad compartida. Trabaja en equipo.",
    "209": "Una etapa en tus vínculos o colaboraciones llega a su fin, abriendo paso a nuevas conexiones.",
    "210": "Tus pensamientos compartidos tienen poder. Enfócate en construir acuerdos positivos.",
    "211": "Una gran fuerza de manifestación se activa a través de tu enfoque mental y tus intenciones claras.",
    "212": "Mantén la fe y el equilibrio en medio de los cambios. Todo se está acomodando para tu mayor bien.",
    "213": "La inspiración y la colaboración creativa te abren puertas inesperadas.",
    "214": "La disciplina en tus asociaciones y proyectos garantiza un crecimiento sostenido.",
    "215": "Un cambio positivo se avecina en tu forma de relacionarte y conectar con otros.",
    "216": "El bienestar emocional en tus vínculos es prioridad. Nutre tus relaciones desde el amor.",
    "217": "Tu intuición te confirma que estás en sintonía con las personas correctas.",
    "218": "La abundancia llega a tu vida mediante alianzas estratégicas y trabajo colaborativo.",
    "219": "Un ciclo de aprendizaje en tus relaciones concluye, dándote mayor sabiduría.",
    "220": "Una profunda sensación de paz te acompaña cuando confías en el orden divino de los eventos.",
    "221": "Tus intenciones positivas están creando una realidad armónica a tu alrededor.",
    "222": "Todo está bien. Confía plenamente en el proceso y mantén la fe en que el universo te respalda.",
    "223": "Los maestros ascendidos y guías apoyan tus proyectos creativos y tu comunicación.",
    "224": "Los ángeles te rodean brindando estabilidad y armonía a tu hogar y a tus vínculos.",
    "225": "Grandes cambios están ocurriendo para alinear tu vida con tu propósito más elevado.",
    "226": "El equilibrio entre dar y recibir en tus relaciones es clave para tu paz interior.",
    "227": "Estás manifestando bendiciones gracias a tu perseverancia y tu conexión espiritual.",
    "228": "La prosperidad fluye hacia ti cuando confías en la abundancia infinita del universo.",
    "229": "Una etapa de transición profunda te prepara para un renacimiento espiritual.",
    "230": "Tu expresión creativa y tu espiritualidad se combinan para brindarte grandes satisfacciones.",
    "231": "Mantén pensamientos alegres y optimistas; estás co-creando un futuro luminoso.",
    "232": "La fe inquebrantable te permite superar cualquier obstáculo con gracia y ligereza.",
    "233": "Los maestros ascendidos te envían amor y apoyo para que expreses tu verdad sin miedo.",
    "234": "Los ángeles y seres de luz supervisan tus pasos y te otorgan paz mental.",
    "235": "Acepta los cambios con una sonrisa; forman parte de tu evolución natural.",
    "236": "El amor incondicional es la respuesta a cualquier conflicto que estés atravesando.",
    "237": "Has escuchado a tu guía interior con atención y estás tomando decisiones acertadas.",
    "238": "Tus finanzas y proyectos creativos reciben un impulso energético muy favorable.",
    "239": "Confía en que tus talentos únicos son necesarios para ayudar a otros en este momento.",
    "240": "Dios y los ángeles sostienen tu vida, brindándote una profunda sensación de seguridad.",
    "241": "Mantén una actitud positiva y optimista respecto a tus metas a largo plazo.",
    "242": "Confía en que tus ángeles custodian cada uno de tus pasos y decisiones.",
    "243": "La comunicación sincera con tus guías espirituales te otorga respuestas claras.",
    "244": "Un fuerte ejército de ángeles te rodea para protegerte y darte estabilidad absoluta.",
    "245": "Los cambios que estás implementando estabilizan tu vida de forma positiva.",
    "246": "Tus necesidades materiales están siendo cubiertas mientras te enfocas en tu paz.",
    "247": "Estás siguiendo el camino correcto gracias a tu dedicación y discernimiento.",
    "248": "La constancia en tus esfuerzos atrae estabilidad financiera y emocional duradera.",
    "249": "Un ciclo de trabajo duro llega a su recompensa, trayendo orden y tranquilidad.",
    "250": "Los cambios que experimentas mejoran tu calidad de vida y tu bienestar general.",
    "251": "Visualiza el resultado positivo que deseas; tus pensamientos moldean tu realidad.",
    "252": "Mantén la fe firme mientras atraviesas esta transición llena de oportunidades.",
    "253": "Los ángeles te ayudan a liberar viejos hábitos para dar paso a una vida más plena.",
    "254": "Tu esfuerzo constante crea bases seguras para los cambios que estás viviendo.",
    "255": "Prepárate para sorpresas agradables y cambios dinámicos que renovarán tu energía.",
    "256": "El equilibrio entre tu vida personal y tus metas se restablece armoniosamente.",
    "257": "Tu intuición te está mostrando exactamente qué decisiones tomar ante el cambio.",
    "258": "Los cambios financieros son positivos si mantienes una mentalidad de abundancia.",
    "259": "Deja ir lo viejo con amor; lo nuevo que llega es mucho más afín a ti.",
    "260": "Confía en que tus necesidades cotidianas están cuidadas por el universo.",
    "261": "Mantén pensamientos positivos sobre tu hogar, tu familia y tu economía.",
    "262": "La armonía y el amor reinan en tus espacios cuando liberas preocupaciones.",
    "263": "Los maestros ascendidos te ayudan a mantener la paz en momentos de duda.",
    "264": "Los ángeles te brindan consuelo y estabilidad en el plano emocional y material.",
    "265": "Un enfoque renovado te ayuda a superar cualquier bache en tus relaciones.",
    "266": "Libera la necesidad de control excesivo y confía en el flujo natural de la vida.",
    "267": "Tus reflexiones internas te conducen hacia soluciones prácticas y amorosas.",
    "268": "La prosperidad llega a tu hogar gracias a una actitud receptiva y agradecida.",
    "269": "Cierra las puertas al pasado con gratitud y abre tu corazón al presente.",
    "270": "Estás sintonizando con una frecuencia espiritual muy elevada y pura.",
    "271": "Tus afirmaciones positivas están manifestando milagros cotidianos en tu camino.",
    "272": "Mantén la confianza inquebrantable; tus oraciones están siendo escuchadas y respondidas.",
    "273": "Los maestros ascendidos guían tu inspiración hacia proyectos llenos de luz.",
    "274": "Los ángeles aplauden tu dedicación espiritual y tu constancia en el bien.",
    "275": "Has tomado decisiones sabias que transforman positivamente tu espiritualidad.",
    "276": "Tu paz interior es el reflejo de tu conexión genuina con lo divino.",
    "277": "Estás en un momento de profunda gracia espiritual; mantén tu mente elevada.",
    "278": "La abundancia espiritual se manifiesta también como bienestar en tu día a día.",
    "279": "Has completado una fase de estudio o crecimiento espiritual muy importante.",
    "280": "Dios bendice tus esfuerzos económicos y te guía hacia inversiones sabias.",
    "281": "Mantén una visión optimista sobre tu economía; lo mejor está por venir.",
    "282": "Confía en que tus finanzas están respaldadas por el flujo universal de la abundancia.",
    "283": "Los maestros ascendidos apoyan tus metas profesionales y materiales.",
    "284": "Los ángeles te ayudan a estructurar tus finanzas para lograr total tranquilidad.",
    "285": "Un cambio favorable se manifiesta en tu situación económica o laboral.",
    "286": "Suelta las preocupaciones sobre el dinero; la provisión divina nunca falla.",
    "287": "Tu intuición financiera es certera; escucha las corazonadas sobre tus recursos.",
    "288": "Una gran ola de prosperidad y abundancia material llega a tu vida.",
    "289": "Estás concluyendo un ciclo de escasez para abrirte a una abundancia permanente.",
    "290": "Confía en que el cierre de este ciclo financiero o laboral es para tu mayor bien.",
    "291": "Mantén pensamientos positivos mientras se abren nuevas puertas profesionales.",
    "292": "Suelta con amor aquello que ya cumplió su ciclo y avanza con confianza.",
    "293": "Los maestros ascendidos te guían para soltar cargas pesadas y renovar tu energía.",
    "294": "Los ángeles te envuelven en su luz para protegerte durante los momentos de cierre.",
    "295": "Un cambio necesario te libera de situaciones estancadas o restrictivas.",
    "296": "Perdona y libérate del pasado; la paz te aguarda en el momento presente.",
    "297": "Has aprendido grandes lecciones espirituales; es hora de avanzar con sabiduría.",
    "298": "Una etapa de vacas flacas queda atrás definitivamente; la abundancia se instala.",
    "299": "Prepárate para un renacimiento total; lo viejo se va para que brille lo nuevo.",

    // 300 - 399
    "300": "Dios y la Santísima Trinidad (o tus guías principales) te rodean con amor y poder creativo.",
    "301": "Mantén tus pensamientos elevados y llenos de optimismo divino.",
    "302": "Confía en que la divinidad está colaborando activamente en tus proyectos.",
    "303": "Los maestros ascendidos caminan a tu lado, guiando cada una de tus palabras y acciones.",
    "304": "Los ángeles y seres de luz sostienen la estructura de tu vida espiritual.",
    "305": "Un cambio bendecido por el cielo transforma positivamente tu perspectiva.",
    "306": "Entrega tus preocupaciones a los maestros ascendidos y recibe su paz.",
    "307": "Estás sintonizando con la verdad divina; confía plenamente en tu discernimiento.",
    "308": "La abundancia divina fluye hacia ti a través de tu conexión espiritual.",
    "309": "Un ciclo de servicio o misión de vida se renueva con gran energía.",
    "310": "Trabaja junto al cielo para mantener tus pensamientos centrados en el amor.",
    "311": "Tus pensamientos creativos están potenciados por la energía de los maestros ascendidos.",
    "312": "Mantén una fe absoluta; el cielo está obrando tras bastidores por ti.",
    "313": "Los maestros ascendidos te infunden entusiasmo y alegría para seguir adelante.",
    "314": "Los ángeles te ayudan a mantener tus proyectos creativos organizados y firmes.",
    "315": "Los cambios que experimentas están alineados con tu más alto propósito divino.",
    "316": "Afirma que tu hogar y tu mente están llenos de paz y armonía celestial.",
    "317": "Vas por el camino espiritual correcto; continúa escuchando a tus guías.",
    "318": "La prosperidad es el resultado natural de alinear tu trabajo con tu pasión divina.",
    "319": "Los maestros ascendidos te apoyan para que cumplas tu misión con alegría.",
    "320": "Confía en que Dios y los ángeles están respondiendo a tus peticiones con amor.",
    "321": "Mantén una actitud alegre y confiada; los milagros están en camino.",
    "322": "La fe mueve montañas. Cree firmemente en el poder de tus oraciones.",
    "323": "Los maestros ascendidos multiplican tus esfuerzos creativos y comunicativos.",
    "324": "Los ángeles te brindan un refugio de paz y protección inquebrantable.",
    "325": "Acepta los cambios con entusiasmo; el cielo te guía hacia algo mejor.",
    "326": "Entrega cualquier ansiedad a los maestros ascendidos y recupera la calma.",
    "327": "Tu conexión espiritual es fuerte y clara; confía en las revelaciones que recibes.",
    "328": "La abundancia material y espiritual se manifiesta gracias a tu fe inquebrantable.",
    "329": "Estás siendo guiado/a a dejar ir lo antiguo para abrazar tu verdadera vocación.",
    "330": "Dios y los maestros ascendidos te bendicen con una creatividad ilimitada.",
    "331": "Utiliza palabras de amor y optimismo para co-crear una realidad hermosa.",
    "332": "Mantén la paz en tu corazón; todo está saliendo de la manera perfecta.",
    "333": "Gran número maestro: Los maestros ascendidos están contigo, ofreciéndote amor, guía y protección total.",
    "334": "Los ángeles y los maestros ascendidos apoyan tus sueños y te otorgan estabilidad.",
    "335": "Los cambios positivos que deseas están siendo asistidos directamente desde el plano celestial.",
    "336": "Pide ayuda a los maestros ascendidos para sanar cualquier conflicto emocional.",
    "337": "Tu intuición está alineada con la sabiduría divina; confía plenamente en ella.",
    "338": "La riqueza espiritual y material es tu derecho divino; recíbela con gratitud.",
    "339": "Estás plenamente capacitado/a para cumplir tu misión de luz en este mundo.",
    "340": "Dios, los ángeles y los maestros ascendidos te rodean con su amor protector.",
    "341": "Mantén tus pensamientos enfocados en soluciones constructivas y divinas.",
    "342": "Confía en que tus ángeles guardianes respaldan cada meta que te propones.",
    "343": "Los maestros ascendidos te ayudan a sanar la impaciencia y a confiar en los tiempos.",
    "344": "Una legión de ángeles trabaja incansablemente para brindarte seguridad y orden.",
    "345": "Los cambios que realizas están protegidos y guiados por seres de alta vibración.",
    "346": "Entrega tus cargas materiales a los ángeles y descansa en su amor.",
    "347": "Estás recibiendo una guía espiritual muy precisa; préstale atención.",
    "348": "La disciplina espiritual combinada con la guía de los maestros atrae gran prosperidad.",
    "349": "Un ciclo de aprendizaje concluye con la bendición y el amparo del cielo.",
    "350": "Los cambios que experimentas están bendecidos por la divinidad; fluye con ellos.",
    "351": "Visualiza un futuro lleno de luz; los maestros ascendidos apoyan tus visiones.",
    "352": "Mantén la fe inquebrantable mientras el universo reorganiza las piezas para ti.",
    "353": "Los maestros ascendidos renuevan tu energía vital y tu entusiasmo por vivir.",
    "354": "Los ángeles estructuran tus cambios para que sean seguros y estables.",
    "355": "Una ola de cambios expansivos y liberadores llega impulsada por el cielo.",
    "356": "Permite que la guía divina disuelva cualquier preocupación económica o familiar.",
    "357": "Tu intuición es un canal directo de la sabiduría de los maestros ascendidos.",
    "358": "Los cambios profesionales o financieros que experimentas son altamente prósperos.",
    "359": "Libera el pasado con la certeza de que el cielo te guía hacia horizontes mejores.",
    "360": "Dios y los maestros ascendidos cuidan de ti y de tus seres queridos amorosamente.",
    "361": "Mantén pensamientos de gratitud y amor para elevar tu vibración instantáneamente.",
    "362": "Confía en que las relaciones en tu vida están siendo sanadas por intervención divina.",
    "363": "Los maestros ascendidos llenan tu hogar de alegría, paz y entendimiento mutuo.",
    "364": "Los ángeles te sostienen en los momentos de estrés, devolviéndote la serenidad.",
    "365": "Un cambio de perspectiva te ayuda a ver la bendición oculta en una situación difícil.",
    "366": "Suelta el peso de la perfección; entrégate al amor incondicional del creador.",
    "367": "Tus reflexiones espirituales te brindan una paz profunda y respuestas claras.",
    "368": "La generosidad y el agradecimiento abren las puertas de la abundancia en tu hogar.",
    "369": "Un ciclo emocional pesado se disipa gracias al amor de los maestros ascendidos.",
    "370": "Estás conectado/a con fuentes de sabiduría divina muy elevadas y luminosas.",
    "371": "Tus afirmaciones positivas están creando un escudo de protección espiritual a tu alrededor.",
    "372": "Mantén una fe firme; las respuestas que esperabas están llegando milagrosamente.",
    "373": "Los maestros ascendidos celebran tu dedicación al camino del despertar y la luz.",
    "374": "Los ángeles avalan tus esfuerzos espirituales y te conceden paz interior.",
    "375": "Has tomado decisiones muy acertadas que elevan tu frecuencia vibratoria.",
    "376": "Tu paz mental es un testimonio de tu madurez espiritual y tu confianza en Dios.",
    "377": "Estás recibiendo una bendición espiritual extraordinaria; acógela con humildad.",
    "378": "La sabiduría divina te guía hacia fuentes legítimas de prosperidad y bienestar.",
    "379": "Un ciclo de estudio o búsqueda espiritual culmina con gran iluminación interior.",
    "380": "Dios y los maestros ascendidos bendicen tus finanzas y te abren caminos de abundancia.",
    "381": "Mantén una actitud mental de prosperidad; el cielo respalda tus proyectos.",
    "382": "Confía en que tus necesidades económicas son atendidas por el flujo divino.",
    "383": "Los maestros ascendidos multiplican tus recursos cuando los compartes con amor.",
    "384": "Los ángeles organizan tu economía para que experimentes total tranquilidad.",
    "385": "Un cambio favorable en tus ingresos se aproxima gracias a la guía celestial.",
    "386": "Suelta la ansiedad por el dinero; entrégaselo a los maestros ascendidos.",
    "387": "Tu intuición te guía hacia inversiones o decisiones financieras sumamente sabias.",
    "388": "Una bendición de abundancia múltiple desciende sobre ti; sé agradecido/a.",
    "389": "Un ciclo de limitaciones económicas llega a su fin definitivo bajo la gracia divina.",
    "390": "Los maestros ascendidos te ayudan a cerrar ciclos con amor y a abrirte a lo nuevo.",
    "391": "Visualiza tus metas cumplidas; el cielo alinea las circunstancias para ti.",
    "392": "Confía en que cada final en tu vida está orquestado por el amor divino.",
    "393": "Los maestros ascendidos te liberan de ataduras del pasado para que despliegues tus alas.",
    "394": "Los ángeles te protegen amorosamente mientras transitas el cierre de esta etapa.",
    "395": "Un cambio liberador te saca de una situación estancada y abre nuevos horizontes.",
    "396": "Perdona el pasado y entrégaselo al creador; la paz vuelve a habitar en ti.",
    "397": "Has comprendido lecciones espirituales profundas; tu alma ha evolucionado.",
    "398": "Un ciclo de escasez o esfuerzo extremo concluye, dando paso a la prosperidad.",
    "399": "Prepárate para un despertar luminoso; lo viejo se disipa ante la luz del nuevo ciclo.",

    // 400 - 499
    "400": "Dios y las huestes angelicales te rodean con un amor inmenso y protección absoluta.",
    "401": "Mantén tus pensamientos enfocados en la seguridad, el orden y la fe divina.",
    "402": "Confía en que los ángeles están coordinando los detalles invisibles para ayudarte.",
    "403": "Los maestros ascendidos y los ángeles trabajan unidos para darte paz y claridad.",
    "404": "Un mensaje de profunda protección: los ángeles edifican una fortaleza de luz a tu alrededor.",
    "405": "Los ángeles te guían a través de los cambios necesarios para tu estabilidad.",
    "406": "Entrega tus preocupaciones hogareñas o materiales a los ángeles custodios.",
    "407": "Estás recibiendo guía directa de tus ángeles; confía en tus corazonadas.",
    "408": "La abundancia y la estabilidad material están custodiadas por tus guías celestiales.",
    "409": "Los ángeles te ayudan a cerrar ciclos con suavidad y a estructurar lo nuevo.",
    "410": "Trabaja junto a tus ángeles para mantener una actitud optimista y constructiva.",
    "411": "Pide a tus ángeles ideas claras y pensamientos constructivos para iniciar proyectos.",
    "412": "Mantén la fe; tus ángeles están haciendo milagros discretos en tu vida diaria.",
    "413": "Los ángeles y maestros ascendidos bendicen tu creatividad y tu capacidad de trabajo.",
    "414": "Los ángeles del orden y la disciplina organizan tu vida para darte máxima estabilidad.",
    "415": "Los cambios que experimentas están respaldados por una sólida protección angelical.",
    "416": "Permite que los ángeles disuelvan el estrés y lleven paz a tu hogar y familia.",
    "417": "Tus decisiones sensatas y alineadas cuentan con la aprobación y el amparo del cielo.",
    "418": "La constancia y el respaldo de los ángeles atraen estabilidad económica duradera.",
    "419": "Un ciclo estructurado concluye de manera ordenada gracias a la asistencia celestial.",
    "420": "Dios y los ángeles llenan tu corazón de una paz inquebrantable y confianza ciega.",
    "421": "Mantén afirmaciones positivas sobre tu seguridad y tu futuro; los ángeles te escuchan.",
    "422": "Una señal muy poderosa de tus ángeles: estás completamente a salvo y protegido/a.",
    "423": "Los maestros ascendidos y los ángeles apoyan cada palabra y proyecto que inicias.",
    "424": "Los ángeles multiplican su presencia a tu alrededor para garantizar tu bienestar y calma.",
    "425": "Los cambios que se avecinan están firmemente cimentados y protegidos por el cielo.",
    "426": "No temas por el mañana; tus ángeles proveen todo lo necesario para tu hogar.",
    "427": "Tu intuición aguda es el resultado de la comunicación constante con tus ángeles.",
    "428": "La cooperación y el esfuerzo honesto están siendo bendecidos con abundancia segura.",
    "429": "Un ciclo de trabajo arduo llega a un puerto seguro y ordenado.",
    "430": "Dios y los maestros ascendidos responden a tus oraciones con soluciones prácticas.",
    "431": "Mantén la mente clara y optimista; los ángeles ordenan tus prioridades.",
    "432": "Confía plenamente en que el cielo tiene el control absoluto de tu situación.",
    "433": "Los maestros ascendidos y los ángeles te arropan con su amor y sabiduría infinita.",
    "434": "Los ángeles sostienen tus pasos firmemente para que no tropieces con la duda.",
    "435": "Los cambios necesarios se realizan con suavidad y orden gracias a la ayuda celestial.",
    "436": "Entrega cualquier fricción familiar o laboral a los ángeles de la armonía.",
    "437": "Estás interpretando correctamente las señales del cielo; sigue adelante con seguridad.",
    "438": "La estabilidad financiera llega a ti mediante el trabajo disciplinado y la gracia divina.",
    "439": "Un ciclo estructurado llega a su fin, dejándote bases sólidas para el futuro.",
    "440": "Dios y los ángeles celestiales te otorgan una protección y fortaleza imbatibles.",
    "441": "Mantén una perspectiva práctica y positiva; los ángeles estructuran tus metas.",
    "442": "Confía en la presencia tangible de tus ángeles guardianes en este preciso instante.",
    "443": "Los maestros ascendidos y los ángeles colaboran para darte soluciones firmes.",
    "444": "Número de máxima protección y solidez: Los ángeles te rodean por completo, asegurándote que estás en el camino correcto y a salvo.",
    "445": "Los cambios que estás implementando cuentan con el respaldo firme del reino angélico.",
    "446": "Tu hogar está blindado por luz angélica; respira con total tranquilidad.",
    "447": "Estás haciendo un trabajo espiritual y físico impecable; los ángeles te felicitan.",
    "448": "La prosperidad y la seguridad material están firmemente establecidas en tu vida.",
    "449": "Un ciclo de gran esfuerzo constructivo concluye con éxito absoluto y orden.",
    "450": "Los cambios que experimentas están guiados amorosamente por tus ángeles custodios.",
    "451": "Visualiza el éxito y la estabilidad; tus pensamientos positivos son órdenes para el cielo.",
    "452": "Mantén la fe inquebrantable mientras los ángeles reorganizan tu realidad para bien.",
    "453": "Los maestros ascendidos y los ángeles renuevan tus fuerzas físicas y mentales.",
    "454": "Una fuerte estructura angelical sostiene tus nuevos proyectos y decisiones de cambio.",
    "455": "Grandes cambios dinámicos y positivos ocurren bajo la estricta custodia del cielo.",
    "456": "El orden divino se manifiesta en tu vida, equilibrando tus finanzas y tu hogar.",
    "457": "Tu intuición certera es una bendición de los ángeles que te acompañan en el cambio.",
    "458": "Los cambios económicos son estables y prósperos si actúas con prudencia y fe.",
    "459": "Libera con gratitud los viejos esquemas; los ángeles te preparan un terreno firme.",
    "460": "Dios y tus ángeles proveen para todas tus necesidades materiales y cotidianas.",
    "461": "Mantén pensamientos de abundancia y orden en tu entorno familiar y laboral.",
    "462": "Confía en que tus relaciones y tu economía están siendo sanadas por los ángeles.",
    "463": "Los maestros ascendidos y los ángeles disuelven tus preocupaciones económicas.",
    "464": "La estabilidad en el hogar y la seguridad material están garantizadas por el cielo.",
    "465": "Un cambio positivo en tus hábitos cotidianos mejora notablemente tu calidad de vida.",
    "466": "Suelta la tendencia a controlarlo todo; deja que los ángeles organicen tu día.",
    "467": "Tus decisiones prácticas están bendecidas y guiadas por la sabiduría celestial.",
    "468": "La prosperidad y el orden financiero llegan a tu vida de manera constante.",
    "469": "Un ciclo de preocupaciones materiales concluye definitivamente gracias al auxilio angelical.",
    "470": "Estás sintonizando con una guía celestial muy pura que te otorga gran discernimiento.",
    "471": "Tus afirmaciones y pensamientos constructivos atraen milagros cotidianos a tu vida.",
    "472": "Mantén la confianza; los ángeles están abriendo puertas que creías cerradas.",
    "473": "Los maestros ascendidos respaldan tu búsqueda de la verdad y la estabilidad.",
    "474": "Los ángeles validan tu esfuerzo constante y te coronan con paz interior.",
    "475": "Tus decisiones espirituales y prácticas traen cambios sumamente beneficiosos.",
    "476": "Tu paz mental es el reflejo de una vida ordenada y protegida por los ángeles.",
    "477": "Estás recibiendo una doble porción de gracia espiritual y protección angélica.",
    "478": "La sabiduría divina y el esfuerzo disciplinado atraen riqueza y bienestar duraderos.",
    "479": "Un ciclo de aprendizaje y construcción disciplinada llega a una conclusión exitosa.",
    "480": "Dios y los ángeles bendicen tus finanzas, asegurando provisión y estabilidad.",
    "481": "Mantén una actitud optimista respecto al dinero; tus ángeles respaldan tu economía.",
    "482": "Confía en que los recursos necesarios llegan a ti en el momento exacto.",
    "483": "Los maestros ascendidos y los ángeles te ayudan a manifestar estabilidad material.",
    "484": "Los ángeles del orden financiero organizan tus cuentas para darte tranquilidad.",
    "485": "Un cambio favorable en tu trabajo o fuentes de ingresos se manifiesta ahora.",
    "486": "Suelta la escasez mental; los ángeles cubren holgadamente todas tus necesidades.",
    "487": "Tu intuición te guía hacia decisiones económicas sumamente seguras y acertadas.",
    "488": "Una poderosa bendición de abundancia y estabilidad material se instala en tu vida.",
    "489": "Un ciclo de limitaciones económicas se disipa por completo bajo la gracia del cielo.",
    "490": "Los ángeles te ayudan a cerrar etapas laborales o financieras con orden y paz.",
    "491": "Visualiza un futuro próspero y seguro; el cielo materializa tus visiones.",
    "492": "Confía en que cada final de ciclo económico abre una puerta mejor estructurada.",
    "493": "Los maestros ascendidos y los ángeles te liberan de cargas financieras pesadas.",
    "494": "Los ángeles te arropan con seguridad mientras reestructuras tu vida y proyectos.",
    "495": "Un cambio liberador te saca de estructuras obsoletas y te otorga libertad segura.",
    "496": "Perdona el pasado económico o laboral; la providencia divina te cuida.",
    "497": "Has adquirido gran madurez; los ángeles celebran tu estabilidad emocional.",
    "498": "Un ciclo de esfuerzo material prolongado culmina con una recompensa sólida.",
    "499": "Prepárate para un nuevo comienzo lleno de orden, seguridad y bendiciones celestiales.",

    // 500 - 599
    "500": "Dios y el universo apoyan plenamente los cambios profundos que estás experimentando.",
    "501": "Mantén pensamientos positivos ante los cambios; ellos determinan tu nuevo rumbo.",
    "502": "Confía en que los cambios en tu vida se desarrollan en perfecto orden divino.",
    "503": "Los maestros ascendidos te infunden valentía para abrazar las nuevas transformaciones.",
    "504": "Los ángeles te protegen y estabilizan mientras atraviesas una etapa de cambios.",
    "505": "Una poderosa vibración de cambio y libertad se apodera positivamente de tu vida.",
    "506": "Permite que Dios disuelva tus temores respecto a los cambios inevitables.",
    "507": "Tu intuición te indica que este cambio es exactamente lo que necesitabas.",
    "508": "Los cambios que experimentas traen consigo una nueva y renovada abundancia.",
    "509": "Una etapa se transforma radicalmente para dar paso a tu verdadera evolución.",
    "510": "Trabaja junto al cielo para que tus adaptaciones a los cambios sean armoniosas.",
    "511": "Nuevos pensamientos positivos generan cambios veloces y favorables en tu realidad.",
    "512": "Mantén la fe firme; cada cambio por el que pasas tiene un propósito divino.",
    "513": "Los maestros ascendidos te ayudan a canalizar tu creatividad durante la transición.",
    "514": "Los ángeles estructuran tus nuevos planes para que los cambios sean seguros.",
    "515": "Acepta la transformación con entusiasmo; tu vida se está renovando para mejor.",
    "516": "El equilibrio emocional es clave mientras asimilas las nuevas circunstancias.",
    "517": "Tu percepción certera te confirma que los cambios actuales son muy positivos.",
    "518": "Los cambios profesionales o financieros abren canales de prosperidad inéditos.",
    "519": "Un ciclo se transforma por completo, liberándote de ataduras antiguas.",
    "520": "Confía en el plan divino; los cambios que ocurren son para tu máxima evolución.",
    "521": "Mantén una actitud optimista; tus expectativas positivas aceleran el cambio benéfico.",
    "522": "Ten absoluta confianza en el proceso de transformación que estás viviendo ahora.",
    "523": "Los maestros ascendidos te acompañan de la mano en esta transición importante.",
    "524": "Los ángeles custodian cada paso que das en esta nueva e inexplorada etapa.",
    "525": "Los cambios se multiplican a tu alrededor; fluye con ellos sin resistencia.",
    "526": "El amor y la fe calman cualquier incertidumbre frente a las nuevas situaciones.",
    "527": "Tu intuición te guía con absoluta precisión a través de esta metamorfosis.",
    "528": "La abundancia se adapta a tu nueva realidad; confía en el flujo de la vida.",
    "529": "Un ciclo antiguo se disuelve con gracia para dejar espacio a tu renovación.",
    "530": "Dios y los maestros ascendidos bendicen y protegen tus procesos de cambio.",
    "531": "Expresa tus ideas de transformación con optimismo; el cielo las respalda.",
    "532": "Mantén la paz mental; los cambios se están acomodando de manera perfecta.",
    "533": "Los maestros ascendidos te inyectan energía vital para adaptarte a lo nuevo.",
    "534": "Los ángeles y maestros te brindan estabilidad en medio de la gran mudanza vital.",
    "535": "Una ráfaga de cambios liberadores renueva tu espíritu y tus horizontes.",
    "536": "Entrega tus inquietudes de cambio a los maestros ascendidos y recibe su paz.",
    "537": "Estás aprendiendo lecciones de flexibilidad muy valiosas para tu crecimiento.",
    "538": "Los cambios económicos y laborales que experimentas son altamente prósperos.",
    "539": "Un ciclo de estancamiento se rompe definitivamente; prepárate para avanzar.",
    "540": "Dios y tus ángeles resguardan tu seguridad mientras transformas tu estilo de vida.",
    "541": "Mantén la mente clara y práctica; los cambios estructurados son duraderos.",
    "542": "Confía en que los ángeles organizan los detalles de tu transformación con esmero.",
    "543": "Los maestros ascendidos y los ángeles apoyan tus decisiones de cambio radical.",
    "544": "Una fuerte estructura angélica te sostiene mientras experimentas una metamorfosis.",
    "545": "Los cambios profundos y seguros se instalan en tu rutina diaria para tu bien.",
    "546": "Permite que los ángeles organicen tu hogar y tus prioridades en esta transición.",
    "547": "Tus decisiones sensatas ante el cambio cuentan con la total aprobación del cielo.",
    "548": "La disciplina combinada con la adaptabilidad atrae una prosperidad muy sólida.",
    "549": "Un ciclo estructurado se transforma de manera ordenada y segura.",
    "550": "Dios apoya directamente los cambios radicales y positivos que estás haciendo.",
    "551": "Visualiza resultados extraordinarios; tus pensamientos positivos guían la transformación.",
    "552": "Mantén la fe intacta mientras el universo rediseña tu camino de forma brillante.",
    "553": "Los maestros ascendidos te otorgan la fuerza necesaria para adaptarte con alegría.",
    "554": "Los ángeles edifican un puente seguro para que cruces hacia tu nueva realidad.",
    "555": "Número de transformación total: Grandes cambios positivos e inesperados se precipitan en tu vida. Prepárate y fluye con libertad.",
    "556": "El equilibrio y la armonía se restablecen rápidamente tras los recientes cambios.",
    "557": "Tu intuición te grita que vas por el camino correcto de la renovación.",
    "558": "Una ola de prosperidad acompaña los cambios financieros o laborales que realizas.",
    "559": "Libera el pasado por completo; la energía del cambio te catapulta a la libertad.",
    "560": "Dios cuida de ti y de tus necesidades materiales durante esta etapa de mudanza o cambio.",
    "561": "Mantén pensamientos optimistas sobre tu economía y tus nuevos proyectos de vida.",
    "562": "Confía en que tus vínculos afectivos se fortalecen y adaptan maravillosamente.",
    "563": "Los maestros ascendidos disuelven cualquier temor al fracaso frente a lo nuevo.",
    "564": "Los ángeles te otorgan estabilidad emocional y material en medio de la transición.",
    "565": "Un cambio rotundo en tus hábitos cotidianos te devuelve la salud y el bienestar.",
    "566": "Suelta el apego a lo familiar; lo desconocido trae bendiciones mucho mayores.",
    "567": "Tus decisiones prácticas y flexibles te conducen hacia un éxito rotundo.",
    "568": "La abundancia fluye con facilidad cuando te abres a nuevas formas de generar ingresos.",
    "569": "Un ciclo de limitaciones económicas se transforma en una etapa de holgura.",
    "570": "Tu despertar espiritual se acelera gracias a los profundos cambios que atraviesas.",
    "571": "Tus afirmaciones positivas atraen experiencias de transformación muy elevadas.",
    "572": "Mantén la confianza; los cambios espirituales que vives te acercan a tu divinidad.",
    "573": "Los maestros ascendidos guían tus pasos hacia un entendimiento superior de la vida.",
    "574": "Los ángeles bendicen tu transformación interior y te otorgan absoluta paz.",
    "575": "Estás experimentando un cambio cuántico en tu vibración y en tu forma de ver el mundo.",
    "576": "Tu paz interior se consolida a medida que aceptas la metamorfosis espiritual.",
    "577": "Una gracia divina especial acompaña cada paso de tu profunda transformación.",
    "578": "La sabiduría espiritual se alinea con tu renovación material y profesional.",
    "579": "Un ciclo de aprendizaje intensivo concluye, revelando una versión tuya totalmente renovada.",
    "580": "Dios bendice tus nuevas iniciativas económicas y profesionales con total prosperidad.",
    "581": "Mantén una visión de éxito financiero; los cambios que haces son muy acertados.",
    "582": "Confía en que los recursos económicos se renuevan y multiplican a tu favor.",
    "583": "Los maestros ascendidos apoyan tus proyectos de cambio en el plano laboral.",
    "584": "Los ángeles estructuran tus nuevas fuentes de ingresos para darte total estabilidad.",
    "585": "Un cambio drástico y muy favorable en tu economía o profesión se manifiesta ahora.",
    "586": "Suelta la ansiedad por el dinero; la transformación actual trae bendición económica.",
    "587": "Tu intuición comercial o profesional te guía hacia oportunidades extraordinarias.",
    "588": "Una poderosa corriente de abundancia inunda tu nueva etapa de vida.",
    "589": "Un ciclo de escasez se transforma definitivamente en una fuente inagotable de recursos.",
    "590": "Los cambios actuales te liberan de situaciones laborales o económicas obsoletas.",
    "591": "Visualiza tu nueva vida con entusiasmo; el universo materializa tus anhelos de cambio.",
    "592": "Confía en que el cierre de esta etapa y tu consiguiente cambio son un regalo divino.",
    "593": "Los maestros ascendidos te liberan de amarras del pasado para que vueles alto.",
    "594": "Los ángeles te protegen amorosamente mientras te desprendes de lo antiguo.",
    "595": "Una transformación liberadora te otorga una segunda oportunidad para brillar con fuerza.",
    "596": "Perdona tus errores del pasado; el cambio actual te permite empezar de cero con honor.",
    "597": "Has madurado enormemente; tu capacidad de adaptación es tu mayor superpoder espiritual.",
    "598": "Un ciclo de esfuerzo transformador rinde frutos maravillosos y abundantes.",
    "599": "Prepárate para un renacimiento absoluto; la puerta hacia tu versión más elevada está abierta.",

    // 600 - 699
    "600": "Dios llena tu hogar, tus emociones y tus relaciones de un amor puro e incondicional.",
    "601": "Mantén pensamientos amorosos y positivos respecto a tu familia y tu entorno.",
    "602": "Confía en que el amor divino está sanando cualquier aspereza en tus vínculos.",
    "603": "Los maestros ascendidos te ayudan a expresar tus sentimientos desde la compasión.",
    "604": "Los ángeles envuelven tu hogar en un manto de protección y paz infinita.",
    "605": "Un cambio positivo en tu dinámica emocional mejora notablemente tus relaciones.",
    "606": "Enfoca tu atención en el amor y en tu crecimiento espiritual, equilibrando lo material.",
    "607": "Tu intuición amorosa te indica cómo sanar una situación familiar delicada.",
    "608": "La abundancia llega a tu hogar cuando priorizas la paz y la armonía por encima de todo.",
    "609": "Una etapa de malentendidos emocionales llega a su fin, dando lugar al entendimiento.",
    "610": "Trabaja junto al cielo para mantener vibraciones de amor y gratitud en tu día a día.",
    "611": "Tus pensamientos enfocados en el bienestar familiar generan milagros de armonía.",
    "612": "Mantén la fe; el amor tiene el poder de transformar cualquier ambiente tenso.",
    "613": "Los maestros ascendidos te inspiran a perdonar y a sanar viejas heridas del corazón.",
    "614": "Los ángeles organizan y protegen tu espacio vital, brindándote un refugio seguro.",
    "615": "Un cambio en tu actitud mental atrae respuestas amorosas de las personas que te rodean.",
    "616": "Nutre tu mente con pensamientos de paz para reflejar armonía en tu hogar.",
    "617": "Tu sensibilidad emocional es una herramienta de empatía muy poderosa y sanadora.",
    "618": "La paz familiar y el equilibrio financiero se retroalimentan positivamente.",
    "619": "Un ciclo de conflictos emocionales se disuelve, abriendo paso a la reconciliación.",
    "620": "Confía en que Dios cuida amorosamente de ti y de cada miembro de tu familia.",
    "621": "Mantén afirmaciones positivas sobre tus relaciones; el amor triunfa siempre.",
    "622": "Una profunda sensación de paz y complicidad amorosa se instala en tus vínculos.",
    "623": "Los maestros ascendidos apoyan tus esfuerzos por llevar paz y alegría a los tuyos.",
    "624": "Los ángeles custodian tu hogar, alejando cualquier energía de discordia o estrés.",
    "625": "Los cambios en tu forma de relacionarte mejoran drásticamente tu bienestar.",
    "626": "El amor incondicional es la clave para resolver cualquier desafío doméstico o afectivo.",
    "627": "Tu intuición te guía hacia gestos de amor y comprensión muy oportunos.",
    "628": "La generosidad y el afecto sincero atraen prosperidad y dicha a tu hogar.",
    "629": "Un ciclo de desapego emocional te enseña el verdadero significado del amor libre.",
    "630": "Dios y los maestros ascendidos bendicen tu hogar con gracia y creatividad desbordante.",
    "631": "Utiliza palabras dulces y constructivas para ungir tus relaciones cotidianas.",
    "632": "Mantén la confianza; los maestros ascendidos obran para armonizar tu entorno.",
    "633": "Los maestros ascendidos te arropan con un amor tan intenso que disuelve cualquier miedo.",
    "634": "Los ángeles y maestros de luz protegen la paz y la estabilidad de tu familia.",
    "635": "Un cambio de aire o de actitud revitaliza la convivencia en tu hogar.",
    "636": "Entrega cualquier drama o preocupación doméstica a los seres de luz.",
    "637": "Tu conexión espiritual te otorga la paciencia necesaria para guiar a tus seres queridos.",
    "638": "El bienestar económico y la felicidad familiar caminan de la mano bajo bendición divina.",
    "639": "Un ciclo de relaciones kármicas pesadas concluye, abriendo espacio a vínculos sanos.",
    "640": "Dios y los ángeles blindan tu hogar con una muralla invisible de amor y seguridad.",
    "641": "Mantén el orden y la limpieza en tu hogar; esto eleva la vibración de paz familiar.",
    "642": "Confía en que tus ángeles resuelven los problemas prácticos de tu vida doméstica.",
    "643": "Los maestros ascendidos y los ángeles te ayudan a mantener la paciencia en el hogar.",
    "644": "Una fuerte presencia angelical garantiza la estabilidad y el refugio seguro de tu casa.",
    "645": "Los cambios estructurales en tu hogar mejoran notablemente la convivencia.",
    "646": "Permite que los ángeles lleven la carga de tus preocupaciones familiares.",
    "647": "Tus decisiones orientadas al bienestar del hogar cuentan con el respaldo celestial.",
    "648": "El trabajo honesto y el amor familiar atraen una estabilidad material duradera.",
    "649": "Un ciclo de tensión doméstica llega a un final ordenado y pacífico.",
    "650": "Dios apoya los cambios que haces para priorizar tu paz emocional y familiar.",
    "651": "Visualiza tu hogar lleno de luz y alegría; tus pensamientos crean esa realidad.",
    "652": "Mantén la fe firme mientras tu familia atraviesa una etapa de adaptación y cambios.",
    "653": "Los maestros ascendidos renuevan la ilusión y el optimismo dentro de tu círculo íntimo.",
    "654": "Los ángeles estructuran un ambiente de paz y cooperación en tu entorno diario.",
    "655": "Grandes cambios positivos renuevan la energía de tu hogar y de tus relaciones.",
    "656": "El equilibrio entre tus obligaciones y tu tiempo afectivo se restablece con éxito.",
    "657": "Tu intuición te enseña a poner límites amorosos pero firmes en tus relaciones.",
    "658": "Los cambios financieros en el hogar se resuelven de manera favorable y armónica.",
    "659": "Libera rencores antiguos; el perdón es la puerta de entrada a tu nueva libertad.",
    "660": "Confía en que Dios suple todas las necesidades emocionales y físicas de tu familia.",
    "661": "Mantén pensamientos elevados y amorosos para evitar caer en preocupaciones materiales.",
    "662": "La fe en el amor divino disuelve cualquier conflicto de pareja o familiar.",
    "663": "Los maestros ascendidos te envuelven en paciencia y comprensión infinita.",
    "664": "Los ángeles custodian tu casa y restauran la paz en cada rincón de tu hogar.",
    "665": "Un cambio de perspectiva te ayuda a valorar lo verdaderamente importante en tus vínculos.",
    "666": "Es una llamada amorosa a equilibrar tus pensamientos materiales con la espiritualidad y el amor, recordando que el Creador atiende cada una de tus necesidades.",
    "667": "Tu intuición te confirma que el amor propio es la base para amar sanamente a otros.",
    "668": "La armonía en tu hogar atrae de forma natural la abundancia y la prosperidad.",
    "669": "Un ciclo de apegos materiales excesivos concluye, priorizando el tesoro del alma y el amor.",
    "670": "Tu espiritualidad se nutre a través de relaciones sinceras, amorosas y conscientes.",
    "671": "Tus afirmaciones de amor y gratitud transforman milagrosamente tus vínculos.",
    "672": "Mantén la confianza; la guía divina está sanando tus relaciones más queridas.",
    "673": "Los maestros ascendidos bendicen tu camino espiritual compartido con seres afines.",
    "674": "Los ángeles premian tu dedicación al amor y te conceden una profunda paz interior.",
    "675": "Estás adoptando una visión espiritual mucho más madura y amorosa de la vida.",
    "676": "Tu paz mental es inquebrantable cuando eliges responder con amor en lugar de miedo.",
    "677": "Una gracia espiritual bendice tus relaciones, otorgándote una profunda complicidad con la luz.",
    "678": "La sabiduría del corazón te guía hacia la verdadera prosperidad material y afectiva.",
    "679": "Un ciclo de búsqueda espiritual orientada al amor y al perdón culmina con éxito.",
    "680": "Dios bendice tus finanzas y te permite disfrutar de un hogar próspero y feliz.",
    "681": "Mantén una actitud optimista respecto a tu economía; el amor atrae la abundancia.",
    "682": "Confía en que los recursos económicos fluyen sin fricciones hacia tu hogar.",
    "683": "Los maestros ascendidos apoyan tus metas financieras cuando buscas el bienestar común.",
    "684": "Los ángeles organizan tu economía para que reine la tranquilidad en tu familia.",
    "685": "Un cambio muy favorable en tus ingresos beneficia directamente a tu hogar.",
    "686": "Suelta la preocupación por el dinero; el amor y la providencia divina nunca fallan.",
    "687": "Tu intuición te orienta hacia decisiones financieras sensatas y profundamente amorosas.",
    "688": "Una poderosa bendición de abundancia y armonía inunda tu hogar y tus finanzas.",
    "689": "Un ciclo de escasez material se disipa definitivamente, dando paso a la holgura.",
    "690": "Los ángeles te asisten para cerrar ciclos familiares o económicos con absoluta paz.",
    "691": "Visualiza tu hogar próspero y en paz; el universo materializa tus deseos del corazón.",
    "692": "Confía en que el cierre de esta etapa trae mayor armonía a tus relaciones.",
    "693": "Los maestros ascendidos te liberan de cargas emocionales o deudas del pasado.",
    "694": "Los ángeles te arropan con seguridad mientras reestructuras tu vida afectiva.",
    "695": "Un cambio liberador mejora sustancialmente el clima emocional de tu hogar.",
    "696": "Perdona el pasado con amor incondicional; la paz vuelve a reinar en tu vida.",
    "697": "Has alcanzado una madurez emocional y espiritual admirable; disfrútala.",
    "698": "Un ciclo de esfuerzo familiar y material culmina con una recompensa maravillosa.",
    "699": "Prepárate para un renacimiento afectivo y espiritual; el pasado queda atrás con amor.",

    // 700 - 799
    "700": "Dios te felicita y te bendice por el camino espiritual luminoso que estás recorriendo.",
    "701": "Mantén tus pensamientos elevados; estás sintonizando con milagros cotidianos.",
    "702": "Confía en que tus oraciones y tu fe están abriendo puertas invisibles maravillosas.",
    "703": "Los maestros ascendidos aplauden tu dedicación y guían tus pasos con precisión.",
    "704": "Los ángeles te rodean para proteger tu luz y tu impecable integridad espiritual.",
    "705": "Un cambio en tu perspectiva espiritual te otorga una libertad interior inmensa.",
    "706": "El equilibrio entre tu vida terrenal y tu devoción espiritual es perfecto.",
    "707": "Número de fuerte bendición divina: Estás en absoluta sintonía con la verdad del universo.",
    "708": "La prosperidad es la consecuencia natural de tu alineación con la abundancia divina.",
    "709": "Una etapa de tu misión de luz se renueva con gran inspiración y sabiduría.",
    "710": "Trabaja codo a codo con el cielo para mantener encendida la llama de tu fe.",
    "711": "Tus pensamientos inspirados están manifestando bendiciones extraordinarias a tu alrededor.",
    "712": "Mantén una fe inquebrantable; los milagros están ocurriendo justo ahora para ti.",
    "713": "Los maestros ascendidos te inspiran a compartir tu sabiduría con amor y alegría.",
    "714": "Los ángeles estructuran tus prácticas espirituales para darte constancia y paz.",
    "715": "Un cambio positivo en tu conciencia eleva tu vibración a niveles muy altos.",
    "716": "Nutre tu mente con lecturas y pensamientos espirituales que te inspiren profundamente.",
    "717": "Tu intuición está afinada a la perfección; confía ciegamente en tus percepciones.",
    "718": "Tu crecimiento espiritual atrae de forma natural abundancia y oportunidades prósperas.",
    "719": "Un ciclo de aprendizaje místico concluye, otorgándote una profunda maestría interior.",
    "720": "Confía en que Dios y el universo respaldan plenamente tus pasos en la luz.",
    "721": "Mantén afirmaciones positivas; estás co-creando un presente lleno de gracia divina.",
    "722": "Ten absoluta fe en el plan divino; las piezas de tu vida encajan a la perfección.",
    "723": "Los maestros ascendidos avalan tus enseñanzas y tu camino de servicio amoroso.",
    "724": "Los ángeles te brindan un santuario de paz para que medites y recargues tu energía.",
    "725": "Los cambios que has hecho en tu espiritualidad transforman tu vida para bien.",
    "726": "El amor divino disipa cualquier duda o sombra que intente nublar tu fe.",
    "727": "Estás sintonizando con una frecuencia de milagros; mantén tu mente receptiva.",
    "728": "La riqueza espiritual se manifiesta también como bienestar y bendiciones materiales.",
    "729": "Estás cumpliendo con gracia tu propósito divino; continúa avanzando con confianza.",
    "730": "Dios y los maestros ascendidos te inundan con una creatividad espiritual desbordante.",
    "731": "Utiliza tu voz y tus palabras para llevar esperanza y luz a quienes te rodean.",
    "732": "Mantén la paz en tu corazón; los maestros ascendidos cuidan de cada detalle tuyo.",
    "733": "Los maestros ascendidos te abrazan amorosamente, confirmando que vas por el buen camino.",
    "734": "Los ángeles y maestros de luz custodian tu práctica espiritual y tu hogar.",
    "735": "Un cambio de hábitos espirituales revitaliza por completo tu energía vital.",
    "736": "Entrega cualquier duda existencial a los maestros ascendidos y recibe claridad.",
    "737": "Tu conexión con los planos sutiles es fuerte, pura y sumamente luminosa.",
    "738": "La alineación con tu misión divina abre las compuertas de la prosperidad.",
    "739": "Un ciclo de servicio o aprendizaje místico se corona con un gran triunfo del alma.",
    "740": "Dios y los ángeles resguardan tu santuario interior y tu evolución espiritual.",
    "741": "Mantén pensamientos optimistas y puros; los ángeles multiplican tu luz.",
    "742": "Confía en que tus ángeles custodian tus proyectos y tu camino de evolución.",
    "743": "Los maestros ascendidos y los ángeles te otorgan respuestas claras a tus oraciones.",
    "744": "Una legión de ángeles protege tu integridad espiritual y te otorga absoluta firmeza.",
    "745": "Los cambios que realizas en tu disciplina espiritual son sumamente acertados.",
    "746": "Permite que los ángeles te liberen de cargas mentales innecesarias.",
    "747": "Estás haciendo un trabajo espiritual extraordinario; los ángeles te aplauden de pie.",
    "748": "La disciplina espiritual y el respaldo angélico atraen estabilidad y bendiciones.",
    "749": "Un ciclo de construcción espiritual llega a una conclusión altamente satisfactoria.",
    "750": "Los cambios radicales en tu vida espiritual están bendecidos por la divinidad.",
    "751": "Visualiza tu luz interior expandiéndose; tus pensamientos positivos son poderosos.",
    "752": "Mantén la fe intacta mientras el universo reorganiza tu vida para elevar tu frecuencia.",
    "753": "Los maestros ascendidos renuevan tu entusiasmo por el autoconocimiento y la verdad.",
    "754": "Los ángeles estructuran un nuevo camino espiritual más libre y luminoso para ti.",
    "755": "Un cambio cuántico en tu percepción te libera de viejos dogmas y limitaciones.",
    "756": "El equilibrio entre tu vida cotidiana y tu práctica espiritual es armónico y sano.",
    "757": "Tu intuición penetrante te permite ver más allá de las apariencias materiales.",
    "758": "Los cambios espirituales atraen bendiciones prósperas a tu vida profesional.",
    "759": "Libera viejas creencias restrictivas; la verdad te otorga una libertad absoluta.",
    "760": "Dios cuida de ti, permitiéndote vivir una espiritualidad práctica, amorosa y feliz.",
    "761": "Mantén pensamientos de amor y gratitud; elevan tu vibración de forma instantánea.",
    "762": "Confía en que el amor divino está sanando tu mente y abriendo tu corazón.",
    "763": "Los maestros ascendidos te inundan de paz, disipando cualquier ansiedad espiritual.",
    "764": "Los ángeles te otorgan un refugio de serenidad en medio del bullicio del mundo.",
    "765": "Un cambio en tu forma de relacionarte con lo sagrado te trae una paz profunda.",
    "766": "Suelta la necesidad de intelectualizar la fe; vívela desde el amor incondicional.",
    "767": "Tu intuición y tu sabiduría interior son faros que iluminan a quienes te rodean.",
    "768": "La armonía espiritual en tu vida atrae de manera natural abundancia y bienestar.",
    "769": "Un ciclo de apegos emocionales concluye, permitiéndote volar hacia la luz pura.",
    "770": "Estás sintonizando con una frecuencia divina excepcional; milagros te rodean.",
    "771": "Tus afirmaciones espirituales se manifiestan en tu realidad con asombrosa rapidez.",
    "772": "Mantén una fe inquebrantable; lo que has pedido en oración ya viene en camino.",
    "773": "Los maestros ascendidos te acompañan de cerca en tu consagración a la luz.",
    "774": "Los ángeles premian tu constancia espiritual otorgándote una gracia especial.",
    "775": "Estás experimentando un salto cuántico en tu evolución espiritual; ¡felicitaciones!",
    "776": "Tu paz mental es la prueba viviente de que tu fe es firme y verdadera.",
    "777": "Número de la gran bendición y el milagro: Has aprendido tus lecciones de vida y el universo te premia con apertura espiritual, suerte y sincronicidad perfecta.",
    "778": "La sabiduría espiritual y la alineación con tu propósito atraen una prosperidad inmensa.",
    "779": "Un ciclo sagrado de aprendizaje culmina, revelando tu verdadera maestría espiritual.",
    "780": "Dios y los maestros ascendidos bendicen tu misión de vida y tu prosperidad material.",
    "781": "Mantén una visión optimista y elevada; el cielo respalda tu prosperidad.",
    "782": "Confía en que tus recursos materiales están asegurados al servir a tu propósito.",
    "783": "Los maestros ascendidos respaldan tus proyectos de servicio y abundancia.",
    "784": "Los ángeles organizan tus metas para que tu misión de luz sea próspera y estable.",
    "785": "Un cambio muy favorable en tu labor espiritual expande tus horizontes y recursos.",
    "786": "Suelta la culpa en torno al dinero; mereces prosperar mientras ayudas a otros.",
    "787": "Tu intuición te guía con certeza hacia oportunidades de abundancia legítima.",
    "788": "Una poderosa bendición de prosperidad material premia tu dedicación espiritual.",
    "789": "Un ciclo de limitaciones financieras concluye al alinear tu trabajo con tu alma.",
    "790": "Los ángeles te ayudan a cerrar etapas con gratitud y a abrirte a tu misión superior.",
    "791": "Visualiza tu misión de luz cumplida con éxito; el cielo materializa tus visiones.",
    "792": "Confía en que cada final en tu camino espiritual abre una puerta de mayor luz.",
    "793": "Los maestros ascendidos te liberan de cargas kármicas para que brilles con fuerza.",
    "794": "Los ángeles te arropan con protección absoluta mientras cumples tu propósito.",
    "795": "Un cambio liberador te impulsa a entregarte por completo a tu vocación espiritual.",
    "796": "Perdona tu pasado; tu luz actual es tan potente que borra cualquier sombra previa.",
    "797": "Has alcanzado un grado de iluminación muy hermoso; confía plenamente en ti.",
    "798": "Tu servicio al mundo genera una cosecha abundante de paz, amor y prosperidad.",
    "799": "Prepárate para un despertar masivo; un ciclo viejo fenece para que tu luz reine.",

    // 800 - 899
    "800": "Dios sustenta tu vida y tus finanzas, abriendo las cataratas de la abundancia infinita.",
    "801": "Mantén pensamientos de prosperidad y fe; el universo te provee en abundancia.",
    "802": "Confía en que tus asuntos económicos y materiales se resuelven de forma milagrosa.",
    "803": "Los maestros ascendidos bendicen tus recursos y multiplican tus esfuerzos materiales.",
    "804": "Los ángeles custodian tu economía y organizan tus finanzas para darte seguridad.",
    "805": "Un cambio favorable y expansivo se manifiesta en tu situación financiera o laboral.",
    "806": "Equilibra tu atención entre la materia y el espíritu; Dios cuida de ambos aspectos.",
    "807": "Tu intuición te guía con precisión hacia decisiones económicas muy acertadas.",
    "808": "Número de la gran abundancia y el infinito: La riqueza material y espiritual fluye hacia ti en cantidades ilimitadas. Administra con sabiduría y gratitud.",
    "809": "Un ciclo de escasez financiera llega a su fin definitivo, abriendo una era próspera.",
    "810": "Trabaja junto al cielo para mantener una mentalidad de riqueza y generosidad.",
    "811": "Tus pensamientos enfocados en la prosperidad atraen oportunidades financieras rápidas.",
    "812": "Mantén una fe absoluta; tus oraciones sobre el dinero han sido escuchadas y respondidas.",
    "813": "Los maestros ascendidos apoyan tus proyectos económicos creativos e innovadores.",
    "814": "Los ángeles estructuran tus finanzas para garantizarte una estabilidad a largo plazo.",
    "815": "Un cambio positivo en tu trabajo o inversiones incrementa notablemente tus ingresos.",
    "816": "Nutre tu mente con confianza económica; la escasez es solo una ilusión temporal.",
    "817": "Tus decisiones financieras intuitivas están bendecidas y guiadas por la luz.",
    "818": "La abundancia constante es tu estado natural; mantén tus pensamientos elevados.",
    "819": "Un ciclo de limitaciones económicas concluye, abriendo paso a la libertad financiera.",
    "820": "Confía en que Dios provee de manera perfecta y puntual para todas tus necesidades.",
    "821": "Mantén afirmaciones positivas de riqueza; estás co-creando un futuro holgado.",
    "822": "Ten absoluta confianza en que tus finanzas están respaldadas por el orden divino.",
    "823": "Los maestros ascendidos multiplican los recursos que utilizas para el bien común.",
    "824": "Los ángeles protegen tu economía de pérdidas y te otorgan total tranquilidad.",
    "825": "Los cambios en tu rumbo profesional o comercial resultan sumamente lucrativos.",
    "826": "El amor y la paz interior atraen con mayor fuerza la prosperidad material.",
    "827": "Tu intuición certera te avisa dónde invertir tiempo, energía y recursos.",
    "828": "Una corriente inagotable de prosperidad y riqueza cruza el umbral de tu vida.",
    "829": "Un ciclo de deudas o apremios económicos llega a una resolución feliz y definitiva.",
    "830": "Dios y los maestros ascendidos bendicen tus manos para crear abundancia próspera.",
    "831": "Expresa gratitud por la riqueza que ya posees; eso atrae aún más bendiciones.",
    "832": "Mantén la paz mental; los maestros ascendidos coordinan tu éxito financiero.",
    "833": "Los maestros ascendidos te colman de bendiciones materiales y espirituales por igual.",
    "834": "Los ángeles y maestros de luz organizan tu economía para darte máxima solidez.",
    "835": "Un cambio expansivo en tus fuentes de ingresos mejora radicalmente tu estilo de vida.",
    "836": "Entrega cualquier ansiedad sobre el dinero a los maestros ascendidos.",
    "837": "Tu conexión espiritual te otorga claridad para tomar decisiones económicas sabias.",
    "838": "La abundancia doble y sostenida te acompaña en cada proyecto que emprendes con fe.",
    "839": "Un ciclo de esfuerzo laboral culmina con una recompensa económica muy jugosa.",
    "840": "Dios y los ángeles blindan tus finanzas y aseguran tu provisión diaria.",
    "841": "Mantén una mentalidad organizada y optimista; el orden atrae al dinero.",
    "842": "Confía en que tus ángeles custodian tus bienes y multiplican tus recursos.",
    "843": "Los maestros ascendidos y los ángeles te ayudan a estructurar negocios prósperos.",
    "844": "Una fuerte estructura angelical respalda tu estabilidad económica y material.",
    "845": "Los cambios organizativos en tu economía traen resultados sumamente fructíferos.",
    "846": "Permite que los ángeles disuelvan tus preocupaciones sobre el pago de deudas.",
    "847": "Tus decisiones económicas sensatas cuentan con la total aprobación del cielo.",
    "848": "La disciplina financiera y el respaldo angélico aseguran una riqueza duradera.",
    "849": "Un ciclo de trabajo disciplinado culmina con la estabilidad económica anhelada.",
    "850": "Los cambios radicales en tu profesión u oficio abren canales de gran abundancia.",
    "851": "Visualiza tu cuenta bancaria y tus recursos prósperos; el cielo materializa tu visión.",
    "852": "Mantén la fe firme mientras tus finanzas se reestructuran hacia la abundancia.",
    "853": "Los maestros ascendidos te dan la energía y la visión para negocios exitosos.",
    "854": "Los ángeles edifican una base económica firme para tus nuevos emprendimientos.",
    "855": "Una ráfaga de cambios económicos muy favorables dinamiza tu prosperidad.",
    "856": "El equilibrio entre tu trabajo y tu descanso atrae bendiciones financieras estables.",
    "857": "Tu intuición afilada te conduce hacia excelentes oportunidades de crecimiento.",
    "858": "La prosperidad fluye de manera constante y abundante en esta nueva etapa.",
    "859": "Libera viejos conceptos de escasez; la abundancia es tu herencia divina.",
    "860": "Dios cuida de ti, proveyendo holgadamente para tu hogar y tus seres queridos.",
    "861": "Mantén pensamientos de gratitud y amor; la riqueza fluye hacia los corazones alegres.",
    "862": "Confía en que el amor divino armoniza tus finanzas y tus relaciones de negocios.",
    "863": "Los maestros ascendidos limpian tu mente de bloqueos económicos limitantes.",
    "864": "Los ángeles cuidan de tu patrimonio y te otorgan paz absoluta en lo material.",
    "865": "Un cambio en tu estilo de vida reduce gastos innecesarios y aumenta tu ahorro.",
    "866": "Suelta la tendencia a preocuparte por el dinero; el creador provee con creces.",
    "867": "Tu sabiduría interior te guía hacia elecciones financieras sumamente sanas.",
    "868": "La armonía en el hogar y la abundancia económica van de la mano en tu vida.",
    "869": "Un ciclo de apegos materiales pesados concluye, liberando tu flujo de prosperidad.",
    "870": "Tu evolución espiritual camina sincronizada con tu expansión económica próspera.",
    "871": "Tus afirmaciones positivas de riqueza se materializan de forma milagrosa.",
    "872": "Mantén una fe inquebrantable; los recursos que necesitas están llegando ya.",
    "873": "Los maestros ascendidos bendicen tu trabajo honesto y tu devoción espiritual.",
    "874": "Los ángeles premian tu integridad otorgándote estabilidad financiera y paz.",
    "875": "Estás experimentando un salto financiero positivo gracias a tus decisiones sabias.",
    "876": "Tu paz mental es el reflejo de una economía sana y alineada con la luz.",
    "877": "Una gracia divina especial bendice tus inversiones y proyectos materiales.",
    "878": "La abundancia espiritual se manifiesta en forma de bienestar financiero abundante.",
    "879": "Un ciclo de aprendizaje material y espiritual culmina con un éxito rotundo.",
    "880": "Dios bendice grandemente tu economía, otorgándote poder para crear riqueza con amor.",
    "881": "Mantén una visión de éxito financiero inquebrantable; el cielo te respalda.",
    "882": "Confía en que la rueda de la abundancia gira permanentemente a tu favor.",
    "883": "Los maestros ascendidos multiplican tus ingresos cuando ayudas a otros a prosperar.",
    "884": "Los ángeles organizan y protegen tus finanzas para que disfrutes de absoluta holgura.",
    "885": "Un cambio sumamente lucrativo se presenta de forma inesperada en tu vida.",
    "886": "Suelta cualquier resto de temor a la pobreza; la providencia divina es infinita.",
    "887": "Tu intuición afilada en asuntos de dinero te reporta grandes satisfacciones.",
    "888": "Número de la prosperidad colosal: La abundancia financiera y material te desborda. Disfruta de esta cosecha bendecida por el universo.",
    "889": "Un ciclo de escasez queda enterrado para siempre; la abundancia se instala en ti.",
    "890": "Los ángeles te asisten para cerrar viejas etapas laborales con gran éxito económico.",
    "891": "Visualiza tus metas financieras cumplidas; el universo materializa tus deseos.",
    "892": "Confía en que cada final de ciclo comercial o laboral abre una puerta más rica.",
    "893": "Los maestros ascendidos te liberan de deudas y cargas económicas agobiantes.",
    "894": "Los ángeles te envuelven en seguridad financiera mientras reestructuras tus bienes.",
    "895": "Un cambio liberador en tu profesión duplica tus expectativas de ganancia.",
    "896": "Perdona tus errores financieros del pasado; ahora comienza tu era de oro económica.",
    "897": "Has madurado en tu relación con el dinero; ahora sabes administrarlo con sabiduría.",
    "898": "Un ciclo de esfuerzo financiero prolongado culmina en una gran riqueza estable.",
    "899": "Prepárate para un despegue económico total; los viejos apremios se desvanecen.",

    // 900 - 999
    "900": "Dios te llama a poner tu granito de arena en el mundo; tu misión divina es crucial.",
    "901": "Mantén tus pensamientos elevados y enfocados en cumplir tu propósito de vida.",
    "902": "Confía en que el cielo apoya cada paso que das en favor de tu misión del alma.",
    "903": "Los maestros ascendidos guían tu labor humanitaria o artística con inspiración pura.",
    "904": "Los ángeles protegen tu misión de luz y te brindan un refugio de paz inquebrantable.",
    "905": "Un cambio en tu ocupación te alinea directamente con tu verdadera misión de vida.",
    "906": "Equilibra tus necesidades materiales con tu llamada espiritual de ayudar a otros.",
    "907": "Tu intuición te señala con total claridad cuál es el siguiente paso en tu propósito.",
    "908": "La abundancia te acompaña cuando te dedicas por completo a tu divina vocación.",
    "909": "Un ciclo importante de tu vida concluye para dar paso al cumplimiento de tu misión.",
    "910": "Trabaja codo a codo con el creador para mantener tu visión optimista y clara.",
    "911": "Tus pensamientos inspirados están manifestando las oportunidades para tu misión de luz.",
    "912": "Mantén la fe firme; tus proyectos orientados a ayudar a la humanidad son exitosos.",
    "913": "Los maestros ascendidos te otorgan elocuencia y sabiduría para guiar a otros.",
    "914": "Los ángeles estructuran tu tiempo y tus proyectos para que cumplas tu misión con solidez.",
    "915": "Un cambio positivo en tu entorno te permite expresarte como el trabajador de la luz que eres.",
    "916": "Nutre tu mente con pensamientos de servicio amoroso hacia el mundo.",
    "917": "Tu intuición certera es la brújula que te guía en tu camino de servicio.",
    "918": "Tu dedicación a tu misión divina atrae una prosperidad firme y constante.",
    "919": "Un ciclo de preparación concluye; estás listo/a para salir al mundo a brillar.",
    "920": "Confía en que Dios provee todo lo necesario para que cumplas tu propósito vital.",
    "921": "Mantén afirmaciones positivas; estás inspirando a muchos con tu ejemplo de luz.",
    "922": "Ten absoluta confianza en que el plan divino para tu vida se está ejecutando perfecto.",
    "923": "Los maestros ascendidos respaldan tus palabras y acciones destinadas a sanar.",
    "924": "Los ángeles custodian tu labor de servicio, manteniéndote a salvo y protegido/a.",
    "925": "Los cambios en tu rumbo vital te acercan más a tu verdadera vocación del alma.",
    "926": "El amor incondicional es el motor principal que impulsa tu misión en la Tierra.",
    "927": "Tu sabiduría interior es un bálsamo para quienes se acercan a ti en busca de guía.",
    "928": "La abundancia material fluye como retribución justa a tu entrega desinteresada.",
    "929": "Un ciclo de servicio culmina con gran éxito, abriendo una nueva fase de expansión.",
    "930": "Dios y los maestros ascendidos bendicen tu creatividad aplicada al servicio del mundo.",
    "931": "Utiliza tus dones de comunicación para llevar un mensaje de esperanza y optimismo.",
    "932": "Mantén la paz mental; los maestros ascendidos cuidan de ti mientras sirves a otros.",
    "933": "Los maestros ascendidos te abrazan con orgullo por tu hermosa labor de luz.",
    "934": "Los ángeles y maestros de luz protegen tu misión y tu bienestar físico y emocional.",
    "935": "Un cambio en tu estilo de vida te otorga más tiempo para dedicarlo a tus sueños.",
    "936": "Entrega cualquier cansancio o duda a los maestros ascendidos y recupera el vigor.",
    "937": "Tu conexión espiritual es un canal cristalino de sanación para el colectivo.",
    "938": "El cumplimiento de tu misión de vida trae aparejada una gran prosperidad material.",
    "939": "Un ciclo de trabajo espiritual intenso llega a un puerto luminoso y pacífico.",
    "940": "Dios y los ángeles blindan tu misión de vida frente a cualquier obstáculo externo.",
    "941": "Mantén la organización y la disciplina; son claves para sostener tu gran propósito.",
    "942": "Confía en que tus ángeles organizan los detalles logísticos de tus proyectos de luz.",
    "943": "Los maestros ascendidos y los ángeles te ayudan a manifestar tus sueños de servicio.",
    "944": "Una fuerte estructura angelical respalda tu camino como trabajador/a de la luz.",
    "945": "Los cambios organizativos en tu labor misional traen resultados extraordinarios.",
    "946": "Permite que los ángeles te liberen del peso de querer salvar a todo el mundo solo.",
    "947": "Tus decisiones orientadas al bien común cuentan con la total aprobación del cielo.",
    "948": "La disciplina en tu servicio al mundo atrae una estabilidad económica duradera.",
    "949": "Un ciclo de gran labor constructiva y social concluye de manera ordenada.",
    "950": "Los cambios radicales en tu vida te devuelven la libertad para cumplir tu misión.",
    "951": "Visualiza un mundo mejor; tus pensamientos positivos son herramientas de cambio real.",
    "952": "Mantén la fe firme mientras el universo reconfigura tu camino hacia tu propósito.",
    "953": "Los maestros ascendidos renuevan tu pasión y tu energía para seguir sirviendo.",
    "954": "Los ángeles edifican un sendero seguro y estable para tu misión en la Tierra.",
    "955": "Una ola de cambios dinámicos te libera de ataduras y acelera tu propósito vital.",
    "956": "El equilibrio entre tu labor altruista y tu vida personal es vital y sagrado.",
    "957": "Tu intuición te muestra con claridad a quiénes debes brindar tu ayuda.",
    "958": "Los cambios en tu profesión orientados al servicio traen abundancia asegurada.",
    "959": "Libera viejos roles obsoletos; el mundo necesita tu versión más auténtica y libre.",
    "960": "Dios cuida de ti y de tus necesidades mientras te entregas a tu divina vocación.",
    "961": "Mantén pensamientos amorosos y compasivos hacia la humanidad y hacia ti mismo/a.",
    "962": "Confía en que el amor divino armoniza tu hogar mientras cumples tu misión.",
    "963": "Los maestros ascendidos llenan tu corazón de paz y compasión infinita para servir.",
    "964": "Los ángeles cuidan de tu familia para que puedas cumplir tu propósito con tranquilidad.",
    "965": "Un cambio en tu perspectiva te permite ayudar a otros de una manera mucho más sana.",
    "966": "Suelta la autoexigencia desmedida; entrégate al flujo amoroso del creador.",
    "967": "Tu sabiduría empática es un faro de luz incalculable para quienes sufren.",
    "968": "La armonía familiar y la abundancia respaldan plenamente tu misión de servicio.",
    "969": "Un ciclo de relaciones demandantes concluye, dándote espacio para tu verdadera labor.",
    "970": "Tu evolución espiritual es tan avanzada que inspiras de manera natural a los demás.",
    "971": "Tus afirmaciones y oraciones por el bienestar del mundo están siendo respondidas.",
    "972": "Mantén una fe inquebrantable; tu labor de luz está dando frutos milagrosos.",
    "973": "Los maestros ascendidos caminan a tu lado, guiando cada una de tus enseñanzas.",
    "974": "Los ángeles premian tu abnegada labor espiritual con una paz interior indestructible.",
    "975": "Estás viviendo un salto cuántico en tu maestría personal y tu capacidad de sanar.",
    "976": "Tu paz mental es el testimonio vivo de tu coherencia espiritual y tu entrega.",
    "977": "Una gracia espiritual excepcional bendice tu camino como canal de luz y amor.",
    "978": "La sabiduría divina guía tus pasos hacia una prosperidad estable y merecida.",
    "979": "Un ciclo sagrado de enseñanza y sanación concluye, dejando una huella imborrable.",
    "980": "Dios bendice tu misión humanitaria con recursos ilimitados y total prosperidad.",
    "981": "Mantén una visión optimista; tu servicio al mundo es altamente valorado por el cielo.",
    "982": "Confía en que los recursos materiales para tus proyectos de luz llegan puntuales.",
    "983": "Los maestros ascendidos multiplican tus frutos cuando sirves desde el corazón.",
    "984": "Los ángeles organizan la economía de tus proyectos misionales con absoluta solidez.",
    "985": "Un cambio muy próspero en tus proyectos de ayuda se manifiesta ahora mismo.",
    "986": "Suelta la preocupación económica; al servir a la luz, el universo te sustenta por completo.",
    "987": "Tu intuición te guía con precisión hacia alianzas prósperas para tu misión.",
    "988": "Una poderosa corriente de abundancia respalda tus iniciativas de servicio mundial.",
    "989": "Un ciclo de apremios financieros concluye al consagrar tu labor al bien supremo.",
    "990": "Dios y los ángeles te asisten para cerrar etapas de tu misión con absoluta perfección.",
    "991": "Visualiza tu propósito de vida plenamente realizado; el universo materializa tu visión.",
    "992": "Confía en que cada cierre de etapa en tu camino misional abre puertas superiores.",
    "993": "Los maestros ascendidos te liberan de cargas pesadas para que cumplas tu destino con gozo.",
    "994": "Los ángeles te arropan con protección absoluta mientras coronas tu gran misión.",
    "995": "Un cambio liberador te impulsa a cumplir tu sueño más anhelado de servicio.",
    "996": "Perdona cualquier tropiezo del pasado; tu gran obra actual brilla con intensidad.",
    "997": "Has completado lecciones cruciales; tu alma brilla con la sabiduría de un maestro.",
    "998": "Un ciclo de servicio abnegado culmina en una recompensa cósmica y material inmensa.",
    "999": "Número maestro de cierre de ciclo: Representa la culminación de una etapa masiva en tu evolución y misión de vida. El pasado se disipa por completo para dar paso a tu renacimiento estelar."
};



export const EspacioHolistico: React.FC = () => {
  // ============================================================
  // SECCIÓN ACTIVA Y ESTADOS GENERALES
  // ============================================================
  const [seccionActiva, setSeccionActiva] = useState<
    "oraculo" | "elementoNatal" | "angeles"
  >("oraculo");

  // Estado para el registro de leads (manual)
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);

  const registrarYDescargar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setCargando(true);

    const { error } = await supabase
      .from('leads')
      .insert([{ email: email }]);

    if (error) {
      alert("Error al registrar: " + error.message);
    } else {
      alert("¡Acceso concedido! Tu manual se abrirá en una nueva pestaña.");
      window.open('https://drive.google.com/file/d/1NmarthoOlndjdfAJxL_sursrbzJGO9VJ/view?usp=sharing', '_blank');
      setEmail("");
    }
    setCargando(false);
  };

  // ============================================================
  // 1. ORÁCULO
  // ============================================================
  const mensajesOraculo = [
    "✨ Tu intuición es tu brújula más fiel hoy. Confía en lo que sientes en tu interior.",
    "🌿 Momento de soltar el control y permitir que el universo acomode lo que está en proceso.",
    "💧 La sanación requiere paciencia. Sé amable contigo mismo/a en este ciclo de aprendizaje.",
    "🔥 Tu energía creativa está en alto. Canaliza tu pasión hacia aquello que nutre tu alma.",
    "🕊️ La paz que buscas no está afuera, sino en la quietud de tu respiración consciente.",
  ];

  const [mensajeActual, setMensajeActual] = useState<string | null>(null);

  const revelarMensajeOraculo = () => {
    const aleatorio = mensajesOraculo[Math.floor(Math.random() * mensajesOraculo.length)];
    setMensajeActual(aleatorio);
  };

  // ============================================================
  // 2. CALCULADORA DE ELEMENTO NATAL
  // ============================================================
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [resultadoElementoNatal, setResultadoElementoNatal] = useState<{
    elemento: string;
    descripcion: string;
  } | null>(null);

  const calcularElementoNatal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fechaNacimiento) return;

    // Obtenemos el mes correctamente extrayéndolo de la fecha de forma segura
    const fechaObj = new Date(fechaNacimiento);
    const mes = fechaObj.getMonth(); // getMonth() devuelve de 0 (enero) a 11 (diciembre)

    const elementos = [
      {
        elemento: "Fuego (Acción y Propósito)",
        descripcion: "Tu energía es impulsora, apasionada y luminosa. Ideal para iniciar proyectos y liderar tu propio camino.",
      },
      {
        elemento: "Tierra (Raíz y Manifestación)",
        descripcion: "Te conecta con la estabilidad, el cuerpo y lo práctico. Tienes gran capacidad para materializar tus metas.",
      },
      {
        elemento: "Aire (Mente y Consciencia)",
        descripcion: "Tu enfoque pasa por la claridad mental, la comunicación y la expansión de nuevas ideas y sabidurías.",
      },
      {
        elemento: "Agua (Emoción y Sanación)",
        descripcion: "Tu mayor poder es la empatía, la intuición profunda y la capacidad de transmutar las emociones.",
      },
    ];

    // Usamos el mes (0 al 11) y lo dividimos por el total de elementos (4) usando el resto (%)
    setResultadoElementoNatal(elementos[mes % elementos.length]);
  };

  // ============================================================
  // 3. NÚMEROS DE LOS ÁNGELES
  // ============================================================
  const [busquedaNumero, setBusquedaNumero] = useState("");
  const [resultadoAngelical, setResultadoAngelical] = useState<string | null>(null);

  const buscarNumeroAngel = (e: React.FormEvent) => {
    e.preventDefault();
    const numeroLimpio = busquedaNumero.trim();
    
    if (numerosAngelesBD[numeroLimpio]) {
      setResultadoAngelical(numerosAngelesBD[numeroLimpio]);
    } else {
      setResultadoAngelical("El número ingresado aún no está registrado o el universo te rodea de amor y guía.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl my-8">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Espacio Holístico</h2>

      {/* Navegación por pestañas */}
      <div className="flex justify-center gap-2 mb-8 bg-purple-50 p-1.5 rounded-xl">
        <button
          onClick={() => setSeccionActiva("oraculo")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            seccionActiva === "oraculo" ? "bg-purple-600 text-white shadow" : "text-purple-700 hover:bg-purple-100"
          }`}
        >
          ✨ Oráculo
        </button>
        <button
          onClick={() => setSeccionActiva("elementoNatal")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            seccionActiva === "elementoNatal" ? "bg-purple-600 text-white shadow" : "text-purple-700 hover:bg-purple-100"
          }`}
        >
          🌿 Elemento Natal
        </button>
        <button
          onClick={() => setSeccionActiva("angeles")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            seccionActiva === "angeles" ? "bg-purple-600 text-white shadow" : "text-purple-700 hover:bg-purple-100"
          }`}
        >
          🕊️ Ángeles
        </button>
      </div>

      {/* SECCIÓN 1: ORÁCULO */}
      {seccionActiva === "oraculo" && (
        <div className="text-center space-y-6">
          <p className="text-gray-600">Conecta con el mensaje que el universo tiene para ti en este instante.</p>
          <button
            onClick={revelarMensajeOraculo}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
          >
            Revelar Mensaje del Oráculo
          </button>

          {mensajeActual && (
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl mt-4">
              <p className="text-lg text-purple-900 italic">{mensajeActual}</p>
            </div>
          )}
        </div>
      )}

      {/* SECCIÓN 2: ELEMENTO NATAL */}
      {seccionActiva === "elementoNatal" && (
        <form onSubmit={calcularElementoNatal} className="space-y-4">
          <p className="text-gray-600 text-center">Descubre cuál es tu elemento guía según tu fecha de nacimiento.</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl shadow-md transition-all"
          >
            Calcular mi Elemento Natal
          </button>

          {resultadoElementoNatal && (
            <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
              <h3 className="text-xl font-bold text-purple-900">{resultadoElementoNatal.elemento}</h3>
              <p className="text-gray-700">{resultadoElementoNatal.descripcion}</p>
            </div>
          )}
        </form>
      )}

      {/* SECCIÓN 3: NÚMEROS DE LOS ÁNGELES */}
      {seccionActiva === "angeles" && (
        <form onSubmit={buscarNumeroAngel} className="space-y-4">
          <p className="text-gray-600 text-center">Introduce un número de 3 dígitos (prueba con: 000) para conocer su mensaje angelical.</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={3}
              value={busquedaNumero}
              onChange={(e) => setBusquedaNumero(e.target.value)}
              placeholder="Ej: 000"
              className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-center text-xl font-bold tracking-widest"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Consultar
            </button>
          </div>

          {resultadoAngelical && (
            <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
              <h3 className="text-xl font-bold text-purple-900 text-center">Mensaje para el {busquedaNumero}</h3>
              <p className="text-gray-700 text-center">{resultadoAngelical}</p>
            </div>
          )}
        </form>
      )}

      {/* SECCIÓN INFERIOR: CAPTURA DE LEADS (MANUAL) - DISEÑO MEJORADO */}
      <div className="mt-12 pt-6 border-t border-purple-100">
        <form onSubmit={registrarYDescargar} className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-8 rounded-3xl shadow-xl text-white space-y-4">
          
          {/* Elemento decorativo de fondo */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-600/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 text-center space-y-2">
            <span className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-400/30 rounded-full text-xs font-semibold tracking-wider uppercase text-purple-200">
              ✨ Regalo Especial
            </span>
            <h4 className="text-2xl font-extrabold tracking-tight">Descarga tu Manual Holístico Gratuito</h4>
            <p className="text-sm text-purple-200 max-w-md mx-auto">
              Déjanos tu email y te enviaremos el acceso directo inmediato al contenido completo.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico..."
              className="flex-1 p-3.5 rounded-xl text-sm text-gray-900 bg-white/95 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-400/50 shadow-inner"
              required
            />
            <button
              type="submit"
              disabled={cargando}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {cargando ? "Enviando..." : "¡Descargar Gratis! 🎁"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};