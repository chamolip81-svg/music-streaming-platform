import { useState } from "react";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-10 bg-black p-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
        className="w-full rounded bg-zinc-800 px-4 py-2 text-white outline-none"
        placeholder="Search songs..."
      />
    </header>
  );
}

export default Header;
