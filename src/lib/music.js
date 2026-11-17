// Reproductor global del sitio: un solo <audio> compartido entre islas.
// - Suena por defecto "Blood In Your Eyes". Los navegadores bloquean el audio
//   con sonido hasta que el usuario interactúa, así que si el play se bloquea
//   arranca en el primer clic / tecla / toque.
// - La preferencia (sonido on/off) se guarda en localStorage.

export const SONGS = {
  // start: segundo desde el que arranca (y al que vuelve al repetir)
  blood: { src: "/music/blood-in-your-eyes.mp3", title: "Blood In Your Eyes", artist: "Tove Lo", start: 38 },
  flower: { src: "/music/flower-in-a-hurricane.mp3", title: "Flower In A Hurricane", artist: "Justice ft. Tame Impala & SZA" },
  magic: { src: "/music/sexy-magic.mp3", title: "Sexy Magic", artist: "CA7RIEL & Paco Amoroso, PinkPantheress, Fred again.." },
};
export const DEFAULT_SONG = "blood";
const PREF_KEY = "rv-sound";
const VOLUME = 0.12; // música de fondo: baja para no molestar

function readPref() {
  try { return localStorage.getItem(PREF_KEY) !== "off"; } catch { return true; }
}
function writePref(on) {
  try { localStorage.setItem(PREF_KEY, on ? "on" : "off"); } catch { /* sin storage */ }
}

function create() {
  const listeners = new Set();
  const state = { song: DEFAULT_SONG, on: readPref(), playing: false, waiting: false };
  let audio = null;
  let unlockBound = false;

  const emit = () => listeners.forEach((fn) => fn({ ...state }));

  function ensureAudio() {
    if (audio) return audio;
    audio = new Audio();
    audio.volume = VOLUME;
    audio.preload = "none";
    audio.addEventListener("playing", () => { state.playing = true; state.waiting = false; emit(); });
    audio.addEventListener("pause", () => { state.playing = false; emit(); });
    // al cargar una canción, saltar a su segundo de inicio
    audio.addEventListener("loadedmetadata", () => {
      const start = SONGS[state.song].start || 0;
      if (start && audio.currentTime < start) audio.currentTime = start;
    });
    // repetir desde el segundo de inicio (no desde 0)
    audio.addEventListener("ended", () => {
      audio.currentTime = SONGS[state.song].start || 0;
      if (state.on) audio.play().catch(() => {});
    });
    loadSong(state.song);
    return audio;
  }

  function loadSong(id) {
    const { src, start } = SONGS[id];
    // el fragmento #t= ayuda a que el navegador pida directo esa parte del archivo
    audio.src = start ? `${src}#t=${start}` : src;
  }

  function onFirstGesture() {
    removeUnlock();
    if (state.on && !state.playing) tryPlay();
  }
  function bindUnlock() {
    if (unlockBound) return;
    unlockBound = true;
    ["pointerdown", "keydown", "touchstart"].forEach((t) =>
      window.addEventListener(t, onFirstGesture, { capture: true, passive: true })
    );
  }
  function removeUnlock() {
    if (!unlockBound) return;
    unlockBound = false;
    ["pointerdown", "keydown", "touchstart"].forEach((t) =>
      window.removeEventListener(t, onFirstGesture, { capture: true })
    );
  }

  function tryPlay() {
    const a = ensureAudio();
    const p = a.play();
    if (p && p.catch) {
      p.catch(() => {
        // autoplay bloqueado: esperamos la primera interacción
        state.waiting = true;
        emit();
        bindUnlock();
      });
    }
  }

  return {
    get state() { return { ...state }; },
    subscribe(fn) { listeners.add(fn); fn({ ...state }); return () => listeners.delete(fn); },
    init() {
      if (state.on) tryPlay();
    },
    setOn(on) {
      state.on = on;
      writePref(on);
      if (on) tryPlay();
      else { removeUnlock(); state.waiting = false; if (audio) audio.pause(); }
      emit();
    },
    // Si el audio estaba bloqueado esperando interacción, el clic en el botón
    // significa "quiero oírlo", no apagarlo.
    toggle() { this.setOn(state.waiting ? true : !state.on); },
    setSong(id) {
      if (!SONGS[id] || id === state.song) return;
      state.song = id;
      if (audio) loadSong(id);
      else ensureAudio();
      if (state.on) tryPlay();
      emit();
    },
  };
}

export function getMusic() {
  if (typeof window === "undefined") return null;
  if (!window.__rvMusic) window.__rvMusic = create();
  return window.__rvMusic;
}
