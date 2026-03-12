import { TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-violet-muted)] flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-[var(--color-violet)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Analytics
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-md">
          View detailed analytics and insights about your business performance.
        </p>
      </div>
    </main>
  );
}

