interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-24 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] flex items-center justify-between px-8 lg:px-12 shadow-sm">
      <div className="flex items-center gap-8 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 hover:bg-[var(--color-secondary-light)] rounded-xl transition-all duration-200 hover:scale-105"
        >
          <svg
            className="w-6 h-6 text-[var(--color-text-secondary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full px-6 py-4 pl-14 bg-[var(--color-bg-light)] border-2 border-transparent rounded-xl text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all duration-200 shadow-sm"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-3 hover:bg-[var(--color-bg-light)] rounded-xl transition-all duration-200 hover:scale-105 group">
          <svg
            className="w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--color-accent-pink)] rounded-full border-2 border-white shadow-sm"></span>
        </button>

        {/* Profile */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
}

