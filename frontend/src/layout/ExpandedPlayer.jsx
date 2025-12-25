import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  ChevronDown,
  Volume2,
  Shuffle,
  Repeat,
  Repeat1
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { formatTime } from "../utils/time";

function ExpandedPlayer() {
  const {
    currentSong,
    queue,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
    togglePlay,
    playNext,
    playPrev,
    seek,
    changeVolume,
    toggleShuffle,
    toggleRepeat,
    expanded,
    setExpanded
  } = usePlayer();

  if (!expanded || !currentSong) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-zinc-950 text-white animate-fadeIn">
      {/* HEADER */}
      <div className="flex items-center p-4">
        <button onClick={() => setExpanded(false)}>
          <ChevronDown size={24} />
        </button>
        <p className="mx-auto text-xs tracking-wide text-zinc-400">
          NOW PLAYING
        </p>
      </div>

      {/* ART */}
      <div className="mt-4 flex justify-center">
        <img
          src={currentSong.image}
          className="w-80 max-w-[85%] rounded-2xl shadow-2xl"
        />
      </div>

      {/* INFO */}
      <div className="mt-6 px-6 text-center">
        <h2 className="text-lg font-semibold tracking-wide">
          {currentSong.title}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          {currentSong.artist}
        </p>
      </div>

      {/* SEEK */}
      <div className="mt-6 px-6">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={e => seek(Number(e.target.value))}
          className="w-full accent-green-500"
        />
        <div className="mt-1 flex justify-between text-xs text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-8 flex items-center justify-center gap-8">
        <button
          onClick={toggleShuffle}
          className={shuffle ? "text-green-400" : "text-zinc-500"}
        >
          <Shuffle size={22} />
        </button>

        <button onClick={playPrev}>
          <SkipBack size={30} />
        </button>

        <button
          onClick={togglePlay}
          className="rounded-full bg-white p-4 text-black shadow-lg"
        >
          {isPlaying ? <Pause size={30} /> : <Play size={30} />}
        </button>

        <button onClick={playNext}>
          <SkipForward size={30} />
        </button>

        <button
          onClick={toggleRepeat}
          className={repeat !== "off" ? "text-green-400" : "text-zinc-500"}
        >
          {repeat === "one" ? <Repeat1 size={22} /> : <Repeat size={22} />}
        </button>
      </div>

      {/* VOLUME */}
      <div className="mt-6 px-6 flex items-center gap-3">
        <Volume2 size={18} className="text-zinc-400" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => changeVolume(Number(e.target.value))}
          className="flex-1 accent-green-500"
        />
      </div>

      {/* QUEUE */}
      <div className="mt-8 px-6 pb-10">
        <p className="mb-3 text-sm font-semibold">Up Next</p>

        {queue.length === 0 && (
          <p className="text-xs text-zinc-500">
            No songs in queue
          </p>
        )}

        {queue.map((s, i) => (
          <div
            key={i}
            className="mb-2 flex items-center gap-3 rounded-lg bg-zinc-900 px-3 py-2"
          >
            <span className="w-5 text-xs text-zinc-500">
              {i + 1}
            </span>
            <p className="truncate text-sm">{s.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpandedPlayer;
