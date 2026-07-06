"use client";

import { useEffect, useMemo, useState } from "react";
import { RepoCard, type GitHubRepo } from "./RepoCard";
import { RepoSearch } from "./RepoSearch";
import { ReposError } from "./ReposError";
import { ReposHeader } from "./ReposHeader";

export function Repos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      try {
        const response = await fetch("https://api.github.com/users/mtawse/repos", {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "nextjs-github-repos",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch repositories. Please try again later.");
        }

        const data = (await response.json()) as GitHubRepo[];

        if (isMounted) {
          setRepos(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load repositories right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

    if (!normalizedQuery) {
      return sortedRepos;
    }

    return sortedRepos.filter((repo) => repo.name.toLowerCase().includes(normalizedQuery));
  }, [query, repos]);

  return (
    <div className="flex flex-col gap-6">
      <ReposHeader />

      {isLoading ? null : error ? null : (
        <RepoSearch query={query} onQueryChange={setQuery} onClear={() => setQuery("")} />
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 text-zinc-400">
          Loading repositories...
        </div>
      ) : error ? (
        <ReposError message={error} />
      ) : filteredRepos.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 text-zinc-400">
          No repositories match “{query}”.
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filteredRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}
