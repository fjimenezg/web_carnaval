/**
 * Módulo de Trivia Interactiva - Carnaval de Pasto
 * Flujo paso a paso con retroalimentación inmediata, confetti y medalla digital.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof CARNAVAL_DATA === "undefined" || !CARNAVAL_DATA.trivia) return;

    const triviaList = CARNAVAL_DATA.trivia;
    let currentIndex = 0;
    let score = 0;
    let hasAnswered = false;

    // Elementos DOM
    const btnIniciarTrivia = document.getElementById("btnIniciarTrivia");
    const triviaModal = document.getElementById("triviaModal");
    const btnCloseTrivia = document.getElementById("btnCloseTrivia");
    const triviaQuestionScreen = document.getElementById("triviaQuestionScreen");
    const triviaResultScreen = document.getElementById("triviaResultScreen");
    const triviaProgressFill = document.getElementById("triviaProgressFill");
    const triviaCounter = document.getElementById("triviaCounter");
    const triviaQuestionText = document.getElementById("triviaQuestionText");
    const triviaOptionsContainer = document.getElementById("triviaOptionsContainer");
    const triviaFeedback = document.getElementById("triviaFeedback");
    const btnSiguientePregunta = document.getElementById("btnSiguientePregunta");
    const triviaFinalScore = document.getElementById("triviaFinalScore");
    const btnReiniciarTrivia = document.getElementById("btnReiniciarTrivia");

    if (!triviaModal) return;

    // ==========================================================================
    // APERTURA Y CIERRE
    // ==========================================================================
    function abrirTrivia() {
      currentIndex = 0;
      score = 0;
      hasAnswered = false;

      triviaQuestionScreen.style.display = "block";
      triviaResultScreen.style.display = "none";

      cargarPregunta();

      triviaModal.classList.add("active");
      triviaModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function cerrarTrivia() {
      triviaModal.classList.remove("active");
      triviaModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      // Si el hash era trivia, limpiarlo
      if (window.location.hash === "#trivia") {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }

    if (btnIniciarTrivia) {
      btnIniciarTrivia.addEventListener("click", () => {
        abrirTrivia();
      });
    }

    if (btnCloseTrivia) {
      btnCloseTrivia.addEventListener("click", () => {
        cerrarTrivia();
      });
    }

    if (triviaModal) {
      triviaModal.addEventListener("click", (e) => {
        if (e.target === triviaModal) {
          cerrarTrivia();
        }
      });
    }

    // ==========================================================================
    // RENDERIZADO DE PREGUNTA
    // ==========================================================================
    function cargarPregunta() {
      hasAnswered = false;
      const current = triviaList[currentIndex];
      const total = triviaList.length;

      // Actualizar barra de progreso y contador
      const progressPercent = ((currentIndex + 1) / total) * 100;
      if (triviaProgressFill) triviaProgressFill.style.width = `${progressPercent}%`;
      if (triviaCounter) triviaCounter.textContent = `Pregunta ${currentIndex + 1} de ${total}`;
      if (triviaQuestionText) triviaQuestionText.textContent = current.pregunta;

      // Ocultar feedback y botón siguiente
      if (triviaFeedback) {
        triviaFeedback.className = "trivia-feedback";
        triviaFeedback.textContent = "";
      }
      if (btnSiguientePregunta) btnSiguientePregunta.style.display = "none";

      // Renderizar opciones
      if (triviaOptionsContainer) {
        triviaOptionsContainer.innerHTML = "";

        current.opciones.forEach((opc) => {
          const btn = document.createElement("button");
          btn.className = "trivia-option-btn";
          btn.innerHTML = `<span>⚪</span> <span>${opc.texto}</span>`;

          btn.addEventListener("click", () => {
            if (hasAnswered) return;
            evaluarRespuesta(opc, btn);
          });

          triviaOptionsContainer.appendChild(btn);
        });
      }
    }

    // ==========================================================================
    // EVALUACIÓN DE RESPUESTA
    // ==========================================================================
    function evaluarRespuesta(opcionSeleccionada, botonPulsado) {
      hasAnswered = true;
      const current = triviaList[currentIndex];
      const allButtons = triviaOptionsContainer.querySelectorAll(".trivia-option-btn");

      // Desactivar todos los botones
      allButtons.forEach((btn) => {
        btn.style.cursor = "default";
      });

      if (opcionSeleccionada.correcta) {
        score++;
        botonPulsado.classList.add("correct");
        botonPulsado.querySelector("span").textContent = "✅";
        reproducirSonidoTrivia(true);

        if (triviaFeedback) {
          triviaFeedback.textContent = current.explicacion;
          triviaFeedback.className = "trivia-feedback active";
          triviaFeedback.style.borderLeft = "4px solid var(--color-carnaval-green)";
        }
      } else {
        botonPulsado.classList.add("incorrect");
        botonPulsado.querySelector("span").textContent = "❌";
        reproducirSonidoTrivia(false);

        // Resaltar la correcta para aprendizaje
        current.opciones.forEach((opc, idx) => {
          if (opc.correcta) {
            allButtons[idx].classList.add("correct");
            allButtons[idx].querySelector("span").textContent = "✅";
          }
        });

        if (triviaFeedback) {
          triviaFeedback.textContent = `¡Casi! ${current.explicacion}`;
          triviaFeedback.className = "trivia-feedback active";
          triviaFeedback.style.borderLeft = "4px solid #ff0046";
        }
      }

      // Mostrar botón de avance
      if (btnSiguientePregunta) {
        btnSiguientePregunta.style.display = "flex";
        btnSiguientePregunta.focus();
      }
    }

    // ==========================================================================
    // SIGUIENTE PREGUNTA Y RESULTADOS
    // ==========================================================================
    if (btnSiguientePregunta) {
      btnSiguientePregunta.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < triviaList.length) {
          cargarPregunta();
        } else {
          mostrarResultados();
        }
      });
    }

    function mostrarResultados() {
      triviaQuestionScreen.style.display = "none";
      triviaResultScreen.style.display = "block";

      const total = triviaList.length;
      if (triviaFinalScore) {
        triviaFinalScore.textContent = `Has respondido correctamente ${score} de ${total} preguntas.`;
      }

      // Lanzar lluvia de confetti festivo
      lanzarConfetti();
      reproducirFanfarria();
    }

    if (btnReiniciarTrivia) {
      btnReiniciarTrivia.addEventListener("click", () => {
        abrirTrivia();
      });
    }

    // ==========================================================================
    // EFECTOS SONOROS Y CONFETTI
    // ==========================================================================
    function reproducirSonidoTrivia(acierto) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (acierto) {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
          osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        } else {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
      } catch (e) {}
    }

    function reproducirFanfarria() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const notas = [523.25, 659.25, 783.99, 1046.5]; // Arpegio triunfal C mayor
        notas.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.4);
        });
      } catch (e) {}
    }

    function lanzarConfetti() {
      // Crear contenedor flotante de partículas si no existe
      const confettiWrapper = document.createElement("div");
      confettiWrapper.style.position = "fixed";
      confettiWrapper.style.inset = "0";
      confettiWrapper.style.pointerEvents = "none";
      confettiWrapper.style.zIndex = "100001";
      document.body.appendChild(confettiWrapper);

      const colors = ["#ff007f", "#ffb703", "#00e5ff", "#7b2cbf", "#00f59b", "#ffffff"];

      for (let i = 0; i < 60; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 10 + 6;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 2 + 1.5;
        const delay = Math.random() * 0.5;

        particle.style.position = "absolute";
        particle.style.width = `${size}px`;
        particle.style.height = `${size * 0.6}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.top = "-20px";
        particle.style.borderRadius = "2px";
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        particle.style.transition = `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`;

        confettiWrapper.appendChild(particle);

        setTimeout(() => {
          particle.style.top = "105vh";
          particle.style.transform = `rotate(${Math.random() * 720}deg) scale(0.6)`;
          particle.style.opacity = "0";
        }, 30);
      }

      setTimeout(() => {
        confettiWrapper.remove();
      }, 3500);
    }

    // Exponer globalmente
    window.abrirTrivia = abrirTrivia;
    window.cerrarTrivia = cerrarTrivia;
  });
})();
