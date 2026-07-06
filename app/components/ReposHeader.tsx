export function ReposHeader() {
  return (
    <header className="space-y-3">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
        GitHub repositories
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Public repos for mtawse
      </h1>
      <p className="max-w-2xl text-lg text-zinc-400">
        This page fetches public repository data directly from the GitHub API and displays the latest available projects.
      </p>
    </header>
  );
}
