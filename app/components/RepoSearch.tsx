"use client";

type RepoSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
};

export function RepoSearch({ query, onQueryChange, onClear }: RepoSearchProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-400">
      <span>Search repositories by name</span>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search repos"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 pr-12 text-base text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
        />
        {query ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition hover:text-white"
          >
            ✕
          </button>
        ) : null}
      </div>
    </label>
  );
}
