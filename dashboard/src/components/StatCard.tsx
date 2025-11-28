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

const colorMap: Record<string, string> = {
  "Total Revenue": "from-purple-500 to-indigo-600",
  "Active Users": "from-blue-500 to-cyan-600",
  "New Orders": "from-orange-500 to-pink-600",
  "Conversion Rate": "from-green-500 to-emerald-600",
};

export default function StatCard({ label, value, change, isPositive }: StatCardProps) {
  const Icon = iconMap[label] || DollarSign;
  const gradient = colorMap[label] || "from-gray-500 to-gray-600";

  return (
    <div className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 card-hover shadow-card hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text-muted)] font-semibold mb-3 uppercase tracking-wide">
            {label}
          </p>
          <h3 className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
          isPositive 
            ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]" 
            : "bg-red-50 text-red-600"
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {change}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] font-medium">
          vs last month
        </span>
      </div>
    </div>
  );
}

