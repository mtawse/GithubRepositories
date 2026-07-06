import Link from "next/link";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

type RepoCardProps = {
  repo: GitHubRepo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <li>
      <Link
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="block h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-cyan-400 hover:bg-zinc-800"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{repo.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{repo.full_name}</p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
            ★ {repo.stargazers_count}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-300">
          {repo.description ?? "No description available."}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          {repo.language ? <span>{repo.language}</span> : null}
          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </Link>
    </li>
  );
}
