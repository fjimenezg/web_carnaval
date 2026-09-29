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
  let wasMusicPlayingBeforeModal = false;

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
          ${cat.imagen ? `
            <div class="card-photo-wrapper">
              <img src="${cat.imagen}" alt="${cat.imagenCaption || cat.titulo}" class="card-photo-img" loading="lazy" />
              <div class="card-photo-badge">
                <span class="photo-dot"></span> Encuentro con Matías
              </div>
            </div>
          ` : ""}
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

    // Detectar disponibilidad de videos para seleccionar la mejor pestaña automáticamente
    const hasNinoVideo = Boolean(category.videos?.nino?.url && category.videos.nino.url.trim() !== "");
    const hasCarnavalVideo = Boolean(category.videos?.carnaval?.url && category.videos.carnaval.url.trim() !== "");

    if (hasNinoVideo) {
      currentVideoTab = "nino";
    } else if (hasCarnavalVideo) {
      currentVideoTab = "carnaval";
    } else {
      currentVideoTab = "nino";
    }

    // Cargar contenido textual
    if (modalIcon) modalIcon.textContent = category.icono;
    if (modalTitle) modalTitle.textContent = category.titulo;
    if (modalSubtitle) modalSubtitle.textContent = category.subtitulo;
    if (modalQuote) modalQuote.textContent = category.fraseDestacada || "";
    if (modalResumen) modalResumen.textContent = category.resumen;

    // Cargar foto destacada del niño con el personaje (si existe)
    const modalPhotoContainer = document.getElementById("modalPhotoContainer");
    if (modalPhotoContainer) {
      if (category.imagen) {
        modalPhotoContainer.innerHTML = `
          <div class="modal-photo-card">
            <img src="${category.imagen}" alt="${category.imagenCaption || category.titulo}" class="modal-photo-img" />
            <div class="modal-photo-caption">
              <span>📸</span> ${category.imagenCaption || "Gabriel Matías en su investigación de campo"}
            </div>
          </div>
        `;
        modalPhotoContainer.style.display = "block";
      } else {
        modalPhotoContainer.innerHTML = "";
        modalPhotoContainer.style.display = "none";
      }
    }

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

    // Actualizar tabs con etiquetas e indicadores de estado
    if (tabBtnNino) {
      const baseLabel = category.tabNinoLabel || `<span>👦</span> El Expositor Explica`;
      const badge = hasNinoVideo 
        ? `<span class="tab-badge-ready" title="Video grabado disponible">✓ Video</span>` 
        : `<span class="tab-badge-pending" title="Video en preparación">Próx.</span>`;
      tabBtnNino.innerHTML = `${baseLabel} ${badge}`;
    }
    if (tabBtnCarnaval) {
      const baseLabel = category.tabCarnavalLabel || `<span>🎬</span> En el Desfile Real`;
      const badge = hasCarnavalVideo 
        ? `<span class="tab-badge-ready" title="Video oficial disponible">✓ Video</span>` 
        : `<span class="tab-badge-pending">Próx.</span>`;
      tabBtnCarnaval.innerHTML = `${baseLabel} ${badge}`;
    }

    updateVideoTabUI();
    renderVideoPlayer();

    // Pausar música de fondo si está activa para escuchar el video con total nitidez
    if (typeof window.pauseCarnavalMusicForVideo === "function") {
      wasMusicPlayingBeforeModal = window.pauseCarnavalMusicForVideo();
    }

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

    // Detener reproducción de videos inmediatamente y limpiar controles externos
    if (videoContainer) {
      videoContainer.innerHTML = "";
    }
    const modalPhotoContainer = document.getElementById("modalPhotoContainer");
    if (modalPhotoContainer) {
      modalPhotoContainer.innerHTML = "";
      modalPhotoContainer.style.display = "none";
    }
    const existingTip = videoContainer?.parentNode?.querySelector(".file-protocol-tip");
    if (existingTip) existingTip.remove();
    const existingActions = videoContainer?.parentNode?.querySelector(".video-external-actions");
    if (existingActions) existingActions.remove();

    currentCategoryId = null;

    // Reanudar música de fondo si estaba activa antes de abrir el modal
    if (wasMusicPlayingBeforeModal && typeof window.resumeCarnavalMusicAfterVideo === "function") {
      window.resumeCarnavalMusicAfterVideo(true);
      wasMusicPlayingBeforeModal = false;
    }

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
    const existingActions = videoContainer.parentNode.querySelector(".video-external-actions");
    if (existingActions) existingActions.remove();

    // Caso 1: No hay URL asignada aún (Placeholder educativo e interactivo)
    if (!videoData || !videoData.url || videoData.url.trim() === "") {
      const isNino = currentVideoTab === "nino";
      videoContainer.innerHTML = `
        <div class="video-placeholder">
          <div class="video-placeholder-icon">${isNino ? "👦🎤" : "🎬🎺"}</div>
          <h4>${isNino ? "¡Video del Niño Expositor!" : "Video del Desfile en Pasto"}</h4>
          <p>${videoData?.descripcion || "Próximamente podrás visualizar el video correspondiente a esta sección."}</p>
          <div style="margin-top: 0.75rem; font-size: 0.78rem; opacity: 0.85; background: rgba(0,0,0,0.4); padding: 0.4rem 0.85rem; border-radius: 999px;">
            💡 Puedes ver el video del desfile en la pestaña <strong>${category.tabCarnavalLabel ? "En la NASA / Reportaje" : "En el Desfile Real"}</strong>
          </div>
        </div>
      `;
      return;
    }

    const rawUrl = videoData.url.trim();

    // Caso 2: Video de YouTube
    const isYouTube = rawUrl.includes("youtube") || rawUrl.includes("youtu.be");
    if (isYouTube) {
      // Extracción universal y segura del ID de YouTube
      const ytMatch = rawUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?.*v=|shorts\/))([\w-]{11})/);
      const videoId = ytMatch ? ytMatch[1] : "";

      if (videoId) {
        // Embed con youtube-nocookie para máxima compatibilidad y privacidad
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&enablejsapi=1`;

        const iframe = document.createElement("iframe");
        iframe.src = embedUrl;
        iframe.title = videoData.titulo || category.titulo;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("loading", "lazy");
        videoContainer.appendChild(iframe);

        // Barra inferior estilizada de información y acceso directo a YouTube
        const directUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const externalActions = document.createElement("div");
        externalActions.className = "video-external-actions";
        externalActions.innerHTML = `
          <div class="video-info-bar">
            <span class="video-info-title">🎬 ${videoData.titulo || category.titulo}</span>
            <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="btn-open-youtube" title="Abrir video directamente en YouTube">
              <span>Ver en YouTube</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        `;
        videoContainer.parentNode.insertBefore(externalActions, videoContainer.nextSibling);

        // Si está en protocolo file://, mostrar sugerencia informativa si el navegador bloquea la incrustación
        if (window.location.protocol === "file:") {
          const fileTip = document.createElement("div");
          fileTip.className = "file-protocol-tip";
          fileTip.style.cssText = "margin-top: 0.5rem; font-size: 0.76rem; color: #ffb703; background: rgba(255, 183, 3, 0.08); border: 1px dashed rgba(255, 183, 3, 0.3); padding: 0.35rem 0.65rem; border-radius: 8px; text-align: center;";
          fileTip.innerHTML = `💡 <em>Nota local:</em> Si el navegador bloquea iframes en <code>file://</code>, usa el botón <strong>Ver en YouTube ↗</strong> o inicia un servidor local. En <strong>GitHub Pages</strong> se reproduce directamente.`;
          externalActions.parentNode.insertBefore(fileTip, externalActions.nextSibling);
        }
      }
      return;
    }

    // Caso 3: Video Local MP4 / WebM con multi-fuente y fallback inteligente
    const videoElem = document.createElement("video");
    videoElem.controls = true;
    videoElem.playsInline = true;
    videoElem.preload = "metadata";

    // Configurar fuentes primarias y de respaldo (local y GitHub Pages)
    let sourcesHtml = `<source src="${rawUrl}" type="video/mp4">`;
    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      const cleanPath = rawUrl.replace(/^\.?\//, "");
      sourcesHtml += `<source src="https://fjimenezg.github.io/web_carnaval/${cleanPath}" type="video/mp4">`;
    } else if (rawUrl.includes("fjimenezg.github.io/web_carnaval/assets/video/")) {
      const filename = rawUrl.split("/").pop();
      sourcesHtml += `<source src="assets/video/${filename}" type="video/mp4">`;
    }
    sourcesHtml += "Tu navegador no soporta reproducción directa de video HTML5.";

    videoElem.innerHTML = sourcesHtml;
    videoContainer.appendChild(videoElem);

    // Barra informativa para video local
    const localActions = document.createElement("div");
    localActions.className = "video-external-actions";
    localActions.innerHTML = `
      <div class="video-info-bar">
        <span class="video-info-title">📹 ${videoData.titulo || category.titulo}</span>
        <span class="video-info-badge">Video MP4 HD</span>
      </div>
    `;
    videoContainer.parentNode.insertBefore(localActions, videoContainer.nextSibling);
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

  // ==========================================================================
  // INTERACCIÓN Y LIGHTBOX DEL AFICHE OFICIAL DEL PROYECTO
  // ==========================================================================
  const projectPosterCard = document.getElementById("projectPosterCard");
  const posterLightbox = document.getElementById("posterLightbox");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const btnCloseLightbox = document.getElementById("btnCloseLightbox");

  if (projectPosterCard) {
    // 3D Spatial Tilt en la tarjeta del afiche (Antigravity Tilt)
    let isHovered = false;
    projectPosterCard.addEventListener("mouseenter", () => {
      isHovered = true;
    });

    projectPosterCard.addEventListener("mousemove", (e) => {
      if (!isHovered) return;
      const rect = projectPosterCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      projectPosterCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) translateZ(10px)`;
    });

    projectPosterCard.addEventListener("mouseleave", () => {
      isHovered = false;
      projectPosterCard.style.transform = "";
    });

    // Apertura del Lightbox
    projectPosterCard.addEventListener("click", () => {
      openPosterLightbox();
    });

    projectPosterCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPosterLightbox();
      }
    });
  }

  function openPosterLightbox() {
    if (!posterLightbox) return;
    posterLightbox.classList.add("active");
    posterLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (btnCloseLightbox) btnCloseLightbox.focus();
  }

  function closePosterLightbox() {
    if (!posterLightbox || !posterLightbox.classList.contains("active")) return;
    posterLightbox.classList.remove("active");
    posterLightbox.setAttribute("aria-hidden", "true");
    if (!culturalModal?.classList.contains("active")) {
      document.body.style.overflow = "";
    }
    if (projectPosterCard) projectPosterCard.focus();
  }

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener("click", closePosterLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closePosterLightbox);
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePosterLightbox();
      closeCategoryModal(true);
    }

    // Acceso discreto para docentes / expositor con atajo de teclado (Ctrl+Shift+P o Alt+P)
    if ((e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) || (e.altKey && (e.key === "P" || e.key === "p"))) {
      e.preventDefault();
      window.open("imprimir.html", "_blank");
    }
  });

  // Acceso oculto mediante 5 toques rápidos en el pie de página
  const footerSecretTrigger = document.getElementById("footerSecretTrigger");
  if (footerSecretTrigger) {
    let secretClickCount = 0;
    let secretClickTimer = null;
    footerSecretTrigger.addEventListener("click", () => {
      secretClickCount++;
      clearTimeout(secretClickTimer);
      if (secretClickCount >= 5) {
        secretClickCount = 0;
        window.open("imprimir.html", "_blank");
      } else {
        secretClickTimer = setTimeout(() => {
          secretClickCount = 0;
        }, 2000);
      }
    });
  }

  // ==========================================================================
  // 5. ENRUTAMIENTO POR HASH (#carrozas, #murgas, #trivia, etc.)
  // ==========================================================================
  function handleHashNavigation() {
    const hash = window.location.hash.replace("#", "").toLowerCase().trim();

    if (!hash) {
      closeCategoryModal(false);
      return;
    }

    // Acceso oculto por URL para administradores / expositor (#imprimir o #admin-qr)
    if (hash === "imprimir" || hash === "admin-qr" || hash === "qr") {
      try {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = "";
      }
      window.open("imprimir.html", "_blank");
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

    // Comprobar si coincide con alguna categoría (con alias de compatibilidad)
    let normalizedHash = hash;
    if (hash === "colectivos") normalizedHash = "pericles";
    if (hash === "zambrano" || hash === "maestro-zambrano") normalizedHash = "carrozas";
    if (hash === "vodniza" || hash === "quijano") normalizedHash = "alberto-quijano";

    const matchedCategory = CARNAVAL_DATA.categorias.find((c) => c.id.toLowerCase() === normalizedHash);
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
