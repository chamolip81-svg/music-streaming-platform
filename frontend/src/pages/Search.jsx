import { useEffect, useState } from "react";
import { searchSongs, getSongStream } from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../context/FavoritesContext";

function Search({ query }) {
  const [results, setResults] = useState([]);
  const { playSong } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const run = async () => {
      const data = await searchSongs(query);
      setResults(data?.data?.results || []);
    };

    run();
  }, [query]);

  const artist = (s) =>
    s?.artists?.primary?.map((a) => a.name).join(", ") || "Unknown Artist";

  async function play(song) {
    const stream = await getSongStream(song.id);
    if (!stream?.streamUrl) return;

    playSong(
      {
        id: song.id,
        title: song.name,
        artist: artist(song),
        image: song.image?.[2]?.url || "",
        url: stream.streamUrl
      },
      results
    );
  }

  if (!query) {
    return (
      <div className="px-6 py-20 text-center text-zinc-500">
        <p className="text-lg">Search for songs, artists or albums</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32">
      <h2 className="mb-6 text-xl font-semibold">
        Results for “{query}”
      </h2>

      <div className="space-y-3">
        {results.map((song) => (
          <div
            key={song.id}
            onClick={() => play(song)}
            className="flex cursor-pointer items-center gap-5 rounded-xl bg-zinc-900 px-5 py-4 hover:bg-zinc-800 transition"
          >
            <img
              src={song.image?.[2]?.url || ""}
              className="h-16 w-16 rounded-lg object-cover"
            />

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-lg font-medium">
                {song.name}
              </p>
              <p className="truncate text-sm text-zinc-400">
                {artist(song)}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite({
                  id: song.id,
                  title: song.name,
                  artist: artist(song),
                  image: song.image?.[2]?.url || ""
                });
              }}
              className="text-xl"
            >
              {isFavorite(song.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
