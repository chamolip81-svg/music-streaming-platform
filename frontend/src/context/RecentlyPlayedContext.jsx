import { createContext, useContext, useEffect, useState } from "react";

const RecentlyPlayedContext = createContext();

export function RecentlyPlayedProvider({ children }) {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    if (saved) setRecent(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
  }, [recent]);

  function addRecent(song) {
    setRecent(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20);
    });
  }

  return (
    <RecentlyPlayedContext.Provider value={{ recent, addRecent }}>
      {children}
    </RecentlyPlayedContext.Provider>
  );
}

export function useRecentlyPlayed() {
  return useContext(RecentlyPlayedContext);
}
