/**
 * Base de Datos y Configuración Cultural del Carnaval de Negros y Blancos de Pasto
 * Fácilmente editable para la exposición escolar y personalización de videos.
 */

const CARNAVAL_DATA = {
  standInfo: {
    titulo: "Carnaval de Negros y Blancos de Pasto",
    subtitulo: "Feria de la Ciencia y la Cultura",
    lema: "¡Que viva Pasto, Carajo! 🎭",
    expositor: "Stand de Exposición Escolar",
    institucion: "Feria Científica y Cultural",
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
      titulo: "¿Qué es una Carroza?",
      nombreCorto: "Carrozas",
      subtitulo: "Monumentos Rodantes de Arte y Mecatrónica",
      icono: "🎭",
      colorPrimario: "#E91E63", // Rosa festivo
      colorGradiente: "linear-gradient(135deg, #FF4081, #C2185B)",
      resumen: "Son gigantescas esculturas móviles construidas por maestros artesanos con papel maché, madera, fibra y arcilla. ¡Tienen motores y sistemas mecánicos que hacen que sus cabezas, ojos y alas cobren vida!",
      puntosClave: [
        { label: "📏 Tamaño Monumental", desc: "Miden hasta 8 metros de alto y 16 metros de largo, requiriendo un tractor para halarlas." },
        { label: "⏳ Tiempo de Creación", desc: "Los artesanos y sus familias trabajan de 4 a 6 meses en talleres secretos preparando cada detalle." },
        { label: "📅 Día de Desfile", desc: "Son las reinas del 6 de enero en el Gran Desfile Magno por la Senda del Carnaval." },
        { label: "⚙️ Mecatrónica y Arte", desc: "Integran poleas, motores y electrónica para simular respiración, parpadeo y movimientos mágicos." }
      ],
      fraseDestacada: "«En cada carroza viaja el alma, la fantasía y el esfuerzo incansable de los artesanos de Pasto.»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: Las Carrozas",
          tipo: "local_o_youtube", // 'youtube' o 'local'
          url: "", // Si se deja vacío, la app muestra un reproductor amigable con mensaje para el niño
          descripcion: "Explicación grabada por el estudiante para la feria."
        },
        carnaval: {
          titulo: "Carrozas Monumentales en la Senda",
          tipo: "youtube",
          url: "https://www.youtube-nocookie.com/embed/6i2n1-u1F24", // Video ilustrativo de ejemplo
          descripcion: "Mira las impresionantes carrozas desfilando con sus movimientos mecánicos."
        }
      }
    },
    {
      id: "murgas",
      titulo: "¿Qué es una Murga?",
      nombreCorto: "Murgas",
      subtitulo: "Alegría, Disfraz Colectivo y Sonsureño",
      icono: "🎺",
      colorPrimario: "#FF9800", // Naranja cálido
      colorGradiente: "linear-gradient(135deg, #FFB74D, #F57C00)",
      resumen: "Son alegres agrupaciones de músicos y bailarines vestidos con disfraces idénticos y coloridos. Marchan tocando ritmos andinos y sonsureño, haciendo bailar y cantar a miles de espectadores.",
      puntosClave: [
        { label: "🥁 Tres Modalidades", desc: "Existen murgas de metales (trompetas y saxos), de fuelle (acordeones) y de instrumentos andinos." },
        { label: "💃 Energía Inagotable", desc: "Tocan y bailan continuamente a lo largo de más de 7 kilómetros de recorrido." },
        { label: "🎭 Disfraces Alegóricos", desc: "Todos los integrantes llevan trajes festivos que combinan humor, tradición y colorido." },
        { label: "🎶 Melodías Típicas", desc: "Interpretan temas icónicos como 'La Guaneña', 'El Sonsureño' y 'Chambú'." }
      ],
      fraseDestacada: "«¡La murga pone el ritmo del corazón en el Carnaval de Pasto!»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: Las Murgas",
          tipo: "local_o_youtube",
          url: "",
          descripcion: "El niño explica cómo los instrumentos alegran la fiesta."
        },
        carnaval: {
          titulo: "Murgas del Carnaval en Acción",
          tipo: "youtube",
          url: "https://www.youtube-nocookie.com/embed/5aXWzB69qG0",
          descripcion: "Músicos y comparsas llenando de melodías la senda del carnaval."
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
          titulo: "El Expositor Explica: Las Comparsas",
          tipo: "local_o_youtube",
          url: "",
          descripcion: "El niño expone cómo las comparsas narran historias."
        },
        carnaval: {
          titulo: "Desfile de Comparsas Tradicionales",
          tipo: "youtube",
          url: "https://www.youtube-nocookie.com/embed/Z0b70kU1-0Q",
          descripcion: "Bailes, máscaras y disfraces tradicionales en acción."
        }
      }
    },
    {
      id: "colectivos",
      titulo: "Colectivos Coreográficos",
      nombreCorto: "Colectivos",
      subtitulo: "Canto a la Tierra y Rito Andino",
      icono: "🎨",
      colorPrimario: "#00BCD4", // Turquesa andino
      colorGradiente: "linear-gradient(135deg, #4DD0E1, #0097A7)",
      resumen: "Grandes agrupaciones de más de 200 danzantes y músicos tocando zampoñas, sikus y bombos al unísono. Es el desfile más espiritual del Carnaval, homenajeando a la Madre Tierra (Pachamama).",
      puntosClave: [
        { label: "🌍 Canto a la Tierra", desc: "Desfilan el 3 de enero, cruzando la ciudad vestidos con finos trajes andinos." },
        { label: "💨 Fuerza de Viento", desc: "Cientos de zampoñas y quenas sonando juntas producen un sonido potente y sobrecogedor." },
        { label: "📐 Coreografías Geométricas", desc: "Forman espirales, círculos y líneas que evocan la simbología indígena precolombina." },
        { label: "🌾 Respeto a la Naturaleza", desc: "Sus letras y danzas agradecen las cosechas y el agua de la cordillera de los Andes." }
      ],
      fraseDestacada: "«Un rugido de zampoñas que retumba en las faldas del Volcán Galeras.»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: Colectivos Coreográficos",
          tipo: "local_o_youtube",
          url: "",
          descripcion: "El niño describe el homenaje a la Madre Tierra."
        },
        carnaval: {
          titulo: "Desfile Canto a la Tierra",
          tipo: "youtube",
          url: "https://www.youtube-nocookie.com/embed/9BqW_EaY3e8",
          descripcion: "Centenares de zampoñeros y danzantes en la senda."
        }
      }
    },
    {
      id: "dias-clave",
      titulo: "Los Días Clave del Carnaval",
      nombreCorto: "Días Clave",
      subtitulo: "Día de Negros y Día de Blancos",
      icono: "🖤🤍",
      colorPrimario: "#7C4DFF", // Morado festivo
      colorGradiente: "linear-gradient(135deg, #B388FF, #651FFF)",
      resumen: "El Carnaval se basa en el principio de igualdad: todos somos iguales cuando nos pintamos. Los dos días cumbre son el 5 de enero (Día de Negros) y el 6 de enero (Día de Blancos).",
      puntosClave: [
        { label: "🖤 5 de Enero (Día de Negros)", desc: "Se conmemora el día libre que tenían los esclavos. La gente se pinta con cosmético negro perfumado al son de '¡Una pintica por favor!'." },
        { label: "🤍 6 de Enero (Día de Blancos)", desc: "Es el día del Gran Desfile de Carrozas y del juego con talco perfumado y espuma blanca ('carioca')." },
        { label: "👑 Familia Castañeda (4 de Enero)", desc: "Desfile cómico que recrea la llegada de una pintoresca familia campesina a Pasto en 1929." },
        { label: "🏛️ Patrimonio de la Humanidad", desc: "La UNESCO declaró este carnaval Patrimonio Cultural Inmaterial en 2009 por su mensaje de fraternidad." }
      ],
      fraseDestacada: "«¡Qué vivan los Negros! ¡Qué vivan los Blancos! ¡Qué viva Pasto, Carajo!»",
      videos: {
        nino: {
          titulo: "El Expositor Explica: El Juego y la Igualdad",
          tipo: "local_o_youtube",
          url: "",
          descripcion: "El sentido cultural de pintarse y compartir como hermanos."
        },
        carnaval: {
          titulo: "El Juego de Negros y Blancos",
          tipo: "youtube",
          url: "https://www.youtube-nocookie.com/embed/fD3q8yL-U0I",
          descripcion: "La emoción, el talco, la espuma y la fiesta en las calles."
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
          url: "../assets/videos/presentacion_alberto_quijano_vodniza.mp4",
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
      pregunta: "¿Qué día del Carnaval se celebra el 'Día de Negros' donde nos pintamos con cosmético suave?",
      opciones: [
        { texto: "El 5 de Enero", correcta: true },
        { texto: "El 24 de Diciembre", correcta: false },
        { texto: "El 6 de Enero", correcta: false },
        { texto: "El 1 de Enero", correcta: false }
      ],
      explicacion: "¡Correcto! El 5 de enero conmemora la libertad de los esclavos afrodescendientes y todos nos pintamos con la tradicional pintica."
    },
    {
      pregunta: "¿Qué materiales principales usan los artesanos para construir las Carrozas gigantes?",
      opciones: [
        { texto: "Plástico comprado en fábricas", correcta: false },
        { texto: "Papel maché, madera, arcilla y motores", correcta: true },
        { texto: "Piedra y cemento", correcta: false },
        { texto: "Ladrillos y vidrio", correcta: false }
      ],
      explicacion: "¡Exacto! El papel maché, la madera y los mecanismos hacen posible que estas enormes esculturas cobren movimiento."
    },
    {
      pregunta: "¿Qué tocan principalmente las Murgas mientras bailan por las calles?",
      opciones: [
        { texto: "Música electrónica moderna", correcta: false },
        { texto: "Sonsureño y ritmos andinos con bombos y vientos", correcta: true },
        { texto: "Salsa brava", correcta: false },
        { texto: "Música clásica con violines", correcta: false }
      ],
      explicacion: "¡Muy bien! Las murgas interpretan el tradicional sonsureño y bambucos nariñenses haciendo bailar a toda la ciudad."
    },
    {
      pregunta: "¿Quién es el ilustre científico de Pasto reconocido por la NASA y fundador del Observatorio Astronómico de la Universidad de Nariño?",
      opciones: [
        { texto: "Dr. Alberto Quijano Vodniza", correcta: true },
        { texto: "Albert Einstein", correcta: false },
        { texto: "Isaac Newton", correcta: false },
        { texto: "Galileo Galilei", correcta: false }
      ],
      explicacion: "¡Brillante! El Dr. Alberto Quijano Vodniza ha demostrado que desde Pasto se hace ciencia de primer nivel para la NASA y todo el planeta."
    },
    {
      pregunta: "¿En qué año declaró la UNESCO al Carnaval de Pasto como Patrimonio de la Humanidad?",
      opciones: [
        { texto: "En el año 2009", correcta: true },
        { texto: "En 1950", correcta: false },
        { texto: "En el año 2024", correcta: false },
        { texto: "En el año 1810", correcta: false }
      ],
      explicacion: "¡Excelente! En 2009 fue reconocido internacionalmente por promover la paz, la fraternidad y la diversidad cultural."
    }
  ]
};

// Exportación para compatibilidad con módulos ES o scripts globales del navegador
if (typeof module !== "undefined" && module.exports) {
  module.exports = CARNAVAL_DATA;
}
