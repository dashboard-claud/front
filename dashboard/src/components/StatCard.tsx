import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const iconMap: Record<string, any> = {
  "Total Revenue": DollarSign,
  "Active Users": Users,
  "New Orders": ShoppingCart,
  "Conversion Rate": Target,
};

export default function StatCard({ label, value, change, isPositive }: StatCardProps) {
  const Icon = iconMap[label] || DollarSign;

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-[var(--color-text-muted)] font-medium mb-2">
            {label}
          </p>
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {value}
          </h3>
        </div>
        <div className="p-2.5 rounded-lg bg-[var(--color-accent-muted)]">
          <Icon className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 pt-3 border-t border-[var(--color-border)]">
        <div className={`flex items-center gap-1 text-xs font-semibold ${
          isPositive 
            ? "text-[var(--color-primary)]" 
            : "text-[var(--color-text-secondary)]"
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {change}
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">
          vs last month
        </span>
      </div>
    </div>
  );
}

