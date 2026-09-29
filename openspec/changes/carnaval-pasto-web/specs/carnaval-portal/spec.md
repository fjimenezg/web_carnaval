# Spec Delta: carnaval-portal

## Purpose

Proporciona una interfaz web interactiva, optimizada para dispositivos móviles y publicada en GitHub Pages, para explorar temas del Carnaval de Negros y Blancos de Pasto con doble reproductor de video, navegación temática directa por URL hash y actividades lúdicas para la feria de la ciencia.

## ADDED Requirements

### Requirement: Exploración temática interactiva del Carnaval
El sistema SHALL presentar tarjetas o secciones dedicadas para las principales expresiones del carnaval: Carrozas, Murgas, Comparsas, Colectivos Coreográficos y Días Principales (5 y 6 de Enero), con explicaciones breves, lenguaje accesible para niños y datos curiosos destacados.

#### Scenario: Visualización de categoría cultural
- **WHEN** el usuario selecciona una categoría cultural en el menú o portada
- **THEN** el sistema muestra la ficha descriptiva correspondiente con su título, descripción breve, viñetas de datos curiosos y controles multimedia.

### Requirement: Reproducción de doble video por categoría
Cada categoría cultural SHALL ofrecer una vista de doble video con pestañas intercambiables: una pestaña para el video explicativo del expositor infantil y otra pestaña para un clip ilustrativo del desfile en vivo del Carnaval.

#### Scenario: Cambio de video activo
- **WHEN** el usuario pulsa en la pestaña "En el Desfile Real" dentro de una categoría
- **THEN** el reproductor cambia de fuente para mostrar el clip del desfile real sin recargar la página.

#### Scenario: Reproductor adaptable sin contenido
- **WHEN** una categoría cuenta únicamente con una de las dos fuentes de video disponibles
- **THEN** el sistema oculta o desactiva la pestaña sin video y reproduce el video existente sin mostrar errores de carga.

### Requirement: Deep Linking mediante Hash para códigos QR
El sistema SHALL leer el fragmento hash de la URL al cargar la página (por ejemplo `#carrozas`, `#murgas`, `#comparsas`) y abrir de manera automática y destacada la ficha o modal correspondiente a dicho identificador.

#### Scenario: Carga directa mediante escaneo de código QR
- **WHEN** un visitante escanea un código QR que apunta a `/#murgas`
- **THEN** la aplicación web se inicia y despliega automáticamente la sección de Murgas enfocada o en vista modal lista para interacción.

#### Scenario: Navegación de vuelta al portal
- **WHEN** el usuario cierra el modal temático o pulsa el botón de volver al menú principal
- **THEN** el sistema retorna a la vista general de categorías y actualiza el historial de navegación sin refrescar el navegador.

### Requirement: Mini-Trivia interactiva de la feria
El sistema SHALL incluir un cuestionario interactivo de 3 a 5 preguntas rápidas sobre el Carnaval con retroalimentación inmediata por cada respuesta y una pantalla de felicitación con confetti digital y medalla al finalizar.

#### Scenario: Respuesta correcta en la trivia
- **WHEN** el usuario selecciona la opción correcta de una pregunta
- **THEN** el sistema destaca la opción en verde, reproduce un indicador sonoro/visual de acierto y habilita la siguiente pregunta.

#### Scenario: Finalización exitosa de la trivia
- **WHEN** el usuario responde la última pregunta de la trivia
- **THEN** el sistema muestra el puntaje final, una animación festiva de confetti y el diploma digital de "Embajador del Carnaval".

### Requirement: Interacción lúdica de "La Pintica Virtual"
El sistema SHALL disponer de una acción interactiva que simula la tradicional "Pintica" de cosmético negro o espuma sobre la pantalla al interactuar el usuario.

#### Scenario: Tocar para pintarse virtualmente
- **WHEN** el usuario pulsa el botón de "¡Pedir la Pintica!"
- **THEN** el sistema muestra una mancha festiva animada en la pantalla con el lema ¡Una pintica por favor! y un sonido festivo de celebración.

### Requirement: Reproductor ambiental de música tradicional
El sistema SHALL permitir al usuario activar o pausar un fragmento sonoro ambiental de música tradicional nariñense (sonsureño / La Guaneña) mediante un botón accesible en la cabecera.

#### Scenario: Activación voluntaria de audio
- **WHEN** el visitante pulsa el icono de audio festivo
- **THEN** el sistema inicia la reproducción de la melodía tradicional y cambia el estado del botón a "Pausar música".
