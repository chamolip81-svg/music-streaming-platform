import { useEffect, useState } from "react";
import { searchSongs, getSongStream } from "../services/api";
import { usePlayer } from "../context/PlayerContext";
import CategorySection from "../components/CategorySection";
import { CATEGORIES } from "../data/categories";
import { Play } from "lucide-react";
import TopNav from "../components/TopNav";

function Home({ openAlbum }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const { playSong } = usePlayer();

  /* SEARCH */
  useEffect(() => {
    if (!query) {
      setSongs([]);
      return;
    }

    const timer = setTimeout(async () => {
      const data = await searchSongs(query);
      setSongs(data?.data?.results || []);
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  async function play(song, list) {
    const data = await getSongStream(song.id);
    if (!data?.streamUrl) return;

    playSong(
      {
        id: song.id,
        title: song.name,
        artist: song.artists?.primary?.[0]?.name || "",
        image: song.image?.[2]?.url || "",
        url: data.streamUrl
      },
      list
    );
  }

  return (
    <div className="pb-32">
      {/* TOP NAV */}
      <TopNav query={query} setQuery={setQuery} />

      <div className="px-4 pt-4">
        {/* CATEGORIES */}
        {!query &&
          CATEGORIES.map(cat => (
            <CategorySection
              key={cat.key}
              title={cat.title}
              query={cat.query}
              onAlbumClick={openAlbum}
            />
          ))}

        {/* SEARCH RESULTS */}
        {songs.map(song => {
          const list = songs.map(s => ({
            id: s.id,
            title: s.name,
            artist: s.artists?.primary?.[0]?.name || "",
            image: s.image?.[2]?.url || "",
            url: ""
          }));

          return (
            <div
              key={song.id}
              className="mb-3 flex items-center gap-3 rounded-lg bg-zinc-900 p-3"
            >
              <img
                src={song.image?.[2]?.url}
                className="h-12 w-12 rounded object-cover"
              />

              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm">{song.name}</p>
                <p className="truncate text-xs text-zinc-400">
                  {song.artists?.primary?.[0]?.name}
                </p>
              </div>

              <button
                onClick={() => play(song, list)}
                className="rounded-full bg-green-500 p-2 text-black press"
              >
                <Play size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
