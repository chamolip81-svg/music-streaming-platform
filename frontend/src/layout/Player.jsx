import { useEffect, useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

function Player({ openNowPlaying }) {
  const { currentSong, playNext, playPrev } = usePlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentSong?.url) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={playNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* MINI PLAYER */}
      <div
        onClick={openNowPlaying}
        className="fixed bottom-14 left-0 right-0 z-50 border-t border-zinc-800 bg-black px-4 py-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <img
            src={currentSong.image}
            className="h-10 w-10 rounded"
          />

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm">{currentSong.title}</p>
            <p className="truncate text-xs text-zinc-400">
              {currentSong.artist}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playPrev();
            }}
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isPlaying
                ? audioRef.current.pause()
                : audioRef.current.play();
            }}
            className="rounded-full bg-white p-2 text-black"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Player;
