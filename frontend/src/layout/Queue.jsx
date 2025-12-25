import { usePlayer } from "../context/PlayerContext";

function Queue({ onClose }) {
  const {
    currentSong,
    queue,
    history,
    playSong,
    removeFromQueue
  } = usePlayer();

  return (
    <div className="fixed inset-0 z-50 bg-black text-white overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <button onClick={onClose}>⬇</button>
        <p className="text-sm text-zinc-400">Queue</p>
        <div />
      </div>

      <div className="px-4 py-3">
        {/* NOW PLAYING */}
        {currentSong && (
          <>
            <p className="text-xs text-zinc-400 mb-2">Now Playing</p>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={currentSong.image}
                alt=""
                className="h-12 w-12 rounded"
              />
              <div>
                <p className="font-medium">{currentSong.title}</p>
                <p className="text-sm text-zinc-400">
                  {currentSong.artist}
                </p>
              </div>
            </div>
          </>
        )}

        {/* UP NEXT */}
        <p className="text-xs text-zinc-400 mb-2">Up Next</p>
        {queue.map((song, index) => (
          <div
            key={song.id + index}
            className="flex items-center justify-between gap-3 py-2"
          >
            <div
              onClick={() => playSong(song, queue)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={song.image}
                alt=""
                className="h-10 w-10 rounded"
              />
              <div>
                <p className="truncate">{song.title}</p>
                <p className="text-xs text-zinc-400">
                  {song.artist}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFromQueue(index)}
              className="text-zinc-400"
            >
              ✕
            </button>
          </div>
        ))}

        {/* HISTORY */}
        {history.length > 0 && (
          <>
            <p className="text-xs text-zinc-400 mt-6 mb-2">
              Recently Played
            </p>
            {history.map((song, index) => (
              <div
                key={song.id + index}
                className="flex items-center gap-3 py-2 text-zinc-500"
              >
                <img
                  src={song.image}
                  alt=""
                  className="h-8 w-8 rounded"
                />
                <p className="truncate text-sm">{song.title}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Queue;
