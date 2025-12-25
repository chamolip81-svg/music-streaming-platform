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
    <main className="min-h-screen bg-zinc-900 px-4 pb-24 text-white">
      <input
        onKeyDown={handleSearch}
        placeholder="Type and press Enter"
        className="mb-4 w-full rounded bg-zinc-800 px-4 py-2"
      />

      <div className="space-y-2">
        {songs.map(song => (
          <div
            key={song.id}
            onClick={() => playSong(song)}
            className="cursor-pointer select-none rounded bg-zinc-800 p-3 active:bg-zinc-700"
          >
            {song.name || song.title}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
