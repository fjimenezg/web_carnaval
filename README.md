# 🎭 Carnaval de Negros y Blancos de Pasto - Exposición Interactiva

Una aplicación web moderna, interactiva y optimizada para dispositivos móviles diseñada para la **Feria de la Ciencia Ambiental 2026**. Permite a los visitantes del stand escanear códigos QR en una cartelera física y acceder al instante a videos explicativos del niño expositor, clips del desfile real, datos culturales sobre carrozas, murgas, comparsas y Pericles Carnaval, además de una mini-trivia lúdica y el juego interactivo de "La Pintica".

---

## 🌟 Características Principales

1. **Mobile-First & Ultrarrápida**: Diseñada para cargar en menos de 1 segundo en los teléfonos móviles de los asistentes sin necesidad de descargar ninguna app.
2. **Doble Video por Categoría**:
   - 👦 **El Expositor Explica**: Espacio para el video grabado por el niño.
   - 🎬 **En el Desfile Real**: Clip en vivo del carnaval en Pasto.
3. **Deep Linking con Códigos QR**:
   - Escanear el QR de la Murga abre directamente la ficha de la Murga (`#murgas`), el de la Carroza abre `#carrozas`, etc.
4. **Generador de Fichas QR Imprimibles**:
   - Abre `imprimir.html` para generar una hoja lista para imprimir con marcos festivos, códigos QR y líneas punteadas de tijera para recortar y pegar en la cartelera física.
5. **Extras Lúdicos para la Feria**:
   - 🏆 **Trivia del Carnaval**: 4 preguntas interactivas con retroalimentación inmediata, confetti y medalla digital al finalizar.
   - 🖤 **¡Pide tu Pintica!**: Efecto táctil con sonido para "pintar" la pantalla con cosmético negro o espuma blanca.
   - 🎵 **Música Tradicional**: Sonsureño andino con botón de pausa y control voluntario.
   - 🔭 **Orgullo Científico de Pasto**: Sección dedicada a la biografía, legado y colaboraciones con la NASA del **Dr. Alberto Quijano Vodniza** (fundador del Observatorio Astronómico de la Universidad de Nariño).

---

## 🚀 Cómo Publicar en GitHub Pages (Paso a Paso)

El sitio es **100% estático** (HTML, CSS y JavaScript nativo), por lo que GitHub Pages lo publica gratis con HTTPS seguro:

1. **Subir los archivos a tu repositorio de GitHub**:
   ```bash
   git add .
   git commit -m "Publicar web interactiva del Carnaval de Pasto"
   git push origin main
   ```
2. **Activar GitHub Pages**:
   - En tu repositorio de GitHub, haz clic en **Settings** (Configuración) en la barra superior.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Build and deployment** > **Source**, selecciona: **Deploy from a branch**.
   - En **Branch**, selecciona `main` y en la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
3. **¡Listo!** En unos 60 segundos tu sitio estará en vivo en:
   ```
   https://<tu-usuario>.github.io/web_carnaval/
   ```

---

## 🖨️ Cómo Imprimir las Tarjetas QR para la Cartelera

1. Una vez publicado el sitio en GitHub Pages (o mientras pruebas en tu computadora), abre en tu navegador el archivo:
   ```
   imprimir.html
   ```
2. En la barra superior, verifica que la casilla **URL base** tenga la dirección de tu web (ej: `https://<tu-usuario>.github.io/web_carnaval/`).
3. Haz clic en el botón morado **🖨️ Imprimir Tarjetas**.
4. Se abrirá el diálogo de impresión de tu navegador optimizado para papel Carta o A4.
5. ¡Solo queda recortar por las líneas punteadas (`✂`) y pegarlas en la cartelera al lado de cada maqueta o dibujo!

---

## ✏️ Cómo Personalizar Textos y Videos

Toda la información y los enlaces están centralizados en un único archivo:
👉 [`data/carnaval-data.js`](file:///Users/fjimenezg/Documents/web_carnaval/data/carnaval-data.js)

### 1. Cambiar los datos del expositor:
```javascript
standInfo: {
  titulo: "Carnaval de Negros y Blancos de Pasto",
  subtitulo: "Feria de la Ciencia Ambiental 2026",
  expositor: "Stand de Juanito Pérez - Grado 4B", // <- Cambia el nombre aquí
  ...
}
```

### 2. Agregar los videos del niño:
Dentro de cada categoría (`carrozas`, `murgas`, `comparsas`, etc.), busca la sección `videos.nino` y pega la URL de tu video:
```javascript
videos: {
  nino: {
    titulo: "El Expositor Explica: Las Carrozas",
    url: "https://www.youtube.com/watch?v=CODIGO_DE_TU_VIDEO", // <- Pega el link de YouTube o "assets/video/mi-video.mp4"
    descripcion: "Explicación grabada por el estudiante."
  },
  ...
}
```

> **Nota**: Puedes subir los videos del niño a YouTube como *"No listados"* (unlisted) para que nadie más los vea salvo quien tenga el enlace, o guardarlos directamente como archivo `.mp4` en la carpeta `assets/video/`.

---

## 📂 Estructura de Archivos

```
web_carnaval/
├── index.html              # Interfaz interactiva principal (SPA)
├── imprimir.html           # Generador de tarjetas QR imprimibles para el stand
├── README.md               # Este manual de uso y despliegue
├── css/
│   ├── main.css            # Sistema de diseño festivo con Glassmorphism y temas móviles
│   └── print.css           # Estilos de maquetación y corte para impresión
├── js/
│   ├── app.js              # Controlador principal y enrutador por hash (#carrozas, etc.)
│   ├── audio.js            # Control del reproductor tradicional de sonsureño
│   ├── pintica.js          # Animación lúdica de "La Pintica"
│   ├── trivia.js           # Lógica del cuestionario interactivo y confetti
│   └── qrcode.min.js       # Generador de códigos QR integrado
├── data/
│   └── carnaval-data.js    # Contenido cultural, videos y preguntas de la trivia
└── assets/
    ├── img/                # Imágenes y texturas
    ├── audio/              # Archivos de música tradicional opcionales
    └── video/              # Videos locales .mp4 opcionales
```

---

¡Mucho éxito en la Feria de la Ciencia! 🎉🎭  
*«¡Qué viva Pasto, Carajo!»*
