import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { formatTime } from "../utils/time";

function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setExpanded
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-14 left-0 right-0 z-40 border-t border-zinc-800 bg-black">
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={e => seek(Number(e.target.value))}
        className="w-full accent-green-500"
      />

      <div
        className="flex items-center gap-3 px-4 py-2"
        onClick={() => setExpanded(true)}
      >
        <img
          src={currentSong.image}
          className="h-10 w-10 rounded object-cover"
        />

        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm">{currentSong.title}</p>
          <p className="truncate text-xs text-zinc-400">
            {currentSong.artist}
          </p>
        </div>

        <p className="text-xs text-zinc-400 w-16 text-right">
          {formatTime(currentTime)}
        </p>

        <button onClick={e => { e.stopPropagation(); playPrev(); }}>
          <SkipBack size={18} />
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            togglePlay();
          }}
          className="rounded-full bg-white p-2 text-black"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button onClick={e => { e.stopPropagation(); playNext(); }}>
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
}

export default MiniPlayer;
