import { useEffect, useState } from "react";
import { getMusic, SONGS, DEFAULT_SONG } from "../../lib/music.js";

// Control flotante de sonido (esquina inferior derecha): mini walkman neón.
export default function SoundToggle() {
  const [s, setS] = useState({ song: DEFAULT_SONG, on: true, playing: false, waiting: false });

  useEffect(() => {
    const m = getMusic();
    const off = m.subscribe(setS);
    m.init();
    return off;
  }, []);

  const song = SONGS[s.song];
  const audible = s.on && s.playing;
  const label = !s.on ? "SOUND OFF" : audible ? "SOUND ON" : "CLIC = SONIDO";

  return (
    <button
      type="button"
      className={"rw-sound" + (audible ? " is-on" : "") + (!s.on ? " is-off" : "")}
      onClick={() => getMusic().toggle()}
      aria-pressed={audible}
      aria-label={audible ? `Silenciar música (${song.artist} – ${song.title})` : "Activar música"}
      title={audible ? "Silenciar" : "Activar sonido"}
    >
      <span className="rw-sound-eq" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </span>
      <span className="rw-sound-txt">
        <span className="rw-sound-state">{label}</span>
        <span className="rw-sound-song" aria-hidden="true">
          <span>{"♪ " + song.artist + " — " + song.title + "   ♪ " + song.artist + " — " + song.title + "   "}</span>
        </span>
      </span>
      <span className="rw-sound-ico" aria-hidden="true">{audible ? "◀))" : "◀×"}</span>
    </button>
  );
}
