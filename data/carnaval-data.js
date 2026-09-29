/**
 * Base de Datos y Configuración Cultural del Carnaval de Negros y Blancos de Pasto
 * Fácilmente editable para la exposición escolar y personalización de videos.
 */

const CARNAVAL_DATA = {
  standInfo: {
    titulo: "Carnaval de Negros y Blancos de Pasto",
    subtitulo: "Feria de la Ciencia Ambiental 2026",
    lema: "¡Que viva Pasto, Carajo! 🎭",
    expositor: "Gabriel Matías Jiménez Molina",
    institucion: "Liceo de la Merced Maridíaz",
    proyecto: "Chivita Carnavalera",
    sitioUrl: "https://fjimenezg.github.io/web_carnaval/",
    descripcionStand: "Escanea los códigos QR de la cartelera para descubrir la magia, los artesanos y la música de una de las fiestas más alegres de Colombia y Patrimonio de la Humanidad."
  },

  musicaAmbiental: {
    titulo: "Sonsureño Tradicional - Carnaval de Pasto",
    // Puede ser una URL a un archivo mp3 de libre uso o audio local en assets/audio/sonsureno.mp3
    src: "assets/audio/sonsureno.mp3"
  },

  categorias: [
    {
      id: "carrozas",
      titulo: "Maestro Zambrano y las Carrozas",
      nombreCorto: "Maestro Zambrano",
      subtitulo: "El Rey de las Carrozas y la Escultura",
      icono: "🎭",
      colorPrimario: "#E91E63", // Rosa festivo
      colorGradiente: "linear-gradient(135deg, #FF4081, #C2185B)",
      imagen: "assets/img/maestro_zambrano_y_matias.jpeg",
      imagenCaption: "Gabriel Matías junto al Maestro Zambrano en el taller de escultura y carrozas",
      badgeLabel: "🏆 Rey de las Carrozas",
      resumen: "Homenaje al Maestro Alfonso Zambrano Payán (ganador de 18 primeros lugares y creador de las carrozas con movimiento) y a la dinastía artesanal que da vida a los monumentos rodantes del 6 de enero.",
      puntosClave: [
        { label: "🏆 Récord de 18 Primeros Puestos", desc: "El Maestro Alfonso Zambrano ganó 14 años consecutivos y 18 veces el primer premio de carrozas con obras legendarias como 'Pegaso'." },
        { label: "⚙️ Creador de Carrozas en Movimiento", desc: "Fue el visionario que incorporó motores y poleas mecánicas para que las esculturas parpadearan y se movieran en la senda." },
        { label: "🪵 Maestro de la Talla en Madera", desc: "Escultor insigne de Colombia, autor de monumentales cristos y de la histórica urna de San Pedro Claver en Cartagena." },
        { label: "📏 Tamaño y Fantasía", desc: "Las carrozas miden hasta 8 metros de alto y 16 metros de largo, esculpidas con papel maché, madera, arcilla y fibra." }
      ],
      fraseDestacada: "«En cada carroza viaja el alma, la fantasía y el esfuerzo incansable de los artesanos de Pasto.»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: El Maestro Zambrano y las Carrozas",
          tipo: "local_o_youtube",
          url: "assets/video/maestro_zambrano.mp4",
          descripcion: "Gabriel Matías presenta el legado del Maestro Zambrano, sus 18 primeros lugares y la magia de las carrozas móviles."
        },
        carnaval: {
          titulo: "Carrozas Monumentales en la Senda (Desfile Magno)",
          tipo: "youtube",
          url: "https://www.youtube.com/watch?v=t2Pr5_9BQ2I", // Desfile Magno de Carrozas Monumentales
          descripcion: "Mira las impresionantes carrozas gigantes desfilando con sus movimientos mecánicos."
        }
      }
    },
    {
      id: "comparsas",
      titulo: "¿Qué es una Comparsa?",
      nombreCorto: "Comparsas",
      subtitulo: "Teatro Callejero, Danza y Tradición",
      icono: "💃",
      colorPrimario: "#4CAF50", // Verde festivo
      colorGradiente: "linear-gradient(135deg, #81C784, #388E3C)",
      imagen: "assets/img/comparsa_y_matias.jpeg",
      imagenCaption: "Gabriel Matías junto a las comparsas tradicionales y la alegría del Carnaval de Pasto",
      badgeLabel: "💃 Danza y Tradición",
      resumen: "Grupos de personas organizadas con vestuarios vistosos que representan cuentos, mitos campesinos, personajes históricos o parodias cómicas mediante coreografías y teatro callejero.",
      puntosClave: [
        { label: "📖 Cuentan Historias", desc: "Cada comparsa tiene un guion o argumento: leyendas como El Duende, la Viuda Alegre o el campesino nariñense." },
        { label: "✨ Vestuarios Hechos a Mano", desc: "Confeccionados con telas brillantes, bordados, lentejuelas y máscaras expresivas." },
        { label: "🙌 Interacción con el Público", desc: "Interactúan de cerca con los espectadores haciendo bromas y bailes cómicos." },
        { label: "🤝 Trabajo en Comunidad", desc: "Reúnen a vecinos, familias y escuelas que ensayan durante meses." }
      ],
      fraseDestacada: "«La comparsa es teatro vivo donde las calles de Pasto se convierten en un escenario mágico.»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: Las Comparsas y Disfraces",
          tipo: "local_o_youtube",
          url: "assets/video/comparsas.mp4",
          descripcion: "Gabriel Matías presenta cómo las comparsas llenan de danza, disfraces, leyendas y teatro callejero la senda del Carnaval."
        },
        carnaval: {
          titulo: "Desfile de Comparsas y Disfraces",
          tipo: "youtube",
          url: "https://www.youtube.com/watch?v=XUYTUl4a5aE",
          descripcion: "Bailes, máscaras, teatro callejero y disfraces tradicionales en acción."
        }
      }
    },
    {
      id: "pericles",
      titulo: "Pericles Carnaval",
      nombreCorto: "Pericles Carnaval",
      subtitulo: "El Alcalde de la Alegría y el Bando Festivo",
      icono: "🎩",
      colorPrimario: "#FF6D00", // Ámbar dorado festivo
      colorGradiente: "linear-gradient(135deg, #FF9100, #E65100)",
      imagen: "assets/img/periclesymati.jpeg",
      imagenCaption: "Gabriel Matías junto a Pericles Carnaval (Anfitrión del Carnaval de Pasto)",
      badgeLabel: "🎩 Personaje Insignia",
      resumen: "Personaje emblemático y anfitrión supremo del Carnaval de Negros y Blancos. Cada 4 de enero, en la Llegada de la Familia Castañeda, toma posesión simbólica de Pasto, recibe las Llaves de la Ciudad y proclama el Bando del Carnaval, decretando la prohibición total de la tristeza y ordenando el goce sano, fraterno y alegre de la fiesta.",
      puntosClave: [
        { label: "📜 La Proclama del Bando", desc: "Decreto festivo en verso donde Pericles arrebata el mando a la rutina y declara que la única ley válida en Pasto es la alegría, el juego limpio y el respeto." },
        { label: "🔑 Las Llaves de la Ciudad", desc: "El alcalde de Pasto le entrega simbólicamente las llaves de la ciudad, ungiéndolo como el 'Alcalde Festivo' que rige durante todo el Carnaval." },
        { label: "🎩 Elegancia, Chistera y Frac", desc: "Luce con porte su sombrero de copa alta, levita de gala, banda carnavalera y bastón de mando, derrochando simpatía, cortesía y humor andino." },
        { label: "🎭 Origen Popular e Histórico", desc: "Surgió a mediados del siglo XX en los carnavales estudiantiles, inspirado en el célebre estadista y orador griego Pericles y en los pregoneros del pueblo." }
      ],
      fraseDestacada: "«¡Por mandato de este servidor, queda terminantemente prohibida la tristeza y decretado el goce fraternal en San Juan de Pasto!» — Pericles Carnaval",
      videos: {
        nino: {
          titulo: "El Expositor Explica: ¿Quién es Pericles Carnaval?",
          tipo: "local_o_youtube",
          url: "assets/video/presentacion_pericles.mp4",
          descripcion: "Gabriel Matías presenta la historia, el sombrero de copa y el significado de Pericles Carnaval como símbolo de alegría y hospitalidad."
        },
        carnaval: {
          titulo: "Pericles Carnaval da la orden de gozar (Lectura del Bando)",
          tipo: "youtube",
          url: "https://www.youtube.com/watch?v=7tIUKWqnRgs",
          descripcion: "Desfile del 4 de enero: Llegada de la Familia Castañeda y proclamación oficial del inicio de las festividades en San Juan de Pasto."
        }
      }
    },
    {
      id: "alberto-quijano",
      titulo: "¿Quién es el Dr. Alberto Quijano Vodniza?",
      nombreCorto: "Dr. Quijano (Ciencia)",
      subtitulo: "De San Juan de Pasto a la NASA y el Cosmos",
      icono: "🔭",
      colorPrimario: "#2979FF", // Azul cósmico espacial
      colorGradiente: "linear-gradient(135deg, #0D47A1, #00E5FF)",
      imagen: "assets/img/doctor_vodniza_y_matias.jpeg",
      imagenCaption: "Gabriel Matías junto al Dr. Alberto Quijano Vodniza (Científico e Investigador NASA)",
      badgeLabel: "🔭 Orgullo Científico",
      tabCarnavalLabel: "<span>🚀</span> En la NASA / Reportaje",
      resumen: "Científico, físico y astrónomo nacido en Pasto, fundador y director del Observatorio Astronómico de la Universidad de Nariño. Es un referente mundial reconocido por la NASA por sus investigaciones en cometas y asteroides que cruzan cerca de la Tierra.",
      puntosClave: [
        { label: "🏛️ Observatorio Astronómico de Pasto", desc: "Fundó el observatorio en 2002 con gran esfuerzo y dedicación, posicionándolo como uno de los centros de monitoreo astronómico más respetados del continente." },
        { label: "🚀 Reconocido por la NASA", desc: "Invitado de honor a lanzamientos espaciales en Cabo Cañaveral y colaborador oficial en el seguimiento de asteroides potencialmente peligrosos para la Tierra." },
        { label: "☄️ Cazador de Cometas y Asteroides", desc: "Ha investigado cuerpos celestes como el cometa Hale-Bopp, el asteroide Toutatis y la histórica misión de defensa planetaria DART de la NASA." },
        { label: "🔭 Nuevo Telescopio de Gran Alcance", desc: "Lidera la construcción del nuevo Centro de Ciencias de Nariño, el cual albergará el telescopio más moderno y potente de Colombia (1 metro de apertura)." }
      ],
      fraseDestacada: "«Desde las faldas del Volcán Galeras en Pasto, demostramos al mundo que con disciplina, amor al estudio y perseverancia podemos tocar las estrellas.» — Dr. Alberto Quijano Vodniza",
      videos: {
        nino: {
          titulo: "El Expositor Explica: La Vida del Dr. Quijano",
          tipo: "local_o_youtube",
          url: "assets/video/presentacion_alberto_quijano_vodniza.mp4",
          descripcion: "El estudiante explica cómo la curiosidad y la ciencia enaltecen a Pasto ante el mundo."
        },
        carnaval: {
          titulo: "Reconocimiento de la NASA al Dr. Alberto Quijano Vodniza",
          tipo: "youtube",
          url: "https://www.youtube.com/watch?v=8eOW92HtSh8",
          descripcion: "Reportaje y entrevista sobre su trabajo con la NASA y el Observatorio de la Universidad de Nariño."
        }
      }
    }
  ],

  trivia: [
    {
      id: 1,
      pregunta: "¿Qué se conmemora en el tradicional 5 de Enero (Día de Negros) en el Carnaval de Pasto?",
      opciones: [
        { texto: "El día libre histórico de los esclavos y el juego de la pintica", correcta: true },
        { texto: "La llegada del año nuevo", correcta: false },
        { texto: "La fundación del departamento de Nariño", correcta: false },
        { texto: "El inicio de las clases escolares", correcta: false }
      ],
      explicacion: "¡Exacto! El 5 de enero conmemora la libertad de los esclavos afrodescendientes y todos nos pintamos como hermanos con la tradicional pintica."
    },
    {
      id: 2,
      pregunta: "¿Qué caracteriza al Gran Desfile Magno del 6 de Enero (Día de Blancos)?",
      opciones: [
        { texto: "Carrozas monumentales, música andina y juego con talco y espuma carioca", correcta: true },
        { texto: "Desfile militar con uniformes oscuros", correcta: false },
        { texto: "Carreras de automóviles veloces", correcta: false },
        { texto: "Competencia de natación en el río", correcta: false }
      ],
      explicacion: "¡Muy bien! El 6 de enero es el día cumbre: la Senda del Carnaval se cubre de una nube blanca de talco perfumado y monumentales carrozas."
    },
    {
      id: 3,
      pregunta: "¿Qué materiales principales moldean los artesanos para construir las Carrozas gigantes?",
      opciones: [
        { texto: "Papel maché, madera, arcilla y sistemas mecatrónicos", correcta: true },
        { texto: "Plástico comprado en fábricas", correcta: false },
        { texto: "Bloques de hielo tallado", correcta: false },
        { texto: "Ladrillos y cemento de construcción", correcta: false }
      ],
      explicacion: "¡Exacto! Los maestros artesanos moldean papel maché, madera y arcilla, e integran motores para que estas enormes figuras cobren movimiento."
    },
    {
      id: 4,
      pregunta: "¿Por qué el Maestro Alfonso Zambrano Payán es considerado el gran ícono de las Carrozas?",
      opciones: [
        { texto: "Por ganar 18 primeros lugares y ser pionero de las carrozas con movimiento", correcta: true },
        { texto: "Por componer el himno nacional de Colombia", correcta: false },
        { texto: "Por haber construido el primer puente de la ciudad", correcta: false },
        { texto: "Por inventar la espuma blanca", correcta: false }
      ],
      explicacion: "¡Extraordinario! El Maestro Alfonso Zambrano ganó 14 años consecutivos (18 primeros puestos en total) y fue un ilustre escultor de talla en madera."
    },
    {
      id: 5,
      pregunta: "¿Qué instrumentos y melodías tocan principalmente las Murgas mientras bailan?",
      opciones: [
        { texto: "El Sonsureño y ritmos andinos con instrumentos de viento y bombos", correcta: true },
        { texto: "Música electrónica moderna", correcta: false },
        { texto: "Música clásica con violines", correcta: false },
        { texto: "Rock pesado con guitarras eléctricas", correcta: false }
      ],
      explicacion: "¡Muy bien! Las murgas llenan de energía y baile los 7 kilómetros de la senda con el tradicional Sonsureño nariñense."
    },
    {
      id: 6,
      pregunta: "¿Cuál es el propósito cultural de las Comparsas en el Carnaval de Pasto?",
      opciones: [
        { texto: "Contar leyendas, mitos y vivencias campesinas mediante danza y teatro callejero", correcta: true },
        { texto: "Vender productos comerciales a los asistentes", correcta: false },
        { texto: "Caminar en fila india y en absoluto silencio", correcta: false },
        { texto: "Hacer carreras de atletismo por la senda", correcta: false }
      ],
      explicacion: "¡Así es! Las comparsas son teatro vivo callejero que rescatan la memoria, los cuentos tradicionales y la picardía popular de Nariño."
    },
    {
      id: 7,
      pregunta: "¿Qué misión cumple Pericles Carnaval el 4 de enero con su sombrero de copa y levita?",
      opciones: [
        { texto: "Recibe las Llaves de la Ciudad y proclama el Bando prohibiendo la tristeza", correcta: true },
        { texto: "Es el encargado de cobrar la entrada a los desfiles", correcta: false },
        { texto: "Dirige el tráfico de vehículos en la ciudad", correcta: false },
        { texto: "Supervisa la venta de alimentos", correcta: false }
      ],
      explicacion: "¡Excelente! Pericles Carnaval es el Alcalde Festivo: arrebata el mando a la rutina y decreta que la única ley válida en Pasto es la alegría y el respeto."
    },
    {
      id: 8,
      pregunta: "¿Qué homenaje se recrea el 4 de enero en el desfile de la Familia Castañeda?",
      opciones: [
        { texto: "La hospitalidad pastusa al recibir a una familia campesina en 1929", correcta: true },
        { texto: "La llegada de los primeros aviones al país", correcta: false },
        { texto: "La inauguración de la catedral de Pasto", correcta: false },
        { texto: "Una expedición de científicos espaciales", correcta: false }
      ],
      explicacion: "¡Brillante! La Familia Castañeda conmemora la acogida fraterna a campesinos en viaje y honra las costumbres campesinas y estampas de la comarca."
    },
    {
      id: 9,
      pregunta: "¿Qué destacado logro científico tiene el Dr. Alberto Quijano Vodniza desde Pasto?",
      opciones: [
        { texto: "Fundó el Observatorio de la Udenar y colabora con la NASA investigando asteroides y cometas", correcta: true },
        { texto: "Inventó un submarino para navegar en la laguna de La Cocha", correcta: false },
        { texto: "Descubrió una mina de diamantes en el Volcán Galeras", correcta: false },
        { texto: "Diseñó el primer telescopio de madera del mundo", correcta: false }
      ],
      explicacion: "¡Orgullo científico de Nariño! El Dr. Quijano Vodniza es reconocido por la NASA y demuestra que desde Pasto se hace ciencia de frontera hacia el cosmos."
    },
    {
      id: 10,
      pregunta: "¿En qué año declaró la UNESCO al Carnaval de Pasto como Patrimonio de la Humanidad?",
      opciones: [
        { texto: "En el año 2009", correcta: true },
        { texto: "En el año 1950", correcta: false },
        { texto: "En el año 2024", correcta: false },
        { texto: "En el año 1810", correcta: false }
      ],
      explicacion: "¡Magnífico! En 2009 la UNESCO lo declaró Patrimonio Cultural Inmaterial por promover la igualdad, la paz, la fraternidad y la diversidad."
    }
  ]
};

// Exportación para compatibilidad con módulos ES o scripts globales del navegador
if (typeof module !== "undefined" && module.exports) {
  module.exports = CARNAVAL_DATA;
}
