import { usePlaylists } from "../context/PlaylistsContext";

function PlaylistMenu({ song }) {
  const { playlists, addToPlaylist } = usePlaylists();

  if (playlists.length === 0) return null;

  return (
    <select
      onChange={e => addToPlaylist(Number(e.target.value), song)}
      className="ml-2 rounded bg-zinc-800 text-xs"
      defaultValue=""
    >
      <option value="" disabled>
        + Playlist
      </option>
      {playlists.map(p => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}

export default PlaylistMenu;
