import { useEffect, useState } from "react";
import { searchSongs } from "../services/api";

function CategorySection({ title, query, onAlbumClick }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let active = true;

    (async () => {
      const data = await searchSongs(query);
      const results = data?.data?.results || [];

      const map = new Map();
      results.forEach(s => {
        if (s.album?.id && !map.has(s.album.id)) {
          map.set(s.album.id, {
            id: s.album.id,
            name: s.album.name,
            artist: s.artists?.primary?.[0]?.name || "",
            image: s.image?.[2]?.url || ""
          });
        }
      });

      if (active) {
        setAlbums([...map.values()].slice(0, 10));
      }
    })();

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {albums.map(album => (
          <button
            key={album.id}
            type="button"
            onClick={() => onAlbumClick(album)}
            className="min-w-[140px] text-left card focus:outline-none"
          >
            <img
              src={album.image}
              alt={album.name}
              className="mb-2 h-36 w-36 rounded-lg object-cover"
              draggable={false}
            />
            <p className="truncate text-sm">{album.name}</p>
            <p className="truncate text-xs text-zinc-400">
              {album.artist}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
