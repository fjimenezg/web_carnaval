# Proposal: carnaval-pasto-web

## Why

Para una feria de la ciencia escolar, un estudiante presentará una exposición interactiva sobre el **Carnaval de Negros y Blancos de Pasto**. La exposición combinará elementos físicos (una cartelera con códigos QR por temática y maquetas) con una experiencia web interactiva en móviles. Al escanear los códigos QR, los asistentes podrán acceder rápidamente a información visual, concreta y amigable sobre las diferentes expresiones del carnaval (Carrozas, Murgas, Comparsas, etc.), ver videos explicativos del niño y clips reales del desfile, además de participar en una mini-trivia lúdica. La web se publicará en **GitHub Pages** para garantizar acceso gratuito, rápido, seguro (HTTPS) y sin necesidad de infraestructura compleja.

## What Changes

- Creación de una aplicación web estática optimizada para dispositivos móviles (Mobile-First, Single Page Application) alojada en GitHub Pages.
- Sistema de fichas interactivas por categorías culturales del Carnaval:
  - 🎭 **Carrozas**: Esculturas gigantescas de papel maché, madera y movimiento mecánico.
  - 🎺 **Murgas**: Grupos musicales tradicionales con instrumentos de viento y percusión (sonsureño).
  - 💃 **Comparsas**: Danza y teatro callejero con vestuarios y comparsas tradicionales.
  - 🎨 **Colectivos Coreográficos**: Centenares de músicos y danzantes en la senda ("Canto a la Tierra").
  - 🖤🤍 **Días Principales**: 5 de Enero (Día de Negros) y 6 de Enero (Día de Blancos).
- Integración de **Doble Video por temática**:
  - Pestaña 1: Video personalizado donde el niño explica el concepto.
  - Pestaña 2: Clip ilustrativo del desfile en vivo del Carnaval.
- Soporte para **Deep Linking mediante Hash en URL** (`#carrozas`, `#murgas`, `#comparsas`, etc.) para que cada código QR abra directamente la sección correspondiente.
- Módulo lúdico para la feria:
  - **Mini-Trivia interactiva**: 3 preguntas ilustradas con recompensa visual (confetti y medalla digital de "Embajador del Carnaval").
  - **Efecto "La Pintica"**: Interacción táctil para "pintarse" virtualmente con sonido festivo.
  - **Ambiente Sonoro**: Reproductor flotante con música tradicional nariñense (con control on/off).
- Herramienta de **Fichas QR Imprimibles**: Vista lista para imprimir con marcos festivos y códigos QR para recortar y pegar en la cartelera física.

## Capabilities

### New Capabilities
- `carnaval-portal`: Portal interactivo responsive para los visitantes de la feria, navegación por categorías culturales, deep linking para lectura de QRs, reproductor de doble video, y mini-trivia festiva.
- `qr-exporter`: Vista/módulo de exportación e impresión de tarjetas QR personalizadas listas para la cartelera del stand.

### Modified Capabilities
*(Ninguna. Es un proyecto nuevo sin especificaciones previas)*

## Impact
- **Código y Arquitectura**: Proyecto estático (HTML5, CSS3 moderno con variables y animaciones fluidas, JavaScript vanilla modular) en la raíz del repositorio, listo para GitHub Pages.
- **Datos y Contenido**: Archivo estructurado de datos (`data/carnaval-data.js`) para facilitar la adición o cambio de videos (YouTube / MP4), textos y preguntas de la trivia sin tocar la lógica de la UI.
- **Despliegue**: Configuración de GitHub Pages (directorio raíz o `/docs`).
