import { useFavorites } from "../context/FavoritesContext";
import { usePlayer } from "../context/PlayerContext";
import { getSongStream } from "../services/api";

function Favorites() {
  const { favorites } = useFavorites();
  const { playSong } = usePlayer();

  async function play(song) {
    const data = await getSongStream(song.id);
    if (!data?.streamUrl) return;

    playSong({ ...song, url: data.streamUrl }, favorites);
  }

  return (
    <div className="px-4 pt-4">
      {favorites.map(song => (
        <div
          key={song.id}
          onClick={() => play(song)}
          className="mb-3 flex cursor-pointer items-center gap-3 rounded bg-zinc-900 p-3"
        >
          <img src={song.image} className="h-12 w-12 rounded" />
          <div>
            <p className="text-sm">{song.title}</p>
            <p className="text-xs text-zinc-400">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
