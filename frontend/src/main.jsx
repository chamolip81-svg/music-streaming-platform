import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { PlaylistsProvider } from "./context/PlaylistsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayerProvider>
      <FavoritesProvider>
        <PlaylistsProvider>
          <App />
        </PlaylistsProvider>
      </FavoritesProvider>
    </PlayerProvider>
  </React.StrictMode>
);
