import { useState } from "react";
import { searchSongs } from "../services/api";

function Home() {
  const [songs, setSongs] = useState([]);

  async function handleSearch(e) {
    if (e.key === "Enter") {
      const data = await searchSongs(e.target.value);
      setSongs(data?.data?.results || []);
    }
  }

  return (
    <div>
      <input
        placeholder="Type and press Enter"
        onKeyDown={handleSearch}
      />

      {songs.map((song) => (
        <div key={song.id}>
          {song.name || song.title}
        </div>
      ))}
    </div>
  );
}

export default Home;
