import { usePlayer } from "../context/PlayerContext";

function Player() {
  const { currentSong } = usePlayer();

  if (!currentSong) {
    return <footer>No song playing</footer>;
  }

  return (
    <footer>
      <p>{currentSong.title}</p>
      <audio src={currentSong.url} controls autoPlay />
    </footer>
  );
}

export default Player;
