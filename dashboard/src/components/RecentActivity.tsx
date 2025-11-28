import { UserPlus, ShoppingBag, Package, CreditCard, ArrowUpRight } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "user",
      message: "New user registered",
      user: "Sarah Johnson",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "order",
      message: "New order placed",
      user: "Order #12453",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "product",
      message: "Product updated",
      user: "iPhone 15 Pro",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received",
      user: "$234.00",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "user",
      message: "User profile updated",
      user: "Mike Wilson",
      time: "3 hours ago",
    },
  ];

  const getActivityConfig = (type: string) => {
    const defaultConfig = {
      icon: Package,
      bg: "bg-[var(--color-accent-muted)]",
    };

    const configs: Record<string, typeof defaultConfig> = {
      user: { icon: UserPlus, bg: "bg-[var(--color-accent-muted)]" },
      order: { icon: ShoppingBag, bg: "bg-[var(--color-accent-muted)]" },
      product: { icon: Package, bg: "bg-[var(--color-accent-muted)]" },
      payment: { icon: CreditCard, bg: "bg-[var(--color-accent-muted)]" },
    };

    return configs[type] || defaultConfig;
  };

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
          Recent Activity
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Latest events in your system
        </p>
      </div>

      {/* Activity List */}
      <div className="p-6 space-y-4">
        {activities.map((activity, index) => {
          const config = getActivityConfig(activity.type);
          const Icon = config.icon;
          
          return (
            <div 
              key={activity.id} 
              className="flex gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer -mx-3"
            >
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text-primary)] font-semibold mb-0.5">
                  {activity.message}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-1">
                  {activity.user}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-light)] text-center">
        <button className="flex items-center justify-center gap-1.5 w-full text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors duration-200">
          View All Activity
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

