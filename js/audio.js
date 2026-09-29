/**
 * Módulo de Audio Tradicional - Carnaval de Pasto
 * Control de música tradicional con fallback interactivo Web Audio si no hay MP3 cargado.
 */

(function () {
  let isPlaying = false;
  let audioContext = null;
  let synthLoopTimeout = null;

  document.addEventListener("DOMContentLoaded", () => {
    const btnAudioToggle = document.getElementById("btnAudioToggle");
    const audioIcon = document.getElementById("audioIcon");
    const audioLabel = document.getElementById("audioLabel");
    const audioElement = document.getElementById("audioCarnaval");

    if (!btnAudioToggle) return;

    btnAudioToggle.addEventListener("click", () => {
      toggleMusic();
    });

    function toggleMusic() {
      if (!isPlaying) {
        startMusic();
      } else {
        stopMusic();
      }
    }

    function startMusic() {
      isPlaying = true;
      btnAudioToggle.classList.add("active");
      if (audioIcon) audioIcon.textContent = "🔊";
      if (audioLabel) audioLabel.textContent = "Pausar";

      // Intentar reproducir el elemento de audio HTML5
      if (audioElement && audioElement.currentSrc) {
        audioElement.play().catch((err) => {
          console.log("No se pudo reproducir archivo local, activando melodía festiva sintética:", err);
          startSynthMusic();
        });
      } else {
        startSynthMusic();
      }
    }

    function stopMusic() {
      isPlaying = false;
      btnAudioToggle.classList.remove("active");
      if (audioIcon) audioIcon.textContent = "🎵";
      if (audioLabel) audioLabel.textContent = "Música";

      if (audioElement) {
        audioElement.pause();
      }
      stopSynthMusic();
    }

    // ==========================================================================
    // SINTETIZADOR ANDINO DE RESPALDO (Web Audio API)
    // Melodía festiva tipo zampoña/quena con ritmo de bombo y redoblante
    // ==========================================================================
    function getAudioContext() {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioCtx();
      }
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      return audioContext;
    }

    // Melodía andina en pentatónica menor (Estilo Sonsureño / Carnaval)
    const melodyNotes = [
      { f: 587.33, d: 0.25 }, // D5
      { f: 659.25, d: 0.25 }, // E5
      { f: 783.99, d: 0.4 },  // G5
      { f: 659.25, d: 0.2 },  // E5
      { f: 587.33, d: 0.35 }, // D5
      { f: 440.00, d: 0.25 }, // A4
      { f: 523.25, d: 0.25 }, // C5
      { f: 587.33, d: 0.5 },  // D5
      { f: 783.99, d: 0.25 }, // G5
      { f: 880.00, d: 0.25 }, // A5
      { f: 783.99, d: 0.35 }, // G5
      { f: 659.25, d: 0.25 }, // E5
      { f: 587.33, d: 0.6 }   // D5
    ];

    let noteIndex = 0;

    function playNextNote() {
      if (!isPlaying) return;

      const ctx = getAudioContext();
      const note = melodyNotes[noteIndex];

      // Oscilador para sonido de flauta/zampoña andina
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.f, ctx.currentTime);

      // Envolvente de sonido suave
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + note.d);

      // Ritmo de percusión festiva (bombo sordo)
      if (noteIndex % 2 === 0) {
        playDrumBeat(ctx);
      }

      noteIndex = (noteIndex + 1) % melodyNotes.length;
      synthLoopTimeout = setTimeout(playNextNote, note.d * 1000);
    }

    function playDrumBeat(ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }

    function startSynthMusic() {
      noteIndex = 0;
      playNextNote();
    }

    function stopSynthMusic() {
      if (synthLoopTimeout) {
        clearTimeout(synthLoopTimeout);
        synthLoopTimeout = null;
      }
    }
  });
})();
