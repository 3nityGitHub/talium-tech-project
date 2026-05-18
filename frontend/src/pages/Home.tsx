import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';

function formatToday(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClipboardIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
    <path
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-talium-purple text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">RaphLog</span>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Dashboard</h1>
          <p className="mt-1 text-base text-gray-500">
            Welcome back{user ? `, ${user.full_name}` : ''} — {formatToday()}
          </p>
        </div>

        {/* Single column on mobile, two columns on tablet+ — responsive without
            breaking the screenshot's mobile-first feel. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard label="Active Service Users" value={4} icon={UsersIcon} variant="purple" />
          <StatCard label="Logs Today" value={4} icon={ClipboardIcon} variant="green" />
          <StatCard label="Open Incidents" value={1} icon={AlertIcon} variant="pink" />
        </div>
      </main>
    </div>
  );
}
