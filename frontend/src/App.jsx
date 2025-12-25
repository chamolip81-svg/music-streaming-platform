import { useState } from "react";

import MiniPlayer from "./layout/MiniPlayer";
import ExpandedPlayer from "./layout/ExpandedPlayer";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Album from "./pages/Album";

function App() {
  const [view, setView] = useState("home");
  const [activeAlbum, setActiveAlbum] = useState(null);

  function openAlbum(album) {
    setActiveAlbum(album);
    setView("album");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-40">
      {view === "home" && <Home openAlbum={openAlbum} />}
      {view === "album" && (
        <Album
          album={activeAlbum}
          onBack={() => setView("home")}
        />
      )}
      {view === "favorites" && <Favorites />}
      {view === "playlists" && <Playlists />}

      <MiniPlayer />
      <ExpandedPlayer />
      <BottomNav view={view} setView={setView} />
    </div>
  );
}

export default App;
