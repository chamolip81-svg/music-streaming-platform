import { useEffect, useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause, ChevronDown } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

function NowPlaying({ onClose }) {
  const { currentSong, playNext, playPrev } = usePlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
  }, []);

  if (!currentSong) return null;

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }

  function seek(e) {
    if (!audioRef.current) return;
    const time = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
  }

  return (
    <div className="fixed inset-0 z-[999] bg-zinc-950 text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onClose}>
          <ChevronDown size={24} />
        </button>
        <p className="text-sm text-zinc-400">Now Playing</p>
        <div className="w-6" />
      </div>

      {/* ARTWORK */}
      <div className="flex justify-center px-8 mt-6">
        <img
          src={currentSong.image}
          className="w-full max-w-sm rounded-xl shadow-2xl"
        />
      </div>

      {/* INFO */}
      <div className="mt-6 px-6 text-center">
        <h2 className="text-lg font-semibold">{currentSong.title}</h2>
        <p className="text-sm text-zinc-400">{currentSong.artist}</p>
      </div>

      {/* PROGRESS */}
      <div className="mt-6 px-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={seek}
          className="w-full"
        />
      </div>

      {/* CONTROLS */}
      <div className="mt-8 flex items-center justify-center gap-8">
        <button onClick={playPrev}>
          <SkipBack size={28} />
        </button>

        <button
          onClick={togglePlay}
          className="rounded-full bg-white p-4 text-black"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <button onClick={playNext}>
          <SkipForward size={28} />
        </button>
      </div>
    </div>
  );
}

export default NowPlaying;
