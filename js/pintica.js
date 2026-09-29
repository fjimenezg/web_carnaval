/**
 * Módulo de "La Pintica Virtual" - Carnaval de Pasto
 * Animación interactiva de la tradicional pintica de cosmético negro o espuma blanca.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const btnPedirPintica = document.getElementById("btnPedirPintica");
    const pinticaOverlay = document.getElementById("pinticaOverlay");

    if (!btnPedirPintica || !pinticaOverlay) return;

    let timeoutId = null;

    btnPedirPintica.addEventListener("click", () => {
      activarPintica();
    });

    // Cerrar al tocar la pantalla
    pinticaOverlay.addEventListener("click", () => {
      cerrarPintica();
    });

    function activarPintica() {
      // Alternar aleatoriamente entre Pintica Negra (5 de enero) y Espuma Blanca (6 de enero)
      const esBlanco = Math.random() > 0.6;
      const splat = pinticaOverlay.querySelector(".pintica-splat");

      if (splat) {
        if (esBlanco) {
          splat.style.background = "radial-gradient(circle, #ffffff 60%, rgba(240, 240, 255, 0.8) 80%, transparent 100%)";
          splat.style.boxShadow = "0 0 50px rgba(255, 255, 255, 0.9)";
          splat.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 0.25rem;">🤍🎉</div>
            <h3 style="color: #111;">¡Talco y Carioca!</h3>
            <p style="color: #7b2cbf;">¡Que vivan los Blancos!</p>
          `;
        } else {
          splat.style.background = "radial-gradient(circle, #1a1a1a 60%, rgba(30, 30, 30, 0.8) 80%, transparent 100%)";
          splat.style.boxShadow = "0 0 50px rgba(0, 0, 0, 0.8)";
          splat.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 0.25rem;">🖤🎭</div>
            <h3 style="color: #fff;">¡Una Pintica por favor!</h3>
            <p style="color: #ffb703;">¡Que vivan los Negros!</p>
          `;
        }
      }

      // Sonido festivo con Web Audio API
      reproducirSonidoPintica();

      // Mostrar overlay
      pinticaOverlay.classList.add("active");

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cerrarPintica();
      }, 2600);
    }

    function cerrarPintica() {
      pinticaOverlay.classList.remove("active");
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    function reproducirSonidoPintica() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch (e) {
        // Silencio si no está permitido
      }
    }

    // Exponer función global
    window.activarPintica = activarPintica;
  });
})();
