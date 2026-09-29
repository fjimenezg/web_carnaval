# Tasks: carnaval-pasto-web

## 1. Estructura Base y Capa de Datos

- [x] 1.1 Crear la estructura de directorios del proyecto (`css/`, `js/`, `data/`, `assets/img/`, `assets/audio/`, `assets/video/`) y verificar la presencia de cada directorio en el árbol del proyecto.
- [x] 1.2 Implementar el modelo de datos en `data/carnaval-data.js` con las 5 categorías culturales (Carrozas, Murgas, Comparsas, Colectivos Coreográficos, Días Principales), preguntas de la trivia y metadatos del stand del niño; verificar que el archivo exporte el objeto y sea sintácticamente válido.

## 2. Maquetación y Sistema de Diseño Visual

- [x] 2.1 Diseñar el archivo `css/main.css` con variables de color festivas (amarillos, morados, fucsias, turquesas), fuentes tipográficas modernas, estilos Glassmorphism y diseño responsive mobile-first; verificar que se visualice correctamente en pantallas de smartphone y escritorio.
- [x] 2.2 Crear el esqueleto semántico en `index.html` incluyendo encabezado festivo con botón de audio, contenedor de categorías dinámicas, modal de detalle cultural con pestañas de video y contenedor de la mini-trivia; verificar la carga correcta de estilos y scripts en el navegador.

## 3. Lógica de Navegación, Hash Routing y Reproductor de Doble Video

- [x] 3.1 Implementar en `js/app.js` la renderización dinámica de las tarjetas culturales a partir de `carnaval-data.js` y el soporte de enrutamiento por hash (`#carrozas`, `#murgas`, etc.); verificar que al cambiar el hash se abra y enfoque el modal correspondiente.
- [x] 3.2 Desarrollar el componente de doble video con pestañas intercambiables ("Explicación del Niño" y "En el Desfile Real") con soporte para URLs de YouTube (iframe) y videos locales MP4; verificar que el cambio de pestaña actualice la fuente multimedia sin recargas.

## 4. Módulos Interactivos de la Feria (Trivia, Pintica y Música)

- [x] 4.1 Desarrollar `js/audio.js` con el reproductor de sonido ambiental tradicional (sonsureño / música típica) y control flotante accesible; verificar que el botón active y pause el audio correctamente sin autoplay forzado.
- [x] 4.2 Implementar `js/pintica.js` para el efecto lúdico de "La Pintica Virtual" al pulsar el botón interactivo; verificar que aparezca la mancha animada en pantalla y el mensaje festivo.
- [x] 4.3 Implementar `js/trivia.js` con el flujo interactivo de 3-4 preguntas, retroalimentación visual inmediata por acierto/error, contador de aciertos y pantalla final con efecto de confetti digital y medalla; verificar que se pueda completar la trivia de inicio a fin.

## 5. Módulo de Tarjetas QR para Cartelera Escolar

- [x] 5.1 Implementar `imprimir.html` y la biblioteca ligera de generación de códigos QR para renderizar automáticamente los QRs del portal general y de cada subtema cultural según la URL actual de despliegue; verificar que los códigos QR generados apunten a los hashes correctos.
- [x] 5.2 Implementar `css/print.css` con formato de cuadrícula optimizada para corte en hojas tamaño Carta/A4, bordes decorativos festivos e instrucciones claras de escaneo; verificar mediante la vista previa de impresión del navegador.

## 6. Verificación Integral y Despliegue en GitHub Pages

- [x] 6.1 Realizar una prueba completa de usuario en navegador simulando dispositivo móvil (inspección de viewport vertical, navegación por QR con hash, reproducción de video, trivia y pintica).
- [x] 6.2 Crear el archivo `README.md` con las instrucciones paso a paso para publicar el sitio en GitHub Pages y las indicaciones para que el niño y su familia puedan personalizar sus videos y textos.
