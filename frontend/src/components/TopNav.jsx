import { Search, Music2 } from "lucide-react";

function TopNav({ query, setQuery }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/70 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Music2 className="text-green-400" />
          <span className="font-semibold tracking-wide">PulsePlay</span>
        </div>

        {/* SEARCH */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search songs, artists..."
            className="w-full rounded-full bg-zinc-900 py-2 pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-green-500"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNav;
