function Header() {
  return (
    <header className="sticky top-0 z-10 bg-black p-4">
      <input
        className="w-full rounded bg-zinc-800 px-4 py-2 text-white outline-none"
        placeholder="Search songs..."
      />
    </header>
  );
}

export default Header;
