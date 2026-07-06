import { Repos } from "./components/Repos";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Repos />
      </div>
    </main>
  );
}
