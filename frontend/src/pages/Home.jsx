import { useState, useEffect } from "react";
import { searchSongs, getSongStream } from "../services/api";
import { usePlayer } from "../context/PlayerContext";

function Home({ searchQuery }) {
  const [songs, setSongs] = useState([]);
  const { setCurrentSong } = usePlayer();

  async function handleSearch(query) {
    try {
      if (!query || typeof query !== "string") {
        setSongs([]);
        return;
      }

      const data = await searchSongs(query);

      if (
        !data ||
        !data.data ||
        !Array.isArray(data.data.results)
      ) {
        setSongs([]);
        return;
      }

      setSongs(data.data.results);
    } catch (err) {
      console.error("Search error:", err);
      setSongs([]);
    }
  }

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "string") {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  async function playSong(song) {
    try {
      const data = await getSongStream(song.id);
      if (!data || !data.streamUrl) return;

      setCurrentSong({
        title: song.name || song.title || "Unknown Song",
        artist:
          song.primaryArtists ||
          song.artists ||
          song.singers ||
          "Unknown Artist",
        url: data.streamUrl
      });
    } catch (err) {
      console.error("Play error:", err);
    }
  }

  function getArtistName(song) {
    // JioSaavn correct structure
    if (
      song?.artists?.primary &&
      Array.isArray(song.artists.primary) &&
      song.artists.primary.length > 0
    ) {
      return song.artists.primary.map(a => a.name).join(", ");
    }

    return "Unknown Artist";
  }

  return (
    <main className="min-h-screen bg-zinc-900 px-4 pb-24 text-white">
      <div className="space-y-3">
        {Array.isArray(songs) &&
          songs.map((song) => {
            const imageUrl =
              song?.image?.[2]?.url ||
              song?.image?.[1]?.url ||
              song?.image?.[0]?.url ||
              "";

            const artistName = getArtistName(song);

            return (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                className="flex items-center gap-4 rounded bg-zinc-800 p-3 active:bg-zinc-700"
              >
                <img
                  src={imageUrl}
                  alt={song.name || song.title || "song"}
                  className="h-14 w-14 rounded object-cover bg-zinc-700"
                />

                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium">
                    {song.name || song.title || "Unknown Song"}
                  </p>
                  <p className="truncate text-sm text-zinc-400">
                    {artistName}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Home;
