import {
  UserPlus,
  ShoppingBag,
  Package,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

interface RecentActivityProps {
  compact?: boolean;
}

export default function RecentActivity({
  compact = false,
}: RecentActivityProps) {
  const activities = [
    {
      id: 1,
      type: "user",
      message: "New user registered",
      user: "Sarah Johnson",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "order",
      message: "New order placed",
      user: "Order #12453",
      time: "15 min ago",
    },
    {
      id: 3,
      type: "product",
      message: "Product updated",
      user: "iPhone 15 Pro",
      time: "1 hr ago",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received",
      user: "$234.00",
      time: "2 hrs ago",
    },
    {
      id: 5,
      type: "user",
      message: "User profile updated",
      user: "Mike Wilson",
      time: "3 hrs ago",
    },
  ];

  const getActivityConfig = (type: string) => {
    const defaultConfig = {
      icon: Package,
      bg: "bg-gradient-to-br from-[rgba(4,232,199,0.20)] to-[rgba(4,232,199,0.10)]",
      iconColor: "text-[var(--color-primary)]",
    };

    const configs: Record<string, typeof defaultConfig> = {
      user: {
        icon: UserPlus,
        bg: "bg-gradient-to-br from-[rgba(139,92,246,0.20)] to-[rgba(139,92,246,0.10)]",
        iconColor: "text-[var(--color-violet)]",
      },
      order: {
        icon: ShoppingBag,
        bg: "bg-gradient-to-br from-[rgba(255,107,107,0.20)] to-[rgba(255,107,107,0.10)]",
        iconColor: "text-[var(--color-coral)]",
      },
      product: {
        icon: Package,
        bg: "bg-gradient-to-br from-[rgba(4,232,199,0.20)] to-[rgba(4,232,199,0.10)]",
        iconColor: "text-[var(--color-primary)]",
      },
      payment: {
        icon: CreditCard,
        bg: "bg-gradient-to-br from-[rgba(4,232,199,0.20)] to-[rgba(4,232,199,0.10)]",
        iconColor: "text-[var(--color-primary)]",
      },
    };

    return configs[type] || defaultConfig;
  };

  // Show fewer activities in compact mode
  const displayActivities = compact ? activities.slice(0, 4) : activities;

  return (
    <div className="gradient-card border border-[var(--color-border)] rounded-xl overflow-hidden w-full h-full flex flex-col">
      {/* Header */}
      <div
        className={`${
          compact ? "p-3" : "p-6"
        } border-b border-[var(--color-border)] gradient-violet-subtle`}
      >
        <h2
          className={`${
            compact ? "text-sm" : "text-lg"
          } font-bold text-[var(--color-text-primary)] mb-0.5`}
        >
          Recent Activity
        </h2>
        <p
          className={`${
            compact ? "text-xs" : "text-sm"
          } text-[var(--color-text-muted)]`}
        >
          Latest events
        </p>
      </div>

      {/* Activity List */}
      <div className={`${compact ? "p-2" : "p-6"} space-y-1 flex-1`}>
        {displayActivities.map((activity) => {
          const config = getActivityConfig(activity.type);
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className={`flex gap-2 ${
                compact ? "p-2" : "p-3 -mx-3"
              } rounded-lg hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer`}
            >
              <div
                className={`${compact ? "w-7 h-7" : "w-10 h-10"} rounded-lg ${
                  config.bg
                } flex items-center justify-center flex-shrink-0`}
              >
                <Icon
                  className={`${compact ? "w-3.5 h-3.5" : "w-5 h-5"} ${
                    config.iconColor
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`${
                    compact ? "text-xs" : "text-sm"
                  } text-[var(--color-text-primary)] font-semibold leading-tight`}
                >
                  {compact
                    ? activity.message.split(" ").slice(0, 3).join(" ")
                    : activity.message}
                </p>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[10px] text-[var(--color-text-secondary)] font-medium truncate">
                    {activity.user}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {activity.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className={`${
          compact ? "px-3 py-2" : "px-6 py-4"
        } border-t border-[var(--color-border)] gradient-violet-subtle text-center`}
      >
        <button className="flex items-center justify-center gap-1 w-full text-[10px] text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors duration-200">
          View All
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
