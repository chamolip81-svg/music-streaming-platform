import { useEffect, useState } from "react";
import { searchSongs, getSongStream } from "../services/api";
import { usePlayer } from "../context/PlayerContext";

function Album({ album, onBack }) {
  const [tracks, setTracks] = useState([]);
  const { playSong } = usePlayer();

  useEffect(() => {
    if (!album) return;

    (async () => {
      const data = await searchSongs(album.name);
      setTracks(data?.data?.results || []);
    })();
  }, [album]);

  async function playFrom(index) {
    const enriched = await Promise.all(
      tracks.map(async s => {
        const data = await getSongStream(s.id);
        return {
          id: s.id,
          title: s.name,
          artist: s.artists?.primary?.[0]?.name || "",
          image: s.image?.[2]?.url || "",
          url: data?.streamUrl || ""
        };
      })
    );

    playSong(enriched[index], enriched);
  }

  if (!album) return null;

  return (
    <div className="px-4 pt-4 pb-32">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-zinc-400"
      >
        ← Back
      </button>

      <div className="mb-6 flex gap-4">
        <img
          src={album.image}
          className="h-36 w-36 rounded object-cover"
        />
        <div>
          <p className="text-xs text-zinc-400">Album</p>
          <h1 className="text-xl font-semibold">{album.name}</h1>
          <p className="text-sm text-zinc-400">{album.artist}</p>

          <button
            onClick={() => playFrom(0)}
            className="mt-3 rounded bg-green-500 px-4 py-1 text-black"
          >
            ▶ Play
          </button>
        </div>
      </div>

      {tracks.map((s, i) => (
        <div
          key={s.id}
          onClick={() => playFrom(i)}
          className="mb-2 flex cursor-pointer items-center gap-3 rounded bg-zinc-900 p-3"
        >
          <span className="w-6 text-xs text-zinc-400">
            {i + 1}
          </span>
          <p className="flex-1 text-sm">{s.name}</p>
          <p className="text-xs text-zinc-400">
            {s.artists?.primary?.[0]?.name || ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Album;
