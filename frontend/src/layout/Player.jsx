import { usePlayer } from "../context/PlayerContext";

function Player() {
  const { currentSong } = usePlayer();

  return (
    <footer className="fixed bottom-0 w-full bg-black p-3 text-white">
      {currentSong ? (
        <>
          <p className="text-sm">{currentSong.title}</p>
          <audio
            className="mt-2 w-full"
            src={currentSong.url}
            controls
            autoPlay
          />
        </>
      ) : (
        <p className="text-sm text-zinc-400">No song playing</p>
      )}
    </footer>
  );
}

export default Player;
