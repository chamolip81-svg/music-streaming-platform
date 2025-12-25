import { useState } from "react";
import { searchSongs, getSongStream } from "../services/api";
import { usePlayer } from "../context/PlayerContext";

function Home() {
  const [songs, setSongs] = useState([]);
  const { setCurrentSong } = usePlayer();

  async function handleSearch(e) {
    if (e.key === "Enter") {
      const data = await searchSongs(e.target.value);
      setSongs(data?.data?.results || []);
    }
  }

  async function playSong(song) {
    const data = await getSongStream(song.id);
    setCurrentSong({
      title: song.name || song.title,
      artist: song.primaryArtists,
      url: data.streamUrl
    });
  }

  return (
    <div>
      <input placeholder="Search and press Enter" onKeyDown={handleSearch} />

      {songs.map((song) => (
        <div key={song.id} onClick={() => playSong(song)}>
          {song.name || song.title}
        </div>
      ))}
    </div>
  );
}

export default Home;
