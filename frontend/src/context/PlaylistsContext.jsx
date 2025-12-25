import { createContext, useContext, useEffect, useState } from "react";

const PlaylistsContext = createContext();

export function PlaylistsProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("playlists");
    if (saved) setPlaylists(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  function createPlaylist(name) {
    setPlaylists(p => [...p, { id: Date.now(), name, songs: [] }]);
  }

  function addToPlaylist(id, song) {
    setPlaylists(p =>
      p.map(pl =>
        pl.id === id
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  }

  return (
    <PlaylistsContext.Provider
      value={{ playlists, createPlaylist, addToPlaylist }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
}

export function usePlaylists() {
  return useContext(PlaylistsContext);
}
