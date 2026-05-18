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

const navItems = [
  { label: 'Overview', active: true },
  { label: 'Service Users', active: false },
  { label: 'Care Logs', active: false },
  { label: 'Incidents', active: false },
  { label: 'Staff', active: false },
  { label: 'Reports', active: false },
];

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — hidden on mobile, visible from md up */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-talium-purple text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">Talium Tech</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                item.active
                  ? 'bg-talium-purple/10 text-talium-purple'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-4">
          <div className="mb-2 text-sm font-medium text-gray-900">{user?.full_name}</div>
          <div className="mb-3 text-xs text-gray-500">{user?.email}</div>
          <button
            onClick={logout}
            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar — only shows below md */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-talium-purple text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-900">Talium Tech</span>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700"
          >
            Sign out
          </button>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                Manager Dashboard
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Welcome back{user ? `, ${user.full_name}` : ''} — {formatToday()}
              </p>
            </div>
            <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-talium-green/10 px-3 py-1 text-sm font-medium text-talium-green-dark sm:mt-0">
              <span className="h-2 w-2 rounded-full bg-talium-green" />
              All systems healthy
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Active Service Users" value={4} icon={UsersIcon} variant="purple" />
            <StatCard label="Logs Today" value={4} icon={ClipboardIcon} variant="green" />
            <StatCard label="Open Incidents" value={1} icon={AlertIcon} variant="pink" />
          </div>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-gray-900">Recent Activity</h2>
            <p className="mb-4 text-sm text-gray-500">
              Placeholder — wire this up to the backend log feed.
            </p>
            <div className="divide-y divide-gray-100">
              {[
                { time: '09:14', who: 'Care Worker', what: 'Logged morning medication for SU-001' },
                { time: '08:47', who: 'Care Worker', what: 'Started shift at Telford site' },
                { time: '08:30', who: 'System', what: 'Incident TI-204 flagged as open' },
              ].map((row) => (
                <div key={row.time} className="flex items-start gap-4 py-3 text-sm">
                  <span className="w-12 shrink-0 font-mono text-xs text-gray-400">
                    {row.time}
                  </span>
                  <span className="w-28 shrink-0 font-medium text-gray-700">{row.who}</span>
                  <span className="text-gray-600">{row.what}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
