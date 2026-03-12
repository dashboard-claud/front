import { Users as UsersIcon } from "lucide-react";

export default function Users() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-violet-muted)] flex items-center justify-center mb-4">
          <UsersIcon className="w-8 h-8 text-[var(--color-violet)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Users
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-md">
          Manage your users, view their profiles, and handle permissions.
        </p>
      </div>
    </main>
  );
}

