import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const audio = audioRef.current;

  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const [expanded, setExpanded] = useState(false);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // off | all | one

  /* ---------- AUDIO EVENTS ---------- */
  useEffect(() => {
    audio.volume = volume;

    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
        return;
      }
      playNext();
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
    };
  }, [volume, repeat]);

  /* ---------- HELPERS ---------- */
  function shuffleList(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /* ---------- CONTROLS ---------- */
  function playSong(song, list = []) {
    if (!song?.url) return;

    if (currentSong) setHistory(h => [currentSong, ...h]);
    setCurrentSong(song);

    if (list.length) {
      const idx = list.findIndex(s => s.id === song.id);
      let nextQueue = list.slice(idx + 1);
      if (shuffle) nextQueue = shuffleList(nextQueue);
      setQueue(nextQueue);
    }

    audio.src = song.url;
    audio.play();
  }

  function togglePlay() {
    if (!audio.src) return;
    isPlaying ? audio.pause() : audio.play();
  }

  function playNext() {
    if (!queue.length) {
      if (repeat === "all" && history.length) {
        const replay = shuffle ? shuffleList(history) : [...history].reverse();
        const [next, ...rest] = replay;
        setHistory([]);
        setQueue(rest);
        setCurrentSong(next);
        audio.src = next.url;
        audio.play();
      }
      return;
    }

    const [next, ...rest] = queue;
    if (currentSong) setHistory(h => [currentSong, ...h]);
    setCurrentSong(next);
    setQueue(rest);

    audio.src = next.url;
    audio.play();
  }

  function playPrev() {
    if (!history.length) return;
    const [prev, ...rest] = history;

    setHistory(rest);
    if (currentSong) setQueue(q => [currentSong, ...q]);
    setCurrentSong(prev);

    audio.src = prev.url;
    audio.play();
  }

  function seek(time) {
    audio.currentTime = time;
    setCurrentTime(time);
  }

  function changeVolume(v) {
    setVolume(v);
    audio.volume = v;
  }

  function toggleShuffle() {
    setShuffle(s => !s);
    if (!shuffle && queue.length) {
      setQueue(q => shuffleList(q));
    }
  }

  function toggleRepeat() {
    setRepeat(r => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        history,
        isPlaying,
        currentTime,
        duration,
        volume,
        expanded,
        shuffle,
        repeat,

        setExpanded,
        playSong,
        togglePlay,
        playNext,
        playPrev,
        seek,
        changeVolume,
        toggleShuffle,
        toggleRepeat
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
