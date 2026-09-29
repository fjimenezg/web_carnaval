/**
 * Controlador Principal - Carnaval de Negros y Blancos de Pasto
 * Renderizado de categorías, router por hash, modales y reproductor de video doble.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Asegurar que los datos del carnaval existan
  if (typeof CARNAVAL_DATA === "undefined") {
    console.error("Error: carnaval-data.js no está cargado.");
    return;
  }

  // Estado de la aplicación
  let currentCategoryId = null;
  let currentVideoTab = "nino"; // 'nino' | 'carnaval'

  // Elementos DOM principales
  const categoriesGrid = document.getElementById("categoriesGrid");
  const culturalModal = document.getElementById("culturalModal");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalQuote = document.getElementById("modalQuote");
  const modalResumen = document.getElementById("modalResumen");
  const modalPointsList = document.getElementById("modalPointsList");
  const tabBtnNino = document.getElementById("tabBtnNino");
  const tabBtnCarnaval = document.getElementById("tabBtnCarnaval");
  const videoContainer = document.getElementById("videoContainer");

  // ==========================================================================
  // 1. INICIALIZACIÓN DE METADATOS DEL STAND
  // ==========================================================================
  function initStandInfo() {
    const info = CARNAVAL_DATA.standInfo;
    if (!info) return;

    const siteTitle = document.getElementById("siteTitle");
    const siteSubtitle = document.getElementById("siteSubtitle");
    const siteLema = document.getElementById("siteLema");
    const footerStandDesc = document.getElementById("footerStandDesc");

    if (siteTitle && info.titulo) siteTitle.textContent = info.titulo;
    if (siteSubtitle && info.subtitulo) siteSubtitle.textContent = info.subtitulo;
    if (siteLema && info.lema) siteLema.innerHTML = `<span>🎉</span> ${info.lema} <span>🎭</span>`;
    if (footerStandDesc && info.expositor) {
      footerStandDesc.textContent = `${info.expositor} • ${info.institucion || "Feria de la Ciencia"}`;
    }
  }

  // ==========================================================================
  // 2. RENDERIZADO DINÁMICO DE TARJETAS CULTURALES
  // ==========================================================================
  function renderCategories() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = "";

    CARNAVAL_DATA.categorias.forEach((cat, index) => {
      const card = document.createElement("article");
      card.className = "category-card";
      card.id = `card-${cat.id}`;
      card.setAttribute("role", "listitem");
      card.setAttribute("tabindex", "0");
      card.style.setProperty("--accent-gradient", cat.colorGradiente);
      card.style.setProperty("--glow-color", cat.colorPrimario || "rgba(255, 0, 127, 0.35)");
      card.style.setProperty("--stagger", index);

      card.innerHTML = `
        <div>
          <div class="card-header">
            <span class="card-icon" aria-hidden="true">${cat.icono}</span>
            <div class="card-title-group">
              <h3>${cat.titulo}</h3>
              <div class="card-subtitle">${cat.subtitulo}</div>
            </div>
          </div>
          <p class="card-summary">${cat.resumen}</p>
        </div>
        <div class="card-footer">
          <div class="card-badges">
            <span class="badge-video">${cat.badgeLabel || "📹 Doble Video"}</span>
          </div>
          <div class="btn-card-action">
            <span>Explorar</span>
            <span aria-hidden="true">➔</span>
          </div>
        </div>
      `;

      // Interacción espacial 3D (Antigravity Tilt)
      let isHovered = false;

      card.addEventListener("mouseenter", () => {
        isHovered = true;
      });

      card.addEventListener("mousemove", (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calcular ángulo de inclinación tridimensional (suave, máx 8 grados)
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) translateZ(10px)`;
        card.style.setProperty("--sheen-x", `${((x / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty("--sheen-y", `${((y / rect.height) * 100).toFixed(1)}%`);
      });

      card.addEventListener("mouseleave", () => {
        isHovered = false;
        card.style.transform = "";
      });

      // Eventos de apertura
      card.addEventListener("click", () => {
        openCategoryModal(cat.id, true);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCategoryModal(cat.id, true);
        }
      });

      categoriesGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // 3. CONTROL DE MODAL Y REPRODUCTOR MULTIMEDIA
  // ==========================================================================
  function openCategoryModal(categoryId, updateHash = true) {
    const category = CARNAVAL_DATA.categorias.find((c) => c.id === categoryId);
    if (!category) return;

    currentCategoryId = categoryId;
    currentVideoTab = "nino"; // Iniciar siempre en la pestaña del niño

    // Cargar contenido textual
    if (modalIcon) modalIcon.textContent = category.icono;
    if (modalTitle) modalTitle.textContent = category.titulo;
    if (modalSubtitle) modalSubtitle.textContent = category.subtitulo;
    if (modalQuote) modalQuote.textContent = category.fraseDestacada || "";
    if (modalResumen) modalResumen.textContent = category.resumen;

    // Cargar puntos clave
    if (modalPointsList) {
      modalPointsList.innerHTML = "";
      if (category.puntosClave && Array.isArray(category.puntosClave)) {
        category.puntosClave.forEach((pt) => {
          const item = document.createElement("div");
          item.className = "point-item";
          item.innerHTML = `
            <span class="point-label">${pt.label}</span>
            <span class="point-desc">${pt.desc}</span>
          `;
          modalPointsList.appendChild(item);
        });
      }
    }

    // Actualizar tabs y renderizar video
    if (tabBtnNino) {
      tabBtnNino.innerHTML = category.tabNinoLabel || `<span>👦</span> El Expositor Explica`;
    }
    if (tabBtnCarnaval) {
      tabBtnCarnaval.innerHTML = category.tabCarnavalLabel || `<span>🎬</span> En el Desfile Real`;
    }

    updateVideoTabUI();
    renderVideoPlayer();

    // Mostrar modal
    culturalModal.classList.add("active");
    culturalModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Evitar scroll de fondo

    if (updateHash) {
      if (window.location.protocol === "file:") {
        // En file:// evitamos pushState para no generar advertencias de origen único en Chrome
        if (window.location.hash !== `#${categoryId}`) {
          window.location.hash = categoryId;
        }
      } else {
        try {
          history.pushState(null, "", `#${categoryId}`);
        } catch (e) {
          window.location.hash = categoryId;
        }
      }
    }

    // Foco para accesibilidad
    if (btnCloseModal) btnCloseModal.focus();
  }

  function closeCategoryModal(updateHash = true) {
    if (!culturalModal.classList.contains("active")) return;

    culturalModal.classList.remove("active");
    culturalModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Detener reproducción de videos inmediatamente
    if (videoContainer) {
      videoContainer.innerHTML = "";
    }

    currentCategoryId = null;

    if (updateHash && window.location.hash) {
      if (window.location.protocol === "file:") {
        window.location.hash = "";
      } else {
        try {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        } catch (e) {
          window.location.hash = "";
        }
      }
    }
  }

  function updateVideoTabUI() {
    if (!tabBtnNino || !tabBtnCarnaval) return;

    if (currentVideoTab === "nino") {
      tabBtnNino.classList.add("active");
      tabBtnNino.setAttribute("aria-selected", "true");
      tabBtnCarnaval.classList.remove("active");
      tabBtnCarnaval.setAttribute("aria-selected", "false");
    } else {
      tabBtnCarnaval.classList.add("active");
      tabBtnCarnaval.setAttribute("aria-selected", "true");
      tabBtnNino.classList.remove("active");
      tabBtnNino.setAttribute("aria-selected", "false");
    }
  }

  function renderVideoPlayer() {
    if (!videoContainer || !currentCategoryId) return;

    const category = CARNAVAL_DATA.categorias.find((c) => c.id === currentCategoryId);
    if (!category || !category.videos) return;

    const videoData = currentVideoTab === "nino" ? category.videos.nino : category.videos.carnaval;

    videoContainer.innerHTML = "";
    const existingTip = videoContainer.parentNode.querySelector(".file-protocol-tip");
    if (existingTip) existingTip.remove();

    // Caso 1: No hay URL asignada aún (Placeholder educativo e interactivo)
    if (!videoData || !videoData.url || videoData.url.trim() === "") {
      const isNino = currentVideoTab === "nino";
      videoContainer.innerHTML = `
        <div class="video-placeholder">
          <div class="video-placeholder-icon">${isNino ? "👦🎤" : "🎬🎺"}</div>
          <h4>${isNino ? "¡Video del Niño Expositor!" : "Video del Desfile en Pasto"}</h4>
          <p>${videoData?.descripcion || "Próximamente podrás visualizar el video correspondiente a esta sección."}</p>
          <div style="margin-top: 0.75rem; font-size: 0.78rem; opacity: 0.8; background: rgba(0,0,0,0.4); padding: 0.35rem 0.75rem; border-radius: 999px;">
            💡 Puedes configurar el enlace en <code>data/carnaval-data.js</code>
          </div>
        </div>
      `;
      return;
    }

    const url = videoData.url.trim();

    // Caso 2: Video de YouTube
    const isYouTube = url.includes("youtube") || url.includes("youtu.be");
    if (isYouTube) {
      let embedUrl = url;

      // Convertir cualquier formato de YouTube a embed seguro y compatible
      if (url.includes("watch?v=")) {
        const videoId = url.split("watch?v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("shorts/")) {
        const videoId = url.split("shorts/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("/embed/")) {
        const videoId = url.split("/embed/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      // Parámetros de reproducción optimizada según especificación oEmbed de YouTube
      const videoId = embedUrl.split("/embed/")[1]?.split("?")[0] || "";
      let params = ["rel=0", "modestbranding=1"];
      if (window.location.origin && window.location.origin !== "null" && !window.location.origin.startsWith("file:")) {
        params.push(`origin=${encodeURIComponent(window.location.origin)}`);
      }
      const sep = embedUrl.includes("?") ? "&" : "?";
      const finalSrc = `${embedUrl}${sep}${params.join("&")}`;

      const iframe = document.createElement("iframe");
      iframe.src = finalSrc;
      iframe.title = videoData.titulo || category.titulo;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("loading", "lazy");
      videoContainer.appendChild(iframe);

      // Enlace directo de respaldo a YouTube
      const directUrl = url.includes("watch?v=") ? url : `https://www.youtube.com/watch?v=${videoId}`;
      const externalLink = document.createElement("div");
      externalLink.style.cssText = "position: absolute; bottom: 8px; right: 8px; z-index: 5;";
      externalLink.innerHTML = `<a href="${directUrl}" target="_blank" rel="noopener" style="font-size: 0.72rem; color: #fff; background: rgba(0,0,0,0.75); padding: 3px 8px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,0.2);"><span>↗</span> Ver en YouTube</a>`;
      videoContainer.appendChild(externalLink);

      // Si está en protocolo file://, mostrar sugerencia informativa si el navegador bloquea la incrustación
      if (window.location.protocol === "file:") {
        const fileTip = document.createElement("div");
        fileTip.className = "file-protocol-tip";
        fileTip.style.cssText = "margin-top: 0.5rem; font-size: 0.76rem; color: #ffb703; background: rgba(255, 183, 3, 0.08); border: 1px dashed rgba(255, 183, 3, 0.3); padding: 0.35rem 0.65rem; border-radius: 8px; text-align: center;";
        fileTip.innerHTML = `💡 <em>Nota de prueba local:</em> En <code>file://</code> YouTube puede mostrar Error 153 por falta de dominio HTTP. En <strong>GitHub Pages</strong> cargará sin restricciones.`;
        videoContainer.parentNode.insertBefore(fileTip, videoContainer.nextSibling);
      }
      return;
    }

    // Caso 3: Video Local MP4 / WebM
    const videoElem = document.createElement("video");
    videoElem.controls = true;
    videoElem.playsInline = true;
    videoElem.preload = "metadata";
    videoElem.innerHTML = `<source src="${url}" type="video/mp4">Tu navegador no soporta reproducción directa de video.`;
    videoContainer.appendChild(videoElem);
  }

  // ==========================================================================
  // 4. EVENTOS DE PESTAÑAS Y MODAL
  // ==========================================================================
  if (tabBtnNino) {
    tabBtnNino.addEventListener("click", () => {
      if (currentVideoTab !== "nino") {
        currentVideoTab = "nino";
        updateVideoTabUI();
        renderVideoPlayer();
      }
    });
  }

  if (tabBtnCarnaval) {
    tabBtnCarnaval.addEventListener("click", () => {
      if (currentVideoTab !== "carnaval") {
        currentVideoTab = "carnaval";
        updateVideoTabUI();
        renderVideoPlayer();
      }
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      closeCategoryModal(true);
    });
  }

  if (culturalModal) {
    // Cerrar al hacer clic en el fondo oscuro
    culturalModal.addEventListener("click", (e) => {
      if (e.target === culturalModal) {
        closeCategoryModal(true);
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCategoryModal(true);
    }
  });

  // ==========================================================================
  // 5. ENRUTAMIENTO POR HASH (#carrozas, #murgas, #trivia, etc.)
  // ==========================================================================
  function handleHashNavigation() {
    const hash = window.location.hash.replace("#", "").toLowerCase().trim();

    if (!hash) {
      closeCategoryModal(false);
      return;
    }

    // Si el hash es la trivia, disparar evento o función de trivia
    if (hash === "trivia") {
      closeCategoryModal(false);
      if (typeof window.abrirTrivia === "function") {
        window.abrirTrivia();
      }
      return;
    }

    // Comprobar si coincide con alguna categoría
    const matchedCategory = CARNAVAL_DATA.categorias.find((c) => c.id.toLowerCase() === hash);
    if (matchedCategory) {
      openCategoryModal(matchedCategory.id, false);
    }
  }

  // Escuchar cambios de hash (ej. cuando se escanea un QR o se usa atrás/adelante)
  window.addEventListener("hashchange", handleHashNavigation);

  // Exponer función para apertura programática
  window.openCategoryModal = openCategoryModal;
  window.closeCategoryModal = closeCategoryModal;

  // ==========================================================================
  // EJECUCIÓN INICIAL
  // ==========================================================================
  initStandInfo();
  renderCategories();
  handleHashNavigation();
});
