import { useState } from "react";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Player from "./layout/Player";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <Home searchQuery={searchQuery} />
      <Player />
    </>
  );
}

export default App;
