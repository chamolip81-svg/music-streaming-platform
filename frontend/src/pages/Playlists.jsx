import { usePlaylists } from "../context/PlaylistsContext";
import { usePlayer } from "../context/PlayerContext";
import { getSongStream } from "../services/api";

function Playlists() {
  const { playlists, createPlaylist } = usePlaylists();
  const { playSong } = usePlayer();

  async function playPlaylist(pl) {
    if (!pl.songs.length) return;

    const enriched = await Promise.all(
      pl.songs.map(async s => {
        const data = await getSongStream(s.id);
        return { ...s, url: data?.streamUrl || "" };
      })
    );

    playSong(enriched[0], enriched);
  }

  return (
    <div className="px-4 pt-4">
      <button
        onClick={() => {
          const name = prompt("Playlist name?");
          if (name) createPlaylist(name);
        }}
        className="mb-4 rounded bg-zinc-800 px-3 py-1"
      >
        + Create Playlist
      </button>

      {playlists.map(pl => (
        <div
          key={pl.id}
          className="mb-3 rounded bg-zinc-900 p-3"
        >
          <div className="flex items-center justify-between">
            <p>{pl.name}</p>
            <button onClick={() => playPlaylist(pl)}>▶</button>
          </div>
          <p className="text-xs text-zinc-400">
            {pl.songs.length} songs
          </p>
        </div>
      ))}
    </div>
  );
}

export default Playlists;
