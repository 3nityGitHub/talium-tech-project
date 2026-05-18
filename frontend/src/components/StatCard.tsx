import type { ReactNode } from 'react';

type Variant = 'purple' | 'green' | 'pink';

interface Props {
  label: string;
  value: number | string;
  icon: ReactNode;
  variant: Variant;
}

const variantClasses: Record<Variant, string> = {
  purple: 'from-talium-purple to-talium-purple-dark',
  green: 'from-talium-green to-talium-green-dark',
  pink: 'from-talium-pink to-talium-pink-dark',
};

export function StatCard({ label, value, icon, variant }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${variantClasses[variant]} p-6 text-white shadow-lg`}
    >
      {/* Decorative circles matching the screenshot */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-8 -right-12 h-40 w-40 rounded-full bg-white/10" />

      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          {icon}
        </div>
        <div className="text-4xl font-bold leading-none">{value}</div>
        <div className="mt-2 text-base font-medium text-white/90">{label}</div>
      </div>
    </div>
  );
}
