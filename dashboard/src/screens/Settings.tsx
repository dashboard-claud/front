import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-muted)] flex items-center justify-center mb-4">
          <SettingsIcon className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Settings
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-md">
          Configure your application preferences, account settings, and more.
        </p>
      </div>
    </main>
  );
}

