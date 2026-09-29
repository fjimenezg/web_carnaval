# Design: carnaval-pasto-web

## Context

El proyecto requiere una aplicación web estática para ser consultada desde teléfonos móviles de visitantes en la feria de la ciencia a través de códigos QR. La aplicación se alojará en **GitHub Pages**, lo cual impone un entorno puramente estático (sin servidor backend propio). Además, en ferias escolares la conectividad celular puede ser intermitente, por lo que la velocidad de carga inicial y la resiliencia offline/bajo ancho de banda son críticas.

Para la motivación general y alcance, ver `proposal.md` y las especificaciones en `specs/carnaval-portal/spec.md` y `specs/qr-exporter/spec.md`.

## Goals / Non-Goals

**Goals:**
- Tiempo de carga inicial inferior a 1.5 segundos en redes móviles.
- Cero dependencias de ejecución pesadas (Vanilla HTML5, CSS3 moderno con variables y animaciones nativas, JavaScript ES6+).
- Navegación instantánea mediante URL hash (`#carrozas`, `#murgas`, etc.) para deep-linking directo desde los códigos QR.
- Desacoplamiento total del contenido en un archivo de datos (`data/carnaval-data.js`) para que el usuario pueda agregar o cambiar videos, descripciones y preguntas de la trivia con facilidad.
- Reproductor multimedia flexible que admita indistintamente videos de YouTube (Shorts / embeds) o archivos locales `.mp4`.
- Vista de impresión (`@media print`) y generador de tarjetas QR integrado para la cartelera física.

**Non-Goals:**
- No se requiere backend, base de datos ni sistema de autenticación de usuarios.
- No se requiere transcodificación de video en el cliente (los videos locales deben estar previamente optimizados en formato `.mp4` h.264 o alojados en YouTube).
- No se requiere una PWA compleja con sincronización en segundo plano; el almacenamiento de puntajes de trivia se manejará en memoria/localStorage.

## Decisions

### 1. Stack Tecnológico: Vanilla HTML5 + CSS3 + ES6 Modules
- **Decisión**: No utilizar frameworks pesados (React, Angular o Vue con bundlers complejos).
- **Razón**: Una SPA vanilla estructurada ofrece el menor peso posible (<100 KB de assets base), compatibilidad nativa con GitHub Pages sin pasos de compilación obligatorios (`npx` / `npm build`) y máxima durabilidad sin problemas de dependencias obsoletas.
- **Alternativas consideradas**:
  - *React / Vite*: Aumenta la complejidad para un sitio estático de feria y requiere Node.js para cualquier pequeño cambio de texto.

### 2. Enrutamiento mediante Hash (`#categoria`)
- **Decisión**: Utilizar `window.location.hash` y el evento `hashchange` para navegar entre categorías y abrir modales o secciones específicas.
- **Razón**: Los servidores estáticos como GitHub Pages no soportan HTML5 History API sin páginas 404 personalizadas y hacks de redirección. El hash garantiza que `https://usuario.github.io/web_carnaval/#carrozas` funcione 100% de las veces directamente desde la cámara del celular.
- **Alternativas consideradas**:
  - *Páginas HTML independientes (`carrozas.html`, `murgas.html`)*: Duplica encabezados, estilos y reproductores de audio, haciendo que la música se corte al navegar.

### 3. Abstracción del Reproductor de Video (YouTube & MP4 Local)
- **Decisión**: Crear un componente de renderizado que inspeccione la URL del video:
  - Si contiene `youtube.com` o `youtu.be`, genera un `<iframe>` responsivo con `loading="lazy"`.
  - Si termina en `.mp4` o ruta local, genera una etiqueta `<video controls preload="metadata" playsinline>`.
- **Razón**: Brinda al usuario la libertad de usar clips de YouTube existentes o grabar clips propios del niño en formato `.mp4` sin modificar la plantilla HTML.

### 4. Generación Dinámica de Códigos QR para Impresión
- **Decisión**: Incluir una biblioteca ligera de generación de QR en cliente (como `qrcode.min.js` o generador SVG puro) en una vista `/imprimir.html` o panel de utilidades.
- **Razón**: Detecta automáticamente la URL pública actual del sitio (ej. en GitHub Pages) y genera al instante la hoja de tarjetas lista para recortar y pegar en la cartelera, sin que el usuario tenga que usar páginas externas de generación de QR una por una.

### 5. Estructura de Archivos
```
web_carnaval/
├── index.html              # Interfaz principal de la exposición (SPA)
├── imprimir.html           # Generador de tarjetas QR imprimibles para el stand
├── css/
│   ├── main.css            # Sistema de diseño, tokens, glassmorphism, temas festivos
│   └── print.css           # Estilos optimizados para corte e impresión de fichas
├── js/
│   ├── app.js              # Controlador principal, router por hash, modales
│   ├── audio.js            # Control del reproductor ambiental de sonsureño
│   ├── trivia.js           # Lógica del cuestionario interactivo y confetti
│   └── pintica.js          # Efecto interactivo de "La Pintica"
├── data/
│   └── carnaval-data.js    # Fichas culturales, enlaces a videos y preguntas de trivia
└── assets/
    ├── img/                # Iconos, fondos festivos, texturas del carnaval
    ├── audio/              # Clips de audio tradicional
    └── video/              # Videos locales .mp4 opcionales
```

## Risks / Trade-offs

- **Riesgo**: [Conectividad lenta en la feria escolar para reproducir videos de alta resolución]
  - **Mitigación**: Cada ficha contiene la información principal en texto sintético y viñetas ilustradas antes del video. Los videos tienen `preload="none"` o `loading="lazy"` para no competir por ancho de banda si el usuario solo desea leer.
- **Riesgo**: [Subdirectorios en GitHub Pages (`https://<usuario>.github.io/<repo>/`)]
  - **Mitigación**: Todas las rutas de assets en HTML/CSS/JS serán relativas (`./css/...`, `./assets/...`) y la detección de URL para los códigos QR usará `window.location.href.split('#')[0]`.
- **Riesgo**: [Restricciones de Autoplay de Audio en Safari iOS y Chrome Android]
  - **Mitigación**: La música tradicional no intentará reproducirse automáticamente al cargar; solo iniciará cuando el usuario toque voluntariamente el botón flotante de música o inicie la interacción.

## Migration / Deployment Plan

1. Los archivos se alojan en la raíz del repositorio Git.
2. En GitHub: ir a **Settings** -> **Pages** -> Seleccionar rama `main` y carpeta `/ (root)`.
3. En menos de 2 minutos el sitio estará publicado con certificado SSL seguro (HTTPS) bajo la URL pública asignada.
