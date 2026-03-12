import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Sparkles,
} from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  compact?: boolean;
}

type ColorTheme = "primary" | "violet" | "coral";

interface StatConfig {
  Icon: typeof DollarSign;
  color: ColorTheme;
  description: string;
}

const statConfig: Record<string, StatConfig> = {
  "Total Revenue": {
    Icon: DollarSign,
    color: "primary",
    description: "Total earnings this period",
  },
  "Active Users": {
    Icon: Users,
    color: "violet",
    description: "Currently active users",
  },
  "New Orders": {
    Icon: ShoppingCart,
    color: "coral",
    description: "Orders placed today",
  },
  "Conversion Rate": {
    Icon: Target,
    color: "primary",
    description: "Visitor to customer rate",
  },
};

const colorClasses: Record<
  ColorTheme,
  {
    iconBg: string;
    iconText: string;
    accentBorder: string;
    glowBg: string;
    ringColor: string;
  }
> = {
  primary: {
    iconBg:
      "bg-gradient-to-br from-[rgba(4,232,199,0.15)] to-[rgba(4,232,199,0.05)]",
    iconText: "text-[var(--color-primary)]",
    accentBorder: "border-[var(--color-primary)]",
    glowBg: "from-[rgba(4,232,199,0.08)] to-transparent",
    ringColor: "stroke-[var(--color-primary)]",
  },
  violet: {
    iconBg:
      "bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(139,92,246,0.05)]",
    iconText: "text-[var(--color-violet)]",
    accentBorder: "border-[var(--color-violet)]",
    glowBg: "from-[rgba(139,92,246,0.08)] to-transparent",
    ringColor: "stroke-[var(--color-violet)]",
  },
  coral: {
    iconBg:
      "bg-gradient-to-br from-[rgba(255,107,107,0.15)] to-[rgba(255,107,107,0.05)]",
    iconText: "text-[var(--color-coral)]",
    accentBorder: "border-[var(--color-coral)]",
    glowBg: "from-[rgba(255,107,107,0.08)] to-transparent",
    ringColor: "stroke-[var(--color-coral)]",
  },
};

// Mini sparkline component for visual trend
function MiniSparkline({
  isPositive,
  color,
}: {
  isPositive: boolean;
  color: ColorTheme;
}) {
  const points = isPositive
    ? "0,16 8,14 16,10 24,12 32,6 40,8 48,2"
    : "0,4 8,6 16,10 24,8 32,14 40,12 48,16";

  const strokeColor =
    color === "primary"
      ? "var(--color-primary)"
      : color === "violet"
      ? "var(--color-violet)"
      : "var(--color-coral)";

  return (
    <svg
      width="48"
      height="18"
      viewBox="0 0 48 18"
      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Progress ring around icon
function ProgressRing({
  progress,
  color,
  size = 52,
}: {
  progress: number;
  color: ColorTheme;
  size?: number;
}) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      className="absolute inset-0 -rotate-90"
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-[var(--color-border)] opacity-50"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        className={colorClasses[color].ringColor}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset,
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
      />
    </svg>
  );
}

export default function StatCard({
  label,
  value,
  change,
  isPositive,
  compact = false,
}: StatCardProps) {
  const config = statConfig[label] || {
    Icon: Sparkles,
    color: "primary" as ColorTheme,
    description: "Stat metric",
  };

  const { Icon, color } = config;
  const colors = colorClasses[color];

  // Extract percentage for progress ring (mock calculation)
  const progressValue = Math.min(Math.abs(parseFloat(change)) * 8, 100);

  if (compact) {
    return (
      <div className="relative overflow-hidden gradient-card border border-[var(--color-border)] rounded-xl p-3 hover:shadow-md transition-all duration-300 group w-full h-full">
        <div className="flex items-center gap-3">
          {/* Compact Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
            <ProgressRing progress={progressValue} color={color} size={40} />
            <div
              className={`absolute inset-[4px] rounded-full ${colors.iconBg} flex items-center justify-center`}
            >
              <Icon className={`w-4 h-4 ${colors.iconText}`} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold truncate">
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                {value}
              </h3>
              <span
                className={`text-[10px] font-semibold ${
                  isPositive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-coral)]"
                }`}
              >
                {isPositive ? "↑" : "↓"}
                {change}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden gradient-card border border-[var(--color-border)] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
      {/* Decorative corner accent */}
      <div
        className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-bl ${colors.glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Subtle bottom border accent on hover */}
      <div
        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent ${colors.iconText} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Header: Label and Icon */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-1">
            {label}
          </p>
        </div>

        {/* Icon with progress ring */}
        <div className="relative w-[52px] h-[52px] flex items-center justify-center flex-shrink-0">
          <ProgressRing progress={progressValue} color={color} />
          <div
            className={`absolute inset-[6px] rounded-full ${colors.iconBg} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${colors.iconText}`} />
          </div>
        </div>
      </div>

      {/* Value Section */}
      <div className="relative mb-4">
        <h3 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight leading-none">
          {value}
        </h3>
      </div>

      {/* Footer: Change indicator and sparkline */}
      <div className="relative flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {/* Change badge */}
          <div
            className={`
            inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
            ${
              isPositive
                ? "bg-[rgba(4,232,199,0.1)] text-[var(--color-primary)]"
                : "bg-[rgba(255,107,107,0.1)] text-[var(--color-coral)]"
            }
          `}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{change}</span>
          </div>

          <span className="text-[10px] text-[var(--color-text-muted)] hidden sm:inline">
            vs last month
          </span>
        </div>

        {/* Mini sparkline */}
        <MiniSparkline isPositive={isPositive} color={color} />
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.glowBg} opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none rounded-2xl`}
      />
    </div>
  );
}
