type ReposErrorProps = {
  message: string;
};

export function ReposError({ message }: ReposErrorProps) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
      {message}
    </div>
  );
}
