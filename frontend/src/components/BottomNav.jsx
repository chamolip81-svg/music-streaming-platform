import { Home, Heart, ListMusic } from "lucide-react";

function BottomNav({ view, setView }) {
  const tab = v =>
    `flex flex-col items-center text-xs ${
      view === v ? "text-green-400" : "text-zinc-400"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-800 bg-black py-2">
      <div className="flex justify-around">
        <button onClick={() => setView("home")} className={tab("home")}>
          <Home size={18} /> Home
        </button>
        <button
          onClick={() => setView("favorites")}
          className={tab("favorites")}
        >
          <Heart size={18} /> Favorites
        </button>
        <button
          onClick={() => setView("playlists")}
          className={tab("playlists")}
        >
          <ListMusic size={18} /> Playlists
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
